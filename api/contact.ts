import type { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertHubSpotContact } from './_hubspot';
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
    const { firstName, lastName, email, phone, company, employees, serviceInterest, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !company) {
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
      subject: `New Contact Request from ${firstName} ${lastName} - ${company} (${serviceInterest || 'General'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #003366; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0; opacity: 0.9;">PreciseHR Website</p>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone || 'Not provided'}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Company:</td><td style="padding: 8px 0;">${company}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Employees:</td><td style="padding: 8px 0;">${employees || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Service Interest:</td><td style="padding: 8px 0;">${serviceInterest || 'Not specified'}</td></tr>
            </table>
            ${message ? `
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; margin: 0 0 8px;">Message:</p>
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `,
    });

    // Confirmation to the person
    await resend.emails.send({
      from: `PreciseHR <${fromEmail}>`,
      to: [email],
      subject: 'Thank you for contacting PreciseHR',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #003366; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Thank You for Contacting Us</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p>Hi ${firstName},</p>
            <p>Thank you for reaching out to PreciseHR. We've received your inquiry and a member of our team will get back to you within <strong>24 hours</strong>.</p>
            <p>If you need immediate assistance, please call us at <a href="tel:+14378872263">(437) 887-2263</a>.</p>
            <p>Best regards,<br><strong>The PreciseHR Team</strong></p>
          </div>
        </div>
      `,
    });

    // Sync to HubSpot CRM (no-op until HUBSPOT_TOKEN is set in Vercel)
    await upsertHubSpotContact({ email, firstname: firstName, lastname: lastName, phone, company, lifecyclestage: 'lead' });

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      emailSent: true,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again later.',
    });
  }
}
