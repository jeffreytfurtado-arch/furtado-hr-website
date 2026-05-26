import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { timeOffRequests } from '../../../../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;
    const requestId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    if (isNaN(requestId)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    const { status } = req.body;

    await db
      .update(timeOffRequests)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(and(eq(timeOffRequests.id, requestId), eq(timeOffRequests.userId, userId)));

    const updated = await db
      .select()
      .from(timeOffRequests)
      .where(and(eq(timeOffRequests.id, requestId), eq(timeOffRequests.userId, userId)))
      .limit(1);

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating time-off request:', error);
    res.status(500).json({ error: 'Failed to update time-off request', message: String(error) });
  }
}
