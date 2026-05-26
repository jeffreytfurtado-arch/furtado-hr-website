import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { newsletterSubscribers } from '../../db/schema.js';
import nodemailer from 'nodemailer';

export default async function handler(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, company } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 25,
      secure: false,
    });

    // Email content for admin notification
    const emailHtml = `
      <h2>New Newsletter Subscription - PreciseHR</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
    `;

    const emailText = `
New Newsletter Subscription - PreciseHR

Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || 'Not provided'}
Subscribed: ${new Date().toLocaleString()}
    `;

    // Save to database first
    console.log('Saving newsletter subscription to database...');
    const result = await db.insert(newsletterSubscribers).values({
      firstName,
      lastName,
      email,
      company: company || null,
      subscribedAt: new Date(),
      isActive: true
    });

    const insertId = Number(result[0].insertId);
    console.log('Newsletter subscription saved to database with ID:', insertId);

    // Send notification email to admin
    await transporter.sendMail({
      from: 'noreply@airoapp.ai',
      to: 'admin@furtadofirm.com', // Your business email
      subject: `New Newsletter Subscriber: ${firstName} ${lastName}`,
      text: emailText,
      html: emailHtml,
    });

    // Send welcome email to subscriber
    const welcomeHtml = `
      <h2>Welcome to PreciseHR Insights!</h2>
      <p>Hi ${firstName},</p>
      <p>Thank you for subscribing to our newsletter. You'll now receive:</p>
      <ul>
        <li>Monthly HR insights and best practices</li>
        <li>Compliance updates and regulatory changes</li>
        <li>Exclusive resources, templates, and guides</li>
      </ul>
      <p>We're excited to help you stay informed and ahead of the curve.</p>
      <p>Best regards,<br>The PreciseHR Team</p>
      <hr>
      <p style="font-size: 12px; color: #666;">You can unsubscribe at any time by clicking the unsubscribe link in our emails.</p>
    `;

    const welcomeText = `
Welcome to PreciseHR Insights!

Hi ${firstName},

Thank you for subscribing to our newsletter. You'll now receive:
- Monthly HR insights and best practices
- Compliance updates and regulatory changes
- Exclusive resources, templates, and guides

We're excited to help you stay informed and ahead of the curve.

Best regards,
The PreciseHR Team

You can unsubscribe at any time by clicking the unsubscribe link in our emails.
    `;

    await transporter.sendMail({
      from: 'noreply@airoapp.ai',
      to: email,
      subject: 'Welcome to PreciseHR Insights!',
      text: welcomeText,
      html: welcomeHtml,
    });

    res.status(201).json({ 
      success: true, 
      message: 'Thank you for subscribing! Check your email for a welcome message.',
      subscriberId: insertId
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      error: 'Failed to process subscription. Please try again later.',
      message: String(error)
    });
  }
}
