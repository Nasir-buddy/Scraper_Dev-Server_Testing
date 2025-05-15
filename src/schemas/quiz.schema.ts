import mongoose, { Schema, Document } from 'mongoose';
export interface QuizFormDataType extends Document {
  quizName: string;
  experienceType: string;
  quizType: string;
  question: string;
  userId: string; 
  questions: mongoose.Types.ObjectId; 
  placements: mongoose.Types.ObjectId; 
  collections: mongoose.Types.ObjectId; 
  products: mongoose.Types.ObjectId; 
  triggers: mongoose.Types.ObjectId; 
  layouts: mongoose.Types.ObjectId; 
}

const QuizFormDataSchema: Schema<QuizFormDataType> = new Schema({
  quizName: { type: String, required: true },
  experienceType: { type: String, required: true },
  quizType: { type: String, required: true },
  question: { type: String, required: true },
  userId: { 
    type:String,
    required:true 
  },
  questions: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'QuestionFormModel' 
  },
  placements: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlacementFormData'
  },
  collections: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectionFormData'
  },
  products: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductFormData'
  },
  triggers: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TriggersFormData'
  },
  layouts: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LayoutFormData'
  },
},{timestamps:true});

const QuizFormData = mongoose.models.QuizFormData || mongoose.model('QuizFormData', QuizFormDataSchema);

export default QuizFormData;