import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/utils/db";
import Alert, { AlertType } from "../../../schemas/alert-schemas/Alerts";

interface AddAlertApiRequest extends NextApiRequest {
  body: AlertType;
}

export default async function handler(
  req: AddAlertApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { id, title, description, followUpQuestions, optimizations, followUpOptimizations, keywords } = req.body;

      if (!id || !title || !description) {
        return res.status(400).json({ success: false, message: "id, title, and description are required" });
      }

      const newAlert = new Alert({
        id,
        title,
        description,
        followUpQuestions,
        optimizations,
        followUpOptimizations,
        keywords,
      });

      const savedAlert = await newAlert.save();
      return res.status(201).json({ success: true, message: "Alert created successfully", alert: savedAlert });
    } catch (error) {
      console.log("Error in adding alert ", error);
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
