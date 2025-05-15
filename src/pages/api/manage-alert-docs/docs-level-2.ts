import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import DocsLevel2 from '../../../schemas/alert-schemas/Docs-Level-2';
import { connectToDatabase } from "../../../lib/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const { level1Id } = req.query;
        console.log(level1Id);
        const docs = await DocsLevel2.find({docsLevel1Id: level1Id });
        console.log("docs level 2:",docs);
        res.status(200).json(docs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
      }
      break;
    case 'POST':
      try {
        const { title, content, docsLevel1Id } = req.body;
        const doc = new DocsLevel2({ title, content, docsLevel1Id });
        await doc.save();
        res.status(201).json(doc);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create document' });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        if (!mongoose.Types.ObjectId.isValid(id as string)) {
          return res.status(400).json({ error: 'Invalid document ID' });
        }
        const { title, content, docsLevel1Id } = req.body;
        const doc = await DocsLevel2.findByIdAndUpdate(id, { title, content, docsLevel1Id }, { new: true });
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
        if (!mongoose.Types.ObjectId.isValid(id as string)) {
          return res.status(400).json({ error: 'Invalid document ID' });
        }
        const doc = await DocsLevel2.findByIdAndDelete(id);
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