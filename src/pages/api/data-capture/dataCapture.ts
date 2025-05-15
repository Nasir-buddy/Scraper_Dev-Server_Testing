import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/utils/tempDB';
import DataCaptureModel from '@/schemas/data-capture/datacapture.schema';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  console.log(userId);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  await connectToDatabase();

  const handleError = (error: unknown, message: string) => {
    console.error(`Error in ${req.method} handler:`, error);
    return res.status(500).json({ message, error });
  };

  const getUserDoc = async () => {
    const userDoc = await DataCaptureModel.findOne({ userId });
    if (!userDoc) return res.status(404).json({ message: 'User data not found' });
    return userDoc;
  };

  switch (req.method) {
    case 'POST': {
      const form = req.body;
      if (!form || Object.keys(form).length === 0) {
        return res.status(400).json({ message: 'Form data is missing or empty' });
      }

      try {
        const userDoc = await DataCaptureModel.findOne({ userId });
        const updatedDoc = userDoc 
          ? await DataCaptureModel.findOneAndUpdate(
              { userId },
              { $push: { forms: form } },
              { new: true, upsert: true }
            )
          : await DataCaptureModel.create({ userId, forms: [form] });
        console.log("updatedDoc",updatedDoc);
        if (!updatedDoc?.forms?.length) {
          return res.status(500).json({ 
            message: 'Form was not added to forms array',
            document: updatedDoc
          });
        }

        return res.status(201).json(updatedDoc);
      } catch (error) {
        return handleError(error, 'Failed to add form');
      }
    }

    case 'GET': {
      try {
        const userData = await DataCaptureModel.findOne({ userId });
        console.log("userData in data capture api",userData);
        return res.status(200).json(userData?.forms || []);
      } catch (error) {
        return handleError(error, 'Failed to fetch forms');
      }
    }

    case 'PUT': {
      const { formIndex, form } = req.body;
      console.log("formIndex",formIndex);
      console.log("form",form);
      if (typeof formIndex !== 'number') {
        return res.status(400).json({ message: 'Missing or invalid formIndex for update' });
      }

      try {
        let userDoc = await DataCaptureModel.findOne({ userId });
        console.log("userDoc",userDoc);
        if (!userDoc) {
          // Create a new document with empty forms up to formIndex
          const forms = [];
          forms[formIndex] = { ...form, updatedAt: new Date() };
          userDoc = await DataCaptureModel.create({ userId, forms });
          console.log("userDoc After Create",userDoc);
          return res.status(200).json(userDoc.forms[formIndex]);
        }
        if (!userDoc.forms?.[formIndex]) {
          return res.status(404).json({ message: 'Form entry not found' });
        }
        userDoc.forms[formIndex] = { 
          ...userDoc.forms[formIndex], 
          ...form, 
          updatedAt: new Date() 
        };
        console.log("userDoc After Update",userDoc);
        await userDoc.save();
        return res.status(200).json(userDoc.forms[formIndex]);
      } catch (error) {
        return handleError(error, 'Failed to update form');
      }
    }

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
