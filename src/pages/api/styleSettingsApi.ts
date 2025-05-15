import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/utils/db";
import StyleSettings, {
  IStyleSettings,
} from "../../schemas/styleSettings.schema";
import mongoose from "mongoose";
export interface StyleSettingsResponseType {
  message: string;
  success: boolean;
  stylesResponse?: IStyleSettings;
}

interface StyleSettingsApiRequest extends NextApiRequest {
  body: IStyleSettings;
}

export default async function handler(
  req: StyleSettingsApiRequest,
  res: NextApiResponse<StyleSettingsResponseType>
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { styles, quizId } = req.body;
      console.log(styles, quizId);
      console.log("Before existing record");
      const existingRecord = await StyleSettings.findOne({ quizId });
      console.log("Existing Record", existingRecord);
      if (existingRecord) {
        // Update the existing record
        existingRecord.styles = styles;
        const savedStyle = await existingRecord.save();
        console.log("saved style:", savedStyle);
        res.status(200).json({
          success: true,
          message: "Data updated successfully",
          stylesResponse: existingRecord,
        });
      } else {
        // Create a new record
        const newStyleSettings = new StyleSettings({
          styles, // Ensure this matches the schema field name
          quizId: new mongoose.Types.ObjectId(quizId), // Ensure quizId is correctly formatted
        });
        const savedStyle = await newStyleSettings.save();
        console.log("saved style", savedStyle);
        res.status(201).json({
          success: true,
          message: "Data submitted successfully",
          stylesResponse: newStyleSettings,
        });
      }
    } catch (error) {
      console.log("Error in submitting form", error);
      res.status(400).json({ success: false, message: "Error in submitting form" });
    }
  } else {
    console.log("Method is not post");
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
