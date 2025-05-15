import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import QuizFormData from './quiz.schema';
export interface ProductsFormDataType extends Document {
  selectedProducts: mongoose.Types.ObjectId[]; // Array of ObjectId references
  selectedScope: string;
  quizId: mongoose.Types.ObjectId; // Reference to QuizFormData
}

const ProductsFormDataSchema: Schema = new Schema<ProductsFormDataType>({
  selectedProducts: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  selectedScope: {
    type: String,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizFormData', // Correct reference
    required: true,
  },
},{timestamps:true});

ProductsFormDataSchema.post('save', async function(doc: ProductsFormDataType) { 
  await QuizFormData.updateOne(
    { _id: doc.quizId },
    { products: doc._id } 
  );
});

const ProductFormData = mongoose.models.ProductFormData || mongoose.model('ProductFormData', ProductsFormDataSchema);

export default ProductFormData;
