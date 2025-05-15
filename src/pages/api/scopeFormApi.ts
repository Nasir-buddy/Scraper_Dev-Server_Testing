import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../lib/utils/db";
import ScopeFormData, { ScopeFormDataType } from '../../schemas/scope.schema';
import mongoose from 'mongoose';
export interface ScopeResponseType{
  message:string;
  success:boolean;
  scopeResponse?:ScopeFormDataType |ScopeFormDataType[];
}
interface ScopeFormApiRequestBody {
  selectedProducts: string[]; // Assuming these are strings representing ObjectIds
  selectedExperience: string;
  quizId: string;
}

interface ScopeFormApiRequest extends NextApiRequest {
  body: ScopeFormApiRequestBody;
}

export default async function handler(req: ScopeFormApiRequest, res: NextApiResponse<ScopeResponseType>) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { selectedProducts, selectedExperience, quizId } = req.body;

      const newScopeFormData: ScopeFormDataType = new ScopeFormData({
        selectedProducts: selectedProducts.map(id => new mongoose.Types.ObjectId(id)),
        selectedExperience,
        quizId: new mongoose.Types.ObjectId(quizId), // Convert to ObjectId
      });
      console.log(newScopeFormData, "New scope form data submitted");
      await newScopeFormData.save();
      console.log("saved to the database of scope form")
      res.status(201).json({ success: true, message: "data submitted successfully", scopeResponse: newScopeFormData });
    } catch (error) {
        console.log("Error in submitting form");
      res.status(400).json({ success: false, message:"Error in submitting form" });
    }
  } else {
    console.log("Method is not post")
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
