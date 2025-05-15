import mongoose, { Schema, Document, Model } from "mongoose";
import QuizFormData from "./quiz.schema";

export interface TriggersDataItem {
  triggersItemSlug: string;
  isChecked: boolean;
}

export interface TriggersFormDataType extends Document {
  triggersData: TriggersDataItem[];
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
  idleSeconds: string;
}

const TriggersDataItemSchema: Schema<TriggersDataItem> = new Schema(
  {
    triggersItemSlug: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const TriggersFormDataSchema: Schema<TriggersFormDataType> = new Schema(
  {
    triggersData: {
      type: [TriggersDataItemSchema],
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizFormData", // Correct reference
      required: true,
    },
    idleSeconds: {
      type: String,
      required: true,
      default: "0",
    },
  },
  { timestamps: true }
);

TriggersFormDataSchema.post('save', async function(doc: TriggersFormDataType) { 
  await QuizFormData.updateOne(
    { _id: doc.quizId },
    {  triggers: doc._id }
  );
});

const TriggersFormData: Model<TriggersFormDataType> =
  mongoose.models.TriggersFormData ||
  mongoose.model<TriggersFormDataType>(
    "TriggersFormData",
    TriggersFormDataSchema
  );
export default TriggersFormData;
