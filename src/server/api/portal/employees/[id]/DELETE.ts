import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { employees } from '../../../../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;
    const employeeId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    if (isNaN(employeeId)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    // Delete employee (only if belongs to user)
    await db
      .delete(employees)
      .where(and(eq(employees.id, employeeId), eq(employees.userId, userId)));

    res.json({ success: true, message: 'Employee deleted' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee', message: String(error) });
  }
}
