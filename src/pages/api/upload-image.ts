import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const boundary = req.headers["content-type"]?.split("boundary=")[1];
      if (!boundary) {
        return res.status(400).json({ error: "No boundary in request" });
      }

      const parts = buffer.toString().split(`--${boundary}`);
      const filePart = parts.find((part) =>
        part.includes('Content-Disposition: form-data; name="image"')
      );

      if (!filePart) {
        return res.status(400).json({ error: "No file part in request" });
      }
      const fileHeaders = filePart.split("\r\n\r\n")[0];

      const fileContent = filePart.split("\r\n\r\n")[1].split("\r\n--")[0];
      console.log("File Headers:", fileHeaders);

    //   console.log("Uploaded file content:", fileContent);

      res.status(200).json({ message: "File uploaded successfully" });
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default uploadImage;
