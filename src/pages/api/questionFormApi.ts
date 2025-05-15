import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import QuestionFormModel, { QuestionFormSchemaType } from "../../schemas/questions.schema";
import mongoose from "mongoose";
import QuizFormData from "../../schemas/quiz.schema";

export interface questionFormApiResponseType {
  success: boolean;
  message: string;
  questionsFormResponse?:  QuestionFormSchemaType | QuestionFormSchemaType[];
}

async function handler(req: NextApiRequest, res: NextApiResponse<questionFormApiResponseType>) {
  await connectToDatabase();
  if (req.method === "POST") {
    try {
      const { quizId, questionAnswer }: QuestionFormSchemaType = req.body;
      console.log("quiz id and requested data", quizId, questionAnswer);
      if (!quizId || !questionAnswer) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
      if (!mongoose.isValidObjectId(quizId)) {
        console.log("Quiz id is not valid");
        return res.status(400).json({ success: false, message: "Invalid quiz ID" });
      }

      // Check if quizId exists in the database
      const quizExists = await QuizFormData.findById(quizId);
      if (!quizExists) {
        console.log("Quiz is not exist in db");
        return res.status(404).json({ success: false, message: "Quiz not found" });
      }

      // Convert quizId to ObjectId
      const objectIdQuizId = new mongoose.Types.ObjectId(quizId);

      // Check if answers already exist for the quiz
      const existingAnswers = await QuestionFormModel.findOne({ quizId: objectIdQuizId });

      let questionFormIncomingData;
      if (existingAnswers) {
        // Update existing answers
        existingAnswers.questionAnswer = questionAnswer;
        questionFormIncomingData = await existingAnswers.save();
        console.log("Updated data", questionFormIncomingData);
      } else {
        // Save new answers
        const newQuestionForm = new QuestionFormModel({
          quizId: objectIdQuizId,
          questionAnswer,
        });
        questionFormIncomingData = await newQuestionForm.save();
        console.log("Saved data", questionFormIncomingData);
      }

      return res.status(201).json({
        success: true,
        message: "Question form saved successfully",
        questionsFormResponse: questionFormIncomingData,
      });
    } catch (error) {
      console.error("Error saving question form:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const { quizId } = req.query;

      console.log("Quiz id is available for questions form", quizId);
      if (!quizId || typeof quizId !== "string") {
        console.log("Quiz id is not in proper type");
        return res.status(400).json({ success: false, message: "quizId is required and must be a string" });
      }

      const QuestionFormResponse = await QuestionFormModel.find({ quizId: new mongoose.Types.ObjectId(quizId) }).select('-quizId');

      console.log("Getting the question response: ", QuestionFormResponse);
      if (!QuestionFormResponse.length) {
        return res.status(201).json({ success: true, message: "No collections found for the given quizId", questionsFormResponse: [] });
      }
      res.status(200).json({ success: true, message: "Collections fetched successfully", questionsFormResponse: QuestionFormResponse });
    } catch (error) {
      console.log("Error in fetching collections ", error);
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    console.error("Method not allowed");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

export default handler;