import type { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertHubSpotContact } from './_hubspot';
import { Resend } from 'resend';

const TOOL_LABELS: Record<string, string> = {
  policy: 'HR Policy',
  offer: 'Offer Letter',
  scan: 'Policy Red-Flag Scan',
  build: 'Document Builder',
};

const CALENDLY = 'https://calendly.com/precisehr-info/precisehr-consult';
const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, tool, summary, document } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' });
    }
    if (!document || typeof document !== 'string' || !document.trim()) {
      return res.status(400).json({ error: 'Nothing to send' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.FROM_EMAIL || 'info@precisehr.ca';
    const toEmail = process.env.TO_EMAIL || 'info@precisehr.ca';
    const label = TOOL_LABELS[tool] || 'HR Tool';
    const docHtml = esc(document.slice(0, 20000));
    const summaryText = esc(typeof summary === 'string' ? summary.slice(0, 200) : '');

    // 1) Lead notification to PreciseHR
    await resend.emails.send({
      from: `PreciseHR Tools <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New lead — ${label}${summaryText ? ` (${summaryText})` : ''} — ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background:#003366;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">New Tool Lead</h2>
            <p style="margin:5px 0 0;opacity:.9;">${label}</p>
          </div>
          <div style="padding:20px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
            <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
            ${summaryText ? `<p style="margin:0 0 8px;"><strong>Details:</strong> ${summaryText}</p>` : ''}
            <p style="margin:16px 0 6px;color:#666;">Generated output:</p>
            <pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;background:#f6f7f9;padding:14px;border-radius:6px;border:1px solid #eee;">${docHtml}</pre>
          </div>
        </div>
      `,
    });

    // 2) Deliver the document to the requester + free-review offer
    await resend.emails.send({
      from: `PreciseHR <${fromEmail}>`,
      to: [email],
      subject: `Your ${label.toLowerCase()} from PreciseHR`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background:#003366;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">Here's your ${label.toLowerCase()}</h2>
          </div>
          <div style="padding:20px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
            <p>Thanks for using our tools on precisehr.ca. Here's the draft you generated:</p>
            <pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;background:#f6f7f9;padding:14px;border-radius:6px;border:1px solid #eee;">${docHtml}</pre>
            <div style="margin-top:18px;padding:16px;background:#f0f7ff;border-radius:8px;">
              <p style="margin:0 0 10px;"><strong>This is a starting point.</strong> Our team can review it for your province, assess risk, and tailor it to your business — at no charge to start.</p>
              <a href="${CALENDLY}" style="display:inline-block;background:#003366;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:bold;">Book a free review</a>
            </div>
            <p style="margin-top:18px;color:#666;font-size:13px;">This is general information, not legal advice. Questions? Call (437) 887-2263 or reply to this email.</p>
          </div>
        </div>
      `,
    });

    // Sync to HubSpot CRM (no-op until HUBSPOT_TOKEN is set in Vercel)
    await upsertHubSpotContact({ email, lifecyclestage: 'lead' });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Lead capture error:', error?.message);
    return res.status(500).json({ error: 'Could not send right now — please try again.' });
  }
}
