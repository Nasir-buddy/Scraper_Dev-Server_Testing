import mongoose, { Schema, Document, Types } from "mongoose";
import DocsLevel2 from "./Docs-Level-2";

export interface DocsLevel3Type extends Document {
  title: string;
  content: string;
  docsLevel2Id: Types.ObjectId;
}

const DocsLevel3Schema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    docsLevel2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocsLevel2",
      required: true,
    },
  },
  { timestamps: true }
);

const DocsLevel3 =
  mongoose.models.DocsLevel3 || mongoose.model("DocsLevel3", DocsLevel3Schema);

export default DocsLevel3;
