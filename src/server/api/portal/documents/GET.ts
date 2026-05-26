import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { documents } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    const userDocuments = await db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId));

    res.json(userDocuments);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents', message: String(error) });
  }
}
