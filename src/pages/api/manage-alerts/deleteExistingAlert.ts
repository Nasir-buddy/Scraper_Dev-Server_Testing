import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Received a request to delete an alert...");

  if (req.method === "POST") {
    const { id } = req.body; // Assuming the ID of the alert to delete is sent in the request body
    console.log("Deleting alert with ID:", id);

    const filePath = path.join(process.cwd(), "src", "pages", "manage-alerts", "Alerts.json");

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read alerts file' });
      }

      let alerts;
      try {
        alerts = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return res.status(500).json({ error: 'Failed to parse alerts file' });
      }

      const alertIndex = alerts.findIndex((alert: any) => alert.id === id);
      if (alertIndex === -1) {
        return res.status(404).json({ error: 'Alert not found' });
      }

      alerts.splice(alertIndex, 1);

      fs.writeFile(filePath, JSON.stringify(alerts, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ error: 'Failed to delete alert' });
        }

        console.log('Alert deleted successfully');
        res.status(200).json({ message: 'Alert deleted successfully' });
      });
    });
  } else {
    console.log("Method not allowed");
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
