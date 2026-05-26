import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { db } from '../../db/client.js';
import { contactSubmissions } from '../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, phone, company, employees, serviceInterest, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !company) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Contact form submission received:', { firstName, lastName, email, company, serviceInterest });

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

    // Email content
    const emailHtml = `
      <h2>New Contact Form Submission - PreciseHR</h2>
      <p><strong>From:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Number of Employees:</strong> ${employees || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${serviceInterest || 'Not specified'}</p>
      <h3>Message:</h3>
      <p>${message ? message.replace(/\n/g, '<br>') : 'No message provided'}</p>
    `;

    const emailText = `
New Contact Form Submission - PreciseHR

From: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company}
Number of Employees: ${employees || 'Not provided'}
Service Interest: ${serviceInterest || 'Not specified'}

Message:
${message || 'No message provided'}
    `;

    // Save to database first (so we don't lose the lead)
    let submissionId = null;
    let emailSent = false;

    try {
      console.log('Saving contact submission to database...');
      const result = await db.insert(contactSubmissions).values({
        firstName,
        lastName,
        email,
        phone,
        company,
        employees: employees || null,
        serviceInterest: serviceInterest || null,
        message: message || null,
        emailSent: false,
      });
      submissionId = Number(result[0].insertId);
      console.log('Contact submission saved to database with ID:', submissionId);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue anyway - we'll try to send email
    }

    // Try to send email
    try {
      console.log('Attempting to send contact form email to admin@furtadofirm.com');
      const info = await transporter.sendMail({
        from: 'noreply@airoapp.ai',
        to: 'admin@furtadofirm.com',
        subject: `New Contact Request from ${firstName} ${lastName} - ${company} (${serviceInterest || 'General'})`,
        text: emailText,
        html: emailHtml,
      });
      console.log('Email sent successfully:', info.messageId);
      emailSent = true;
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
      // Don't fail the request - submission is saved in database
    }

    res.status(200).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      saved: submissionId !== null,
      emailSent 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
