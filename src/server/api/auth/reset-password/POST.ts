import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { passwordResetToken, account } from '../../../db/schema.js';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export default async function handler(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Find valid reset token
    const tokens = await db
      .select()
      .from(passwordResetToken)
      .where(
        and(
          eq(passwordResetToken.token, token),
          gt(passwordResetToken.expiresAt, new Date())
        )
      )
      .limit(1);

    if (tokens.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const resetToken = tokens[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in account table
    await db
      .update(account)
      .set({ password: hashedPassword })
      .where(
        and(
          eq(account.userId, resetToken.userId),
          eq(account.providerId, 'credential')
        )
      );

    // Delete used reset token
    await db.delete(passwordResetToken).where(eq(passwordResetToken.id, resetToken.id));

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}
