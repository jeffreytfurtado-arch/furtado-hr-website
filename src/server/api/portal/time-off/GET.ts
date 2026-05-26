import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { timeOffRequests } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    const requests = await db
      .select()
      .from(timeOffRequests)
      .where(eq(timeOffRequests.userId, userId));

    res.json(requests);
  } catch (error) {
    console.error('Error fetching time-off requests:', error);
    res.status(500).json({ error: 'Failed to fetch time-off requests', message: String(error) });
  }
}
