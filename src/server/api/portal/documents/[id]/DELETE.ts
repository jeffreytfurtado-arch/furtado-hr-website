import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { documents } from '../../../../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;
    const documentId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized - Please log in' });
    }

    if (isNaN(documentId)) {
      return res.status(400).json({ error: 'Invalid document ID' });
    }

    await db
      .delete(documents)
      .where(and(eq(documents.id, documentId), eq(documents.userId, userId)));

    res.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document', message: String(error) });
  }
}
