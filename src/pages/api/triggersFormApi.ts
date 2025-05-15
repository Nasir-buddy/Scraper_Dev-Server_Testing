import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import mongoose, { Types } from "mongoose";
import TriggersFormData, { TriggersDataItem,TriggersFormDataType } from "../../schemas/triggers.schema";
import QuizFormData from "../../schemas/quiz.schema";

export interface TriggerFormApiResponseType {
  success: boolean;
  message: string;
  triggersResponse?: TriggersFormDataType |TriggersFormDataType[];
}

interface TriggerFormRequestBody {
  triggersData: TriggersDataItem[];
  quizId: Types.ObjectId;
  idleSeconds: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<TriggerFormApiResponseType>) => {
  await connectToDatabase();
  if (req.method === "POST") {
    try {
      let { triggersData, quizId, idleSeconds } = req.body as TriggerFormRequestBody;
      idleSeconds = idleSeconds.trim() === "" ? "0" : idleSeconds;

      // Check for valid quizId
      if (!mongoose.isValidObjectId(quizId)) {
        return res.status(400).json({ success: false, message: "Invalid quiz ID" });
      }

      // Check if quizId exists in the database
      const quizExists = await QuizFormData.findById(quizId);
      if (!quizExists) {
        return res.status(404).json({ success: false, message: "Quiz not found" });
      }

      // Convert quizId to ObjectId
      const objectIdQuizId = new mongoose.Types.ObjectId(quizId);

      // Check if data already exists for the given quizId
      const existingTriggersData = await TriggersFormData.findOne({ quizId: objectIdQuizId });

      if (existingTriggersData) {
        // Update existing data
        existingTriggersData.triggersData = triggersData;
        existingTriggersData.idleSeconds = idleSeconds;
        const updatedData = await existingTriggersData.save();
        return res.status(200).json({
          success: true,
          message: "Data updated successfully",
          triggersResponse: updatedData,
        });
      } else {
        // Save new data
        const newTriggersFormData = new TriggersFormData({
          triggersData,
          quizId: objectIdQuizId,
          idleSeconds,
        });
        const responseTriggersFormData = await newTriggersFormData.save();
        return res.status(201).json({
          success: true,
          message: "Data saved successfully",
          triggersResponse: responseTriggersFormData,
        });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({
        success: false,
        message: "Error saving data",
      });
    }
  } else if (req.method === "GET") {
    try {
      const { quizId } = req.query;

      if (!quizId || typeof quizId !== "string") {
        return res.status(400).json({ success: false, message: "quizId is required and must be a string" });
      }

      const TriggersResponse = await TriggersFormData.find({ quizId: new mongoose.Types.ObjectId(quizId) }).select('-createdAt -updatedAt -quizId');

      if (!TriggersResponse.length) {
        return res.status(201).json({ success: true, message: "No collections found for the given quizId", triggersResponse: [] });
      }
      res.status(200).json({ success: true, message: "Collections fetched successfully", triggersResponse: TriggersResponse });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default handler;