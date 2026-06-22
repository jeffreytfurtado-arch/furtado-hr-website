import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCorsHeaders } from './_shared';

/**
 * PreciseHR self-serve checkout (Vercel serverless function → /api/checkout).
 *
 * Creates a Stripe Checkout Session (subscription mode) for the chosen plan,
 * billing interval, and employee count, then returns the hosted checkout URL.
 *
 * Prices are resolved at runtime by lookup_key, so the SAME code works in test
 * and live: starter_monthly | starter_annual | growth_monthly | growth_annual
 *
 * Env (Vercel): STRIPE_SECRET_KEY  (sk_test_... now, sk_live_... at launch)
 *               APP_SUCCESS_URL    (optional) default https://www.precisehr.ca/welcome
 *               APP_CANCEL_URL     (optional) default https://www.precisehr.ca/app
 */

const STRIPE_API = 'https://api.stripe.com/v1';
const PLANS = ['starter', 'growth'];
const INTERVALS = ['monthly', 'annual'];

function form(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

async function stripe(path: string, key: string, body?: Record<string, string>) {
  const resp = await fetch(`${STRIPE_API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? form(body) : undefined,
  });
  const json = await resp.json();
  if (!resp.ok) throw new Error(json?.error?.message || `Stripe ${resp.status}`);
  return json;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return res.status(500).json({ error: 'Checkout is not configured yet.' });

    const body = req.body || {};
    const plan = String(body.plan || '').toLowerCase();
    const interval = String(body.interval || '').toLowerCase();
    const employees = Math.floor(Number(body.employees));
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';

    if (!PLANS.includes(plan) || !INTERVALS.includes(interval)) {
      return res.status(400).json({ error: 'Invalid plan or billing interval.' });
    }
    if (!Number.isFinite(employees) || employees < 1 || employees > 5000) {
      return res.status(400).json({ error: 'Enter a valid number of employees (1-5000).' });
    }

    const lookupKey = `${plan}_${interval}`;
    const priceList = await stripe(
      `/prices?active=true&lookup_keys[]=${encodeURIComponent(lookupKey)}`,
      key,
    );
    const price = priceList?.data?.[0]?.id;
    if (!price) return res.status(500).json({ error: `Price not found for ${lookupKey}.` });

    const successUrl = process.env.APP_SUCCESS_URL || 'https://www.precisehr.ca/welcome';
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
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
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
