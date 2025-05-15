import mongoose, { Schema, Document } from "mongoose";

export interface IStyleSettings extends Document {
  styles: {
    textColor: string;
    backgroundColor: string;
    cornerRadius: string;
    borderWidth: string;
    borderColor: string;
    backgroundButton: string;
    shadow: string;
    font: string;
    lineHeight: string;
    letterSpacing: string;
    boldness: string;
  };
  quizId: mongoose.Types.ObjectId;
}

const StyleSettingsSchema: Schema = new Schema({
  styles: {
    textColor: { type: String, required: true },
    backgroundColor: { type: String, required: true },
    cornerRadius: { type: String, required: true },
    borderWidth: { type: String, required: true },
    borderColor: { type: String, required: true },
    backgroundButton: { type: String, required: true },
    shadow: { type: String, required: true },
    font: { type: String, required: true },
    lineHeight: { type: String, required: true },
    letterSpacing: { type: String, required: true },
    boldness: { type: String, required: true },
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizFormData",
    required: true,
  },
});

const StyleSettings =
  mongoose.models.StyleSettings ||
  mongoose.model<IStyleSettings>("StyleSettings", StyleSettingsSchema);
export default StyleSettings;