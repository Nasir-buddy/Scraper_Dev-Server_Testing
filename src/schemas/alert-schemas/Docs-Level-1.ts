import mongoose, { Schema, Document } from "mongoose";

export interface DocsLevel1Type extends Document {
  title: string;
  content: string;
}

const DocsLevel1Schema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DocsLevel1 =
  mongoose.models.DocsLevel1 || mongoose.model("DocsLevel1", DocsLevel1Schema);

export default DocsLevel1;
