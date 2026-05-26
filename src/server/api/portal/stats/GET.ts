import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { employees, documents, timeOffRequests, performanceReviews } from '../../../db/schema.js';
import { eq, count } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    // Count employees
    const employeeCount = await db
      .select({ count: count() })
      .from(employees)
      .where(eq(employees.userId, userId));

    // Count documents
    const documentCount = await db
      .select({ count: count() })
      .from(documents)
      .where(eq(documents.userId, userId));

    // Count time-off requests
    const timeOffCount = await db
      .select({ count: count() })
      .from(timeOffRequests)
      .where(eq(timeOffRequests.userId, userId));

    // Count pending time-off requests
    const pendingTimeOffCount = await db
      .select({ count: count() })
      .from(timeOffRequests)
      .where(eq(timeOffRequests.userId, userId));

    // Count performance reviews
    const reviewCount = await db
      .select({ count: count() })
      .from(performanceReviews)
      .where(eq(performanceReviews.userId, userId));

    res.json({
      employees: employeeCount[0]?.count || 0,
      documents: documentCount[0]?.count || 0,
      timeOffRequests: timeOffCount[0]?.count || 0,
      pendingTimeOffRequests: 0, // Simplified for now
      performanceReviews: reviewCount[0]?.count || 0,
    });
  } catch (error) {
    console.error('Error fetching portal stats:', error);
    res.status(500).json({ error: 'Failed to fetch portal stats', message: String(error) });
  }
}
