import mongoose, { Schema, Document } from "mongoose";

export interface FollowUpQuestion {
  id: string;
  question: string;
  answer: string;
  keywords: Keyword[];
}

export interface Optimization {
  id: string;
  description: string;
  keywords: Keyword[];
}

export interface FollowUpOptimization {
  id: string;
  question: string;
  answer: string;
  keywords: Keyword[];
}

export interface Keyword {
  doc_id: string;
  level: number;
  matching_text: string;
}

export interface AlertType extends Document {
  id: string;
  title: string;
  description: string;
  followUpQuestions: FollowUpQuestion[];
  optimizations: Optimization[];
  followUpOptimizations: FollowUpOptimization[];
  keywords: Keyword[];
}

const KeywordSchema: Schema = new Schema({
  doc_id: { type: String, required: true },
  level: { type: Number, required: true },
  matching_text: { type: String, required: true },
});


const AlertSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    followUpQuestions: [
      {
        id: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        keywords: { type: [KeywordSchema], required: true },
      },
    ],
    optimizations: [
      {
        id: { type: String, required: true },
        description: { type: String, required: true },
        keywords: { type: [KeywordSchema], required: true },
      },
    ],
    followUpOptimizations: [
      {
        id: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        keywords: { type: [KeywordSchema], required: true },
      },
    ],
    keywords: [
      {
        doc_id: { type: String, required: true },
        level: { type: Number, required: true },
        matching_text: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Alert =
  mongoose.models.Alert || mongoose.model<AlertType>("Alert", AlertSchema);

export default Alert;


