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
      const alerts = await Alert.find({});
      console.log("alerts", alerts);
      return res.status(200).json({ success: true, alerts });
    } catch (error) {
      console.log("Error in fetching alerts ", error);
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
