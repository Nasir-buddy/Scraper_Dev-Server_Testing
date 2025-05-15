import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/utils/db";
import LayoutFormData, { LayoutFormDataType } from "@/schemas/layout.schema";
import mongoose from "mongoose";
import QuizFormData from "@/schemas/quiz.schema";

export interface LayoutFormRequestBody {
  layoutTitle: string;
  layoutImage?: string;
  startScreenImage?: string;
  quizId: string;
}

export interface LayoutFormResponse {
  success: boolean;
  message: string;
  layoutResponse?: LayoutFormDataType;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LayoutFormResponse>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { layoutTitle, quizId, layoutImage, startScreenImage }: LayoutFormRequestBody =
        req.body;

      // Validate quizId as ObjectId
      if (!mongoose.isValidObjectId(quizId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid quiz ID" });
      }

      // Check if quizId exists in the database
      const quizExists = await QuizFormData.findById(quizId);
      if (!quizExists) {
        return res
          .status(404)
          .json({ success: false, message: "Quiz not found" });
      }
      const existingLayout = await LayoutFormData.findOne({ quizId });

      if (existingLayout) {
        existingLayout.layoutTitle = layoutTitle;
        existingLayout.layoutImage = layoutImage?layoutImage:existingLayout.layoutImage;
        existingLayout.startScreenImage = startScreenImage?startScreenImage:existingLayout.startScreenImage;
        const updatedLayoutData = await existingLayout.save();
        return res
          .status(200)
          .json({
            success: true,
            message: "Data updated successfully",
            layoutResponse: updatedLayoutData,
          });
      } else {
        const newLayout = new LayoutFormData({
          layoutTitle,
          layoutImage,
          startScreenImage,
          quizId,
        });
        const savedLayoutData = await newLayout.save();
        return res
          .status(201)
          .json({
            success: true,
            message: "Data saved successfully",
            layoutResponse: savedLayoutData,
          });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
