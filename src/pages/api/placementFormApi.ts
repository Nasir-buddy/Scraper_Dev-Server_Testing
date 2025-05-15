import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import PlacementFormData,{PlacementFormDataType} from "../../schemas/placement.schema";
import mongoose from "mongoose";
import QuizFormData from "../../schemas/quiz.schema";

export interface PlacementFormRequestBody {
  placementTitle: string;
  quizId: string;
}

export interface PlacementFormResponse {
  success: boolean;
  message: string;
  placementResponse?: PlacementFormDataType | PlacementFormDataType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlacementFormResponse>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { placementTitle, quizId }: PlacementFormRequestBody = req.body;

      // Validate quizId as ObjectId
      if (!mongoose.isValidObjectId(quizId)) {
        return res.status(400).json({ success: false, message: "Invalid quiz ID" });
      }

      // Check if quizId exists in the database
      const quizExists = await QuizFormData.findById(quizId);
      if (!quizExists) {
        return res.status(404).json({ success: false, message: "Quiz not found" });
      }

      // Check if placement data already exists for the given quizId
      const existingPlacement = await PlacementFormData.findOne({ quizId });

      if (existingPlacement) {
        // Update existing placement data
        existingPlacement.placementTitle = placementTitle;
        const updatedPlacementData = await existingPlacement.save();
        return res.status(200).json({ success: true, message: "Data updated successfully", placementResponse: updatedPlacementData });
      } else {
        // Save new placement data
        const newPlacement = new PlacementFormData({ placementTitle, quizId });
        const savedPlacementData = await newPlacement.save();
        return res.status(201).json({ success: true, message: "Data saved successfully", placementResponse: savedPlacementData });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server error"});
    }
  } else if (req.method === "GET") {
    try {
      const { quizId } = req.query;

      if (!quizId || typeof quizId !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "quizId is required and must be a string" });
      }

      const PlacementResponse = await PlacementFormData.find({ quizId: new mongoose.Types.ObjectId(quizId) }).select('-createdAt -updatedAt -quizId');

      if (!PlacementResponse.length) {
        return res
          .status(201)
          .json({ success: true, message: "No collections found for the given quizId", placementResponse: [] });
      }
      res
        .status(200)
        .json({ success: true, message: "Collections fetched successfully", placementResponse: PlacementResponse });
    } catch (error) {
      console.log("Error in fetching collections ", error);
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}