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
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: "id is required" });
      }

      const alert = await Alert.findById(id);

      if (!alert) {
        return res.status(404).json({ success: false, message: "Alert not found" });
      }

      return res.status(200).json({ success: true, alert });
    } catch (error) {
      console.log("Error in fetching alert by ID ", error);
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
