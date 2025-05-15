import mongoose, { Schema, Document, Types, Model } from "mongoose";
import QuizFormData from "./quiz.schema";

export interface LayoutFormDataType extends Document {
  layoutTitle: string;
  layoutImage:string;
  startScreenImage:string;
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
}

const LayoutFormDataSchema: Schema<LayoutFormDataType> = new Schema(
  {
    layoutTitle: {
      type: String,
      required: true,
    },
    layoutImage:{
      type:String,
    },
    startScreenImage:{
      type:String,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizFormData", // Correct reference
      required: true,
    },
  },
  { timestamps: true }
);

LayoutFormDataSchema.post('save', async function(doc: LayoutFormDataType) { 
  await QuizFormData.updateOne(
    { _id: doc.quizId },
    {  layouts: doc._id }
  );
});

const LayoutFormData: Model<LayoutFormDataType> =
  mongoose.models.LayoutFormData ||
  mongoose.model<LayoutFormDataType>(
    "LayoutFormData",
    LayoutFormDataSchema
  );
export default LayoutFormData;
