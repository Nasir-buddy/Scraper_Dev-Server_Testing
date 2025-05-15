import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import DocsLevel1 from '../../../schemas/alert-schemas/Docs-Level-1';

import { connectToDatabase } from "../../../lib/utils/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const docs = await DocsLevel1.find({});
        res.status(200).json(docs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
      }
      break;
    case 'POST':
      try {
        const { title, content } = req.body;
        const doc = new DocsLevel1({ title, content });
        await doc.save();
        res.status(201).json(doc);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create document' });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        const { title, content } = req.body;
        const doc = await DocsLevel1.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!doc) {
          return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(doc);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update document' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        const doc = await DocsLevel1.findByIdAndDelete(id);
        if (!doc) {
          return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete document' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 