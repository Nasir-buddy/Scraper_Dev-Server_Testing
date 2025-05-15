import mongoose, { Schema, Document, Model, Types } from 'mongoose';
export interface ScopeFormDataType extends Document {
  selectedProducts: mongoose.Types.ObjectId[]; // Array of ObjectId references
  selectedExperience: string;
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
}

const ScopeFormDataSchema: Schema = new Schema({
  selectedProducts: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  selectedExperience: {
    type: String,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizFormData', // Correct reference
    required: true,
  },
},{timestamps:true});

const ScopeFormData = mongoose.models.ScopeFormData || mongoose.model('ScopeFormData', ScopeFormDataSchema);

export default ScopeFormData;
