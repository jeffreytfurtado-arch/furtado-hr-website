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

    const { firstName, lastName, email, phone, position, department, hireDate, status } = req.body;

    // Update employee (only if belongs to user)
    await db
      .update(employees)
      .set({
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        hireDate: hireDate ? new Date(hireDate) : null,
        status,
        updatedAt: new Date(),
      })
      .where(and(eq(employees.id, employeeId), eq(employees.userId, userId)));

    const updated = await db
      .select()
      .from(employees)
      .where(and(eq(employees.id, employeeId), eq(employees.userId, userId)))
      .limit(1);

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee', message: String(error) });
  }
}
