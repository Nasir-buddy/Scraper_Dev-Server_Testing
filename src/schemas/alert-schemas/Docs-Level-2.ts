import mongoose, { Schema, Document, Types } from "mongoose";
import DocsLevel1 from "./Docs-Level-1";

export interface DocsLevel2Type extends Document {
  title: string;
  content: string;
  docsLevel1Id: Types.ObjectId;
}

const DocsLevel2Schema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    docsLevel1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocsLevel1",
      required: true,
    },
  },
  { timestamps: true }
);

const DocsLevel2 =
  mongoose.models.DocsLevel2 || mongoose.model("DocsLevel2", DocsLevel2Schema);

export default DocsLevel2;
