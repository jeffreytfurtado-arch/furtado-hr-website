import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { performanceReviews } from '../../../../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;
    const reviewId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    if (isNaN(reviewId)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }

    const { overallRating, goals, achievements, areasForImprovement, comments, status } = req.body;

    await db
      .update(performanceReviews)
      .set({
        overallRating,
        goals,
        achievements,
        areasForImprovement,
        comments,
        status,
        updatedAt: new Date(),
      })
      .where(and(eq(performanceReviews.id, reviewId), eq(performanceReviews.userId, userId)));

    const updated = await db
      .select()
      .from(performanceReviews)
      .where(and(eq(performanceReviews.id, reviewId), eq(performanceReviews.userId, userId)))
      .limit(1);

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating performance review:', error);
    res.status(500).json({ error: 'Failed to update performance review', message: String(error) });
  }
}
