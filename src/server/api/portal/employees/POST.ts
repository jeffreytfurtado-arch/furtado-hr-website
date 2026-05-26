// Employee management API endpoint
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { employees } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    const { firstName, lastName, email, phone, position, department, hireDate, status } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert employee
    const result = await db.insert(employees).values({
      userId,
      firstName,
      lastName,
      email,
      phone: phone || null,
      position: position || null,
      department: department || null,
      hireDate: hireDate ? new Date(hireDate) : null,
      status: status || 'active',
    });

    const insertId = Number(result[0].insertId);
    const newEmployee = await db.select().from(employees).where(eq(employees.id, insertId)).limit(1);

    res.status(201).json(newEmployee[0]);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee', message: String(error) });
  }
}
