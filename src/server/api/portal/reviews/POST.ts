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

    const { employeeId, employeeName, reviewPeriod, reviewDate, overallRating, goals, achievements, areasForImprovement, comments, status } = req.body;

    if (!employeeId || !employeeName || !reviewPeriod || !reviewDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.insert(performanceReviews).values({
      userId,
      employeeId,
      employeeName,
      reviewPeriod,
      reviewDate: new Date(reviewDate),
      overallRating: overallRating || null,
      goals: goals || null,
      achievements: achievements || null,
      areasForImprovement: areasForImprovement || null,
      comments: comments || null,
      status: status || 'draft',
    });

    const insertId = Number(result[0].insertId);
    const newReview = await db.select().from(performanceReviews).where(eq(performanceReviews.id, insertId)).limit(1);

    res.status(201).json(newReview[0]);
  } catch (error) {
    console.error('Error creating performance review:', error);
    res.status(500).json({ error: 'Failed to create performance review', message: String(error) });
  }
}
