import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';
const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, name, company, plan } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.FROM_EMAIL || 'info@precisehr.ca';
    const toEmail = process.env.TO_EMAIL || 'info@precisehr.ca';
    const nm = esc(typeof name === 'string' ? name.slice(0, 120) : '');
    const co = esc(typeof company === 'string' ? company.slice(0, 160) : '');
    const pl = esc(typeof plan === 'string' ? plan.slice(0, 60) : '');

    // 1) Notify PreciseHR
    await resend.emails.send({
      from: `PreciseHR App <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New PreciseHR App waitlist signup — ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background:#003366;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">New Early-Access Signup</h2>
            <p style="margin:5px 0 0;opacity:.9;">PreciseHR App waitlist</p>
          </div>
          <div style="padding:20px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
            <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
            ${nm ? `<p style="margin:0 0 8px;"><strong>Name:</strong> ${nm}</p>` : ''}
            ${co ? `<p style="margin:0 0 8px;"><strong>Company:</strong> ${co}</p>` : ''}
            ${pl ? `<p style="margin:0 0 8px;"><strong>Interested plan:</strong> ${pl}</p>` : ''}
          </div>
        </div>
      `,
    });

    // 2) Confirmation to the subscriber
    await resend.emails.send({
      from: `PreciseHR <${fromEmail}>`,
      to: [email],
      subject: 'You\u2019re on the PreciseHR early-access list',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background:#003366;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">You\u2019re on the list \u2713</h2>
          </div>
          <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;color:#333;">
            <p>Thanks${nm ? `, ${nm}` : ''} for your interest in the PreciseHR HRIS.</p>
            <p>You\u2019re now on our early-access list. We\u2019ll reach out as soon as your spot opens up \u2014 founding customers get priority onboarding and launch pricing.</p>
            <p>Want a closer look sooner? You can book a live demo anytime:</p>
            <p style="margin:20px 0;">
              <a href="${CALENDLY}" style="background:#003366;color:#fff;text-decoration:none;padding:12px 22px;border-radius:6px;display:inline-block;">Book a demo</a>
            </p>
            <p style="color:#666;font-size:13px;">PreciseHR \u00b7 Toronto, ON \u00b7 (437) 887-2263</p>
          </div>
        </div>
      `,
    });

    // Add to the mailing list (no-op until RESEND_AUDIENCE_ID is set in Vercel)
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({ email, firstName: name || undefined, audienceId, unsubscribed: false });
      } catch (e) {
        console.error('Failed to add contact to audience:', e);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
