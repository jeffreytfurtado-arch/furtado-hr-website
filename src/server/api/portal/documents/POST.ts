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

    const { title, description, fileName, fileUrl, fileSize, fileType, category, employeeId } = req.body;

    if (!title || !fileName || !fileUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.insert(documents).values({
      userId,
      employeeId: employeeId || null,
      title,
      description: description || null,
      fileName,
      fileUrl,
      fileSize: fileSize || null,
      fileType: fileType || null,
      category: category || null,
    });

    const insertId = Number(result[0].insertId);
    const newDocument = await db.select().from(documents).where(eq(documents.id, insertId)).limit(1);

    res.status(201).json(newDocument[0]);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Failed to create document', message: String(error) });
  }
}
