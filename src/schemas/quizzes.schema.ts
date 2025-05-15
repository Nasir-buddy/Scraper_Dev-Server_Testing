import mongoose, { Schema, Document } from "mongoose";

export interface QuizOption {
  productName?: string;
  image?: string;
  option?: string;
  label?: string;
  name?: string;
  active?: boolean;
}

export interface QuizItem {
  id: number;
  quizType: string;
  question: string;
  choice?: string;
  options?: QuizOption[];
  numberOfInput?: number;
  minRange?: string;
  maxRange?: string;
  subHeadline?: string;
  buttonText?: string;
}

export interface QuizDocument extends Document {
  quizzes: QuizItem[];
  quizId: mongoose.Types.ObjectId;
}

const QuizOptionSchema = new Schema<QuizOption>({
  productName: { type: String },
  image: { type: String },
  option: { type: String },
  label: { type: String },
  name: { type: String },
  active: { type: Boolean },
},
{ _id: false });

const QuizItemSchema = new Schema<QuizItem>({
  id: { type: Number },
  quizType: { type: String },
  question: { type: String },
  choice: { type: String },
  options: { type: [QuizOptionSchema] },
  numberOfInput: { type: Number },
  minRange: { type: String },
  maxRange: { type: String },
  subHeadline: { type: String },
  buttonText: { type: String },
},
{ _id: false });

const QuizzesSchema = new Schema<QuizDocument>({
  quizzes: { type: [QuizItemSchema], required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const QuizzesModel =
  mongoose.models.Quizzes ||
  mongoose.model<QuizDocument>("Quizzes", QuizzesSchema);
