import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/utils/db";
import ImagesFormData, { ImagesFormDataType } from "@/schemas/images.schema";
import mongoose from "mongoose";
import QuizFormData from "@/schemas/quiz.schema";

export interface ImagesFormRequestBody {
  bodyScreenImage: string;
  startScreenImage: string;
  quizId: string;
}

export interface ImagesFormResponse {
  success: boolean;
  message: string;
  imagesResponse?: ImagesFormDataType;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImagesFormResponse>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const {
        startScreenImage,
        quizId,
        bodyScreenImage,
      }: ImagesFormRequestBody = req.body;

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
      const existingImages = await ImagesFormData.findOne({ quizId });

      if (existingImages) {
        existingImages.startScreenImage = startScreenImage;
        existingImages.bodyScreenImage = bodyScreenImage;
        const updatedImages = await existingImages.save();
        return res.status(200).json({
          success: true,
          message: "Data updated successfully",
          imagesResponse: updatedImages,
        });
      } else {
        const newImages = new ImagesFormData({
          startScreenImage,
          bodyScreenImage,
          quizId,
        });
        const savedImagesData = await newImages.save();
        return res.status(201).json({
          success: true,
          message: "Data saved successfully",
          imagesResponse: savedImagesData,
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
