import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { user, passwordResetToken, account } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const users = await db.select().from(user).where(eq(user.email, email.toLowerCase())).limit(1);
    
    if (users.length === 0) {
      // Don't reveal if user exists or not for security
      return res.json({ message: 'If an account exists, a reset link has been sent' });
    }

    const foundUser = users[0];

    // Check if user has a password (credential provider)
    const accounts = await db
      .select()
      .from(account)
      .where(eq(account.userId, foundUser.id))
      .limit(1);

    if (accounts.length === 0 || accounts[0].providerId !== 'credential') {
      // User doesn't have password auth
      return res.json({ message: 'If an account exists, a reset link has been sent' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Delete any existing reset tokens for this user
    await db.delete(passwordResetToken).where(eq(passwordResetToken.userId, foundUser.id));

    // Store reset token
    await db.insert(passwordResetToken).values({
      id: tokenId,
      token: resetToken,
      userId: foundUser.id,
      expiresAt,
    });

    // Send reset email
    const baseUrl = getSecret('BETTER_AUTH_BASE_URL') || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.airoapp.ai',
      port: 587,
      secure: false,
      auth: {
        user: 'noreply@airoapp.ai',
        pass: getSecret('SMTP_PASSWORD') || '',
      },
    });

    await transporter.sendMail({
      from: '"Furtado Firm" <noreply@airoapp.ai>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>You requested to reset your password. Click the link below to create a new password:</p>
          <p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 4px;">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="color: #666; font-size: 12px;">Furtado Firm - HR Consulting</p>
        </div>
      `,
    });

    res.json({ message: 'If an account exists, a reset link has been sent' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Failed to process reset request' });
  }
}
