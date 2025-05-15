import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/utils/db";
import Alert from "../../../schemas/alert-schemas/Alerts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const { title } = req.query;

      if (!title) {
        return res.status(400).json({ success: false, message: "title is required" });
      }

      const alerts = await Alert.find({ title: new RegExp(title as string, 'i') }).select('_id title');

      if (!alerts) {
        return res.status(404).json({ success: false, message: "Alert not found" });
      }

      return res.status(200).json({ success: true, alerts });
    } catch (error) {
      console.log("Error in fetching alert by title ", error);
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
