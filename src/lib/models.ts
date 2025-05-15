import QuizFormData from '@/schemas/quiz.schema';
import QuestionFormModel from '@/schemas/questions.schema';
import PlacementFormData from '@/schemas/placement.schema';
import ScopeFormData from '@/schemas/scope.schema';
import ProductFormData from '@/schemas/products.schema';
import CollectionFormData from '@/schemas/collections.schema';
import TriggersFormData from '@/schemas/triggers.schema';
import LayoutFormData from '@/schemas/layout.schema';
import ImagesFormData from '@/schemas/images.schema';
// Export all models
export {
  QuizFormData,
  QuestionFormModel,
  PlacementFormData,
  ScopeFormData,
  ProductFormData,
  CollectionFormData,
  TriggersFormData,
  LayoutFormData,
  ImagesFormData
};

// Ensure all models are registered
const models = {
  QuizFormData,
  QuestionFormModel,
  ScopeFormData,
  ProductFormData,
  CollectionFormData,
  TriggersFormData,
  LayoutFormData,
  ImagesFormData
};

export default models;