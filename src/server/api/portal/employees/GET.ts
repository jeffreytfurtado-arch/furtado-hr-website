import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { employees } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    // Fetch all employees for this user
    const userEmployees = await db
      .select()
      .from(employees)
      .where(eq(employees.userId, userId));

    res.json(userEmployees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees', message: String(error) });
  }
}
