import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import ProductFormData, {
  ProductsFormDataType,
} from "../../schemas/products.schema";
import mongoose from "mongoose";
import QuizFormData from "../../schemas/quiz.schema";

export interface ProductsFormApiResponseType {
  success: boolean;
  message: string;
  productsData?: ProductsFormDataType | ProductsFormDataType[];
}

export interface ProductsFormApiRequestBody {
  selectedProducts: string[];
  selectedScope: string;
  quizId: string;
}

interface ProductsFormApiRequest extends NextApiRequest {
  body: ProductsFormApiRequestBody;
}

export default async function handler(
  req: ProductsFormApiRequest,
  res: NextApiResponse<ProductsFormApiResponseType>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { selectedProducts, selectedScope, quizId } = req.body;

      const quizExists = await QuizFormData.findById(quizId);
      if (!quizExists) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Invalid quizId or quiz not found",
          });
      }

      const existingProductData = await ProductFormData.findOne({ quizId: new mongoose.Types.ObjectId(quizId) });

      if (existingProductData) {
        existingProductData.selectedProducts = selectedProducts.map(
          (id) => new mongoose.Types.ObjectId(id)
        );
        existingProductData.selectedScope = selectedScope;
        const updatedProductData = await existingProductData.save();
        return res
          .status(200)
          .json({
            success: true,
            message: "Data updated successfully",
            productsData: updatedProductData,
          });
      } else {
        const newProductsFormData: ProductsFormDataType = new ProductFormData({
          selectedProducts: selectedProducts.map(
            (id) => new mongoose.Types.ObjectId(id)
          ),
          selectedScope,
          quizId: new mongoose.Types.ObjectId(quizId), // Convert to ObjectId
        });
        const ProductsFormDataResponse = await newProductsFormData.save();
        return res
          .status(201)
          .json({
            success: true,
            message: "Data submitted successfully",
            productsData: ProductsFormDataResponse,
          });
      }
    } catch (error) {
      console.log("Error in submitting form ", error);
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  } else if (req.method === "GET") {
    try {
      const { quizId } = req.query;

      if (!quizId || typeof quizId !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "quizId is required and must be a string" });
      }

      const productsResponse = await ProductFormData.find({ quizId: new mongoose.Types.ObjectId(quizId) }).select('-createdAt -updatedAt -quizId');

      if (!productsResponse.length) {
        return res
          .status(201)
          .json({ success: true, message: "No products found for the given quizId", productsData: [] });
      }

      res
        .status(200)
        .json({ success: true, message: "Products fetched successfully", productsData: productsResponse });
    } catch (error) {
      console.log("Error in fetching products ", error);
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    console.log("Method is not post");
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}