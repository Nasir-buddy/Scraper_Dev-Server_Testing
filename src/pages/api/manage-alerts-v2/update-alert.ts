import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/utils/db";
import Alert, { AlertType } from "../../../schemas/alert-schemas/Alerts";

interface UpdateAlertApiRequest extends NextApiRequest {
  body: {
    alert: Partial<AlertType>;
    alertId: string;
  };
}

export default async function handler(
  req: UpdateAlertApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "PUT") {
    try {
      const {alert, alertId } = req.body;

    //   if (!id) {
    //     return res.status(400).json({ success: false, message: "id is required" });
    //   }

      console.log("updateData", alert)
      const updatedAlert = await Alert.findByIdAndUpdate(alertId, alert);

      if (!updatedAlert) {
        return res.status(404).json({ success: false, message: "Alert not found" });
      }

      return res.status(200).json({ success: true, message: "Alert updated successfully", alert: updatedAlert });
    } catch (error) {
      console.log("Error in updating alert ", error);
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
