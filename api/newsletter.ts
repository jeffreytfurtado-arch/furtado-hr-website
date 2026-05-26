import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, company } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.FROM_EMAIL || 'info@precisehr.ca';
    const toEmail = process.env.TO_EMAIL || 'info@precisehr.ca';

    // Notification to PreciseHR
    await resend.emails.send({
      from: `PreciseHR <${fromEmail}>`,
      to: [toEmail],
      subject: `New Newsletter Subscriber: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #003366; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Newsletter Subscriber</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Company:</td><td style="padding: 8px 0;">${company || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Subscribed:</td><td style="padding: 8px 0;">${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</td></tr>
            </table>
          </div>
        </div>
      `,
    });

    // Welcome email to subscriber
    await resend.emails.send({
      from: `PreciseHR <${fromEmail}>`,
      to: [email],
      subject: 'Welcome to PreciseHR Insights!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #003366; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Welcome to PreciseHR Insights!</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p>Hi ${firstName},</p>
            <p>Thank you for subscribing to our newsletter. You'll now receive:</p>
            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 8px;">Monthly HR insights and best practices</li>
              <li style="margin-bottom: 8px;">Compliance updates and regulatory changes</li>
              <li style="margin-bottom: 8px;">Exclusive resources, templates, and guides</li>
            </ul>
            <p>We're excited to help you stay informed and ahead of the curve.</p>
            <p>Best regards,<br><strong>The PreciseHR Team</strong></p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 12px; color: #666;">You can unsubscribe at any time by clicking the unsubscribe link in our emails.</p>
          </div>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your email for a welcome message.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      error: 'Failed to process subscription. Please try again later.',
    });
  }
}
