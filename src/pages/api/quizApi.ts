import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import QuizFormData, { QuizFormDataType } from "../../schemas/quiz.schema";
import { getAuth } from '@clerk/nextjs/server';

export interface InfoFormDataType {
  quizName: string;
  experienceType: string;
  quizType: string;
  question: string;
  quizId?: string;
}

export interface QuizApiResponse {
  success: boolean;
  data?: QuizFormDataType;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizApiResponse>
) {
  if (req.method === "POST") {
    try {
      // Connecting to database
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "No user available",
        });
      }
      await connectToDatabase();
      const { quizName, quizType, question, experienceType, quizId } =
        req.body as InfoFormDataType;

      let savedQuizFormData: QuizFormDataType;

      if (quizId) {
        // Check if quiz with the given ID exists
        const existingQuiz = await QuizFormData.findById(quizId);
        if (existingQuiz) {
          // Update the existing quiz
          existingQuiz.quizName = quizName;
          existingQuiz.quizType = quizType;
          existingQuiz.question = question;
          existingQuiz.experienceType = experienceType;
          savedQuizFormData = await existingQuiz.save();
          return res.status(200).json({
            success: true,
            message: "Quiz successfully updated",
            data: savedQuizFormData,
          });
        }
      }

      // Create a new quiz if no existing quiz is found
      const newQuizFormData = new QuizFormData({
        quizName,
        quizType,
        question,
        experienceType,
        userId,
      });
      console.log("new quiz form data created");

      // Save the new quiz to the database
      savedQuizFormData = await newQuizFormData.save();
      res.status(201).json({
        success: true,
        message: "Data successfully saved",
        data: savedQuizFormData,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(400).json({
        success: false,
        message: "Failed to save data",
      });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}