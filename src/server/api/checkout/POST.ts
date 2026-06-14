import type { Request, Response } from 'express';

/**
 * PreciseHR self-serve checkout.
 *
 * Creates a Stripe Checkout Session (subscription mode) for a chosen plan,
 * billing interval, and employee count, then returns the hosted checkout URL.
 *
 * Prices are resolved at runtime by lookup_key, so the SAME code works in
 * test and live as long as the price lookup_keys match:
 *   starter_monthly | starter_annual | growth_monthly | growth_annual
 *
 * Env (Vercel): STRIPE_SECRET_KEY  (sk_test_... while testing, sk_live_... at launch)
 *               APP_SUCCESS_URL    (optional) defaults to https://www.precisehr.ca/welcome
 *               APP_CANCEL_URL     (optional) defaults to https://www.precisehr.ca/app
 */

const STRIPE_API = 'https://api.stripe.com/v1';
const PLANS = ['starter', 'growth'] as const;
const INTERVALS = ['monthly', 'annual'] as const;

type Plan = (typeof PLANS)[number];
type Interval = (typeof INTERVALS)[number];

function form(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

async function stripe(path: string, key: string, body?: Record<string, string>) {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? form(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `Stripe ${res.status}`);
  return json;
}

export default async function handler(req: Request, res: Response) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return res.status(500).json({ error: 'Checkout is not configured yet.' });
    }

    const plan = String(req.body?.plan || '').toLowerCase() as Plan;
    const interval = String(req.body?.interval || '').toLowerCase() as Interval;
    const employees = Math.floor(Number(req.body?.employees));
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
    const company = typeof req.body?.company === 'string' ? req.body.company.trim() : '';

    if (!PLANS.includes(plan) || !INTERVALS.includes(interval)) {
      return res.status(400).json({ error: 'Invalid plan or billing interval.' });
    }
    if (!Number.isFinite(employees) || employees < 1 || employees > 5000) {
      return res.status(400).json({ error: 'Enter a valid number of employees (1–5000).' });
    }

    // Resolve price by lookup_key (works in both test and live modes)
    const lookupKey = `${plan}_${interval}`;
    const priceList = await stripe(
      `/prices?active=true&lookup_keys[]=${encodeURIComponent(lookupKey)}`,
      key,
    );
    const price = priceList?.data?.[0]?.id;
    if (!price) {
      return res.status(500).json({ error: `Price not found for ${lookupKey}.` });
    }

    const successUrl =
      process.env.APP_SUCCESS_URL || 'https://www.precisehr.ca/welcome';
    const cancelUrl = process.env.APP_CANCEL_URL || 'https://www.precisehr.ca/app';

    const params: Record<string, string> = {
      mode: 'subscription',
      'line_items[0][price]': price,
      'line_items[0][quantity]': String(employees),
      'line_items[0][adjustable_quantity][enabled]': 'true',
      'line_items[0][adjustable_quantity][minimum]': '1',
      'line_items[0][adjustable_quantity][maximum]': '5000',
      'subscription_data[metadata][plan]': plan,
      'subscription_data[metadata][interval]': interval,
      'metadata[plan]': plan,
      'metadata[interval]': interval,
      'custom_fields[0][key]': 'company_name',
      'custom_fields[0][label][type]': 'custom',
      'custom_fields[0][label][custom]': 'Company name',
      'custom_fields[0][type]': 'text',
      allow_promotion_codes: 'true',
      billing_address_collection: 'auto',
      'success_url': `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': cancelUrl,
    };
    if (email) params.customer_email = email;
    if (company) params['custom_fields[0][text][default_value]'] = company.slice(0, 200);

    const session = await stripe('/checkout/sessions', key, params);
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('checkout error:', err);
    return res.status(500).json({ error: 'Could not start checkout. Please try again or email info@precisehr.ca.' });
  }
}
