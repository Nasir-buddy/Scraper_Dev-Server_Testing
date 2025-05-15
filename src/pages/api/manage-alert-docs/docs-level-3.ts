import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import DocsLevel3 from '../../../schemas/alert-schemas/Docs-Level-3';
import { connectToDatabase } from "../../../lib/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const { level2Id } = req.query;
        console.log("level2Id is:", level2Id)
        const docs = await DocsLevel3.find({docsLevel2Id: level2Id });
        console.log("docs level 3 documents are:", docs)
        res.status(200).json(docs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
      }
      break;
    case 'POST':
      try {
        const { title, content, docsLevel2Id } = req.body;
        const doc = new DocsLevel3({ title, content, docsLevel2Id });
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
        const { title, content, docsLevel2Id } = req.body;
        const doc = await DocsLevel3.findByIdAndUpdate(id, { title, content, docsLevel2Id }, { new: true });
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
        const doc = await DocsLevel3.findByIdAndDelete(id);
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