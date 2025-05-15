import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import CollectionFormData, { CollectionsFormDataType } from "../../schemas/collections.schema";
import mongoose from "mongoose";
import QuizFormData from "../../schemas/quiz.schema";

export interface CollectionsFormApiResponseType {
  success: boolean;
  message: string;
  collectionsFormData?: CollectionsFormDataType | CollectionsFormDataType[] | null;
}

export interface CollectionsFormApiRequestBody {
  selectedCollections: string[];
  selectedScope: string;
  quizId: string;
}

interface CollectionsFormApiRequest extends NextApiRequest {
  body: CollectionsFormApiRequestBody;
}

export default async function handler(
  req: CollectionsFormApiRequest,
  res: NextApiResponse<CollectionsFormApiResponseType>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { selectedCollections, selectedScope, quizId } = req.body;

      if (!Array.isArray(selectedCollections) || !selectedCollections.every(id => typeof id === 'string')) {
        return res.status(400).json({ success: false, message: "selectedCollections must be an array of strings" });
      }

      if (typeof selectedScope !== 'string' || typeof quizId !== 'string') {
        return res.status(400).json({ success: false, message: "selectedScope and quizId must be strings" });
      }

      const quizExists = await QuizFormData.findById(quizId);
      if (!quizExists) {
        return res.status(400).json({ success: false, message: "Invalid quizId or quiz not found" });
      }

      const existingData = await CollectionFormData.findOne({ quizId: new mongoose.Types.ObjectId(quizId) });

      if (existingData) {
        existingData.selectedCollections = selectedCollections.map(id => new mongoose.Types.ObjectId(id));
        existingData.selectedScope = selectedScope;
        const updatedData = await existingData.save();
        return res.status(200).json({ success: true, message: "Data updated successfully", collectionsFormData: updatedData });
      } else {
        const newCollectionsFormData: CollectionsFormDataType = new CollectionFormData({
          selectedCollections: selectedCollections.map(id => new mongoose.Types.ObjectId(id)),
          selectedScope,
          quizId: new mongoose.Types.ObjectId(quizId),
        });
        const newData = await newCollectionsFormData.save();
        return res.status(201).json({ success: true, message: "Data created successfully", collectionsFormData: newData });
      }
    } catch (error) {
      console.log("Error in submitting form ", error);
      res.status(400).json({ success: false, message: (error as Error).message, collectionsFormData: null });
    }
  } else if (req.method === "GET") {
    try {
      const { quizId } = req.query;

      if (!quizId || typeof quizId !== "string") {
        return res.status(400).json({ success: false, message: "quizId is required and must be a string", collectionsFormData: null });
      }

      const collections = await CollectionFormData.find({ quizId: new mongoose.Types.ObjectId(quizId) }).select('-createdAt -updatedAt -quizId');

      if (!collections.length) {
        return res.status(201).json({ success: true, message: "No collections found for the given quizId", collectionsFormData: [] });
      }

      res.status(200).json({ success: true, message: "Collections fetched successfully", collectionsFormData: collections });
    } catch (error) {
      console.log("Error in fetching collections ", error);
      res.status(500).json({ success: false, message: (error as Error).message, collectionsFormData: null });
    }
  } else {
    console.log("Method is not allowed");
    res.status(405).json({ success: false, message: "Method not allowed", collectionsFormData: null });
  }
}