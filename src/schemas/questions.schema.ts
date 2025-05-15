import mongoose, { Schema, Document, Types, Model } from "mongoose";
import QuizFormData from "./quiz.schema";

export interface QuestionAnswerFormType {
  questionId: number;
  answer: string;
  question: string;
}

export interface QuestionFormSchemaType extends Document {
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
  questionAnswer: QuestionAnswerFormType[];
}

const questionAnswerSchema = new Schema<QuestionAnswerFormType>({
  questionId: { type: Number, required: true },
  answer: { type: String, required: true },
  question: { type: String, required: true },
});

const QuestionFormSchema = new Schema<QuestionFormSchemaType>({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizFormData",
    required: true,
  },
  questionAnswer: { type: [questionAnswerSchema], required: true },
});

QuestionFormSchema.post('save', async function(doc: QuestionFormSchemaType) { 
  await QuizFormData.updateOne(
    { _id: doc.quizId },
    { questions: doc._id  }
  );
});

const QuestionFormModel: Model<QuestionFormSchemaType> =
  mongoose.models.QuestionFormModel ||
  mongoose.model<QuestionFormSchemaType>("QuestionFormModel", QuestionFormSchema);

export default QuestionFormModel;
