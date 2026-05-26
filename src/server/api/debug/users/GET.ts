import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { user, account } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    // Get all users with their accounts
    const users = await db.select({
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    }).from(user);

    // Get account info for each user
    const usersWithAccounts = await Promise.all(
      users.map(async (u) => {
        const accounts = await db.select({
          providerId: account.providerId,
          hasPassword: account.password,
        }).from(account).where(eq(account.userId, u.id));
        
        return {
          ...u,
          accounts: accounts.map(a => ({
            providerId: a.providerId,
            hasPassword: !!a.hasPassword,
          })),
        };
      })
    );

    res.json({
      count: users.length,
      users: usersWithAccounts,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', message: String(error) });
  }
}
