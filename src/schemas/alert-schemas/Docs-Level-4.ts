import mongoose, { Schema, Document, Types } from "mongoose";
import DocsLevel3 from "./Docs-Level-3";

export interface DocsLevel4Type extends Document {
  title: string;
  content: string;
  docsLevel3Id: Types.ObjectId;
}

const DocsLevel4Schema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    docsLevel3Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocsLevel3",
      required: true,
    },
  },
  { timestamps: true }
);

const DocsLevel4 =
  mongoose.models.DocsLevel4 || mongoose.model("DocsLevel4", DocsLevel4Schema);

export default DocsLevel4;
