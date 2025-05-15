import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Received a request to save alert data...");

  if (req.method === "POST") {
    const newAlerts = req.body; // Assuming this is an array of alerts
    console.log("Saving alerts:", newAlerts);

    const filePath = path.join(process.cwd(),"src", "pages", "manage-alerts", "Alerts.json");

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

      if (Array.isArray(newAlerts)) {
        alerts = alerts.concat(newAlerts);
      } else {
        alerts.push(newAlerts);
      }

      fs.writeFile(filePath, JSON.stringify(alerts, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ error: 'Failed to save alert' });
        }

        console.log('Alert saved successfully');
        res.status(200).json({ message: 'Alert saved successfully' });
      });
    });
  } else {
    console.log("Method not allowed");
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
