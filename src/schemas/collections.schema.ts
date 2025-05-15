import mongoose, { Schema, Document, Model, Types } from "mongoose";
import QuizFormData from "./quiz.schema";
export interface CollectionsFormDataType extends Document {
  selectedCollections: mongoose.Types.ObjectId[];
  selectedScope: string;
  quizId: Types.ObjectId;
}

const CollectionFormDataSchema: Schema = new Schema(
  {
    selectedCollections: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    selectedScope: {
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

CollectionFormDataSchema.post(
  "save",
  async function (doc: CollectionsFormDataType) {
    await QuizFormData.updateOne(
      { _id: doc.quizId },
      { collections: doc._id }
    );
  }
);
const CollectionFormData =
  mongoose.models.CollectionFormData ||
  mongoose.model("CollectionFormData", CollectionFormDataSchema);

export default CollectionFormData;
