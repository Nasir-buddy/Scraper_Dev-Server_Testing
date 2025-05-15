import mongoose, { Schema, Document, Types, Model } from "mongoose";
import QuizFormData from "./quiz.schema";

export interface PlacementFormDataType extends Document {
  placementTitle: string;
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
}

const PlacementFormDataSchema: Schema<PlacementFormDataType> = new Schema(
  {
    placementTitle: {
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

PlacementFormDataSchema.post('save', async function(doc: PlacementFormDataType) { 
  await QuizFormData.updateOne(
    { _id: doc.quizId },
    {  placements: doc._id }
  );
});

const PlacementFormData: Model<PlacementFormDataType> =
  mongoose.models.PlacementFormData ||
  mongoose.model<PlacementFormDataType>(
    "PlacementFormData",
    PlacementFormDataSchema
  );
export default PlacementFormData;
