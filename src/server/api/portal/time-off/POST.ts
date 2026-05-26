import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { timeOffRequests } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    // Get authenticated user session
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    const { employeeId, employeeName, type, startDate, endDate, days, reason, status } = req.body;

    if (!employeeId || !employeeName || !type || !startDate || !endDate || !days) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.insert(timeOffRequests).values({
      userId,
      employeeId,
      employeeName,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      days,
      reason: reason || null,
      status: status || 'pending',
    });

    const insertId = Number(result[0].insertId);
    const newRequest = await db.select().from(timeOffRequests).where(eq(timeOffRequests.id, insertId)).limit(1);

    res.status(201).json(newRequest[0]);
  } catch (error) {
    console.error('Error creating time-off request:', error);
    res.status(500).json({ error: 'Failed to create time-off request', message: String(error) });
  }
}
