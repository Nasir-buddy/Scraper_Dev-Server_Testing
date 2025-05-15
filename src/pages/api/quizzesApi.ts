import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/utils/db';
import { QuizzesModel } from '../../schemas/quizzes.schema';
import { QuizDocument } from '../../schemas/quizzes.schema';
import mongoose from 'mongoose';
export interface QuizzesResponseType {
  message: string;
  success: boolean;
  quizzesResponse?: QuizDocument;
}

interface QuizzesApiRequest extends NextApiRequest {
  body: QuizDocument;
}

export default async function handler(
  req: QuizzesApiRequest,
  res: NextApiResponse<QuizzesResponseType>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { quizzes, quizId } = req.body;
      console.log("Quizzes and quiz id",quizzes,quizId)

      const existingRecord = await QuizzesModel.findOne({ quizId });

      if (existingRecord) {
        existingRecord.quizzes = quizzes;
        await existingRecord.save();
        res
          .status(200)
          .json({
            success: true,
            message: "Data updated successfully",
            quizzesResponse: existingRecord,
          });
      } else {
        const newQuizzesDta = new QuizzesModel({
          quizzes: quizzes,
          quizId: new mongoose.Types.ObjectId(quizId),
        });
        console.log("New quiz data",newQuizzesDta)
        await newQuizzesDta.save();
        res
          .status(201)
          .json({
            success: true,
            message: "Data submitted successfully",
            quizzesResponse: newQuizzesDta,
          });
      }
    } catch (error) {
      console.log("Error in submitting form",error);
      res
        .status(400)
        .json({ success: false, message: "Error in submitting form" });
    }
  } else {
    console.log("Method is not post");
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
