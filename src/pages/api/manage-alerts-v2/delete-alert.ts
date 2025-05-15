import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/utils/db";
import Alert from "../../../schemas/alert-schemas/Alerts";

interface DeleteAlertApiRequest extends NextApiRequest {
    query: { _id: string };
}

export default async function handler(
    req: DeleteAlertApiRequest,
    res: NextApiResponse
) {
    await connectToDatabase();

    if (req.method === "POST") {
        try {
            const { alertId } = req.body;

            if (!alertId) {
                return res.status(400).json({ success: false, message: "alertId is required" });
            }

            const deletedAlert = await Alert.findByIdAndDelete(alertId);

            if (!deletedAlert) {
                return res.status(404).json({ success: false, message: "Alert not found" });
            }

            return res.status(200).json({ success: true, message: "Alert deleted successfully" });
        } catch (error) {
            console.log("Error in deleting alert ", error);
            res.status(400).json({ success: false, message: (error as Error).message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
