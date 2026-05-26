import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { performanceReviews } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    const reviews = await db
      .select()
      .from(performanceReviews)
      .where(eq(performanceReviews.userId, userId));

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching performance reviews:', error);
    res.status(500).json({ error: 'Failed to fetch performance reviews', message: String(error) });
  }
}
