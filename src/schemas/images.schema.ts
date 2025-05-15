import mongoose, { Schema, Document, Types, Model } from "mongoose";
import QuizFormData from "./quiz.schema";

export interface ImagesFormDataType extends Document {
  startScreenImage: string;
  bodyScreenImage: string;
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
}

const ImagesFormDataSchema: Schema<ImagesFormDataType> = new Schema(
  {
    startScreenImage: {
      type: String,
      required: true,
    },
    bodyScreenImage: {
      type: String,
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizFormData", // Correct reference
      required: true,
    },
  },
  { timestamps: true }
);

// ImagesFormDataSchema.post('save', async function(doc: ImagesFormDataType) {
//   await QuizFormData.updateOne(
//     { _id: doc.quizId },
//     {  layouts: doc._id }
//   );
// })

const ImagesFormData: Model<ImagesFormDataType> =
  mongoose.models.ImagesFormData ||
  mongoose.model<ImagesFormDataType>("ImagesFormData", ImagesFormDataSchema);
export default ImagesFormData;
