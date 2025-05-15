import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const responseFromOpenAI = async (alertData: any, context: any, query: string, messages: any, res: NextApiResponse) => {
    const prompt = `You are an expert assistant. Your task is to help the user understand an alert by analyzing the provided alert details and referencing the knowledge base content.
        Alert Details:
            Title: ${alertData.title}
            Description: ${alertData.description}
            Optimizations: ${JSON.stringify(alertData.optimizations)}

        Knowledge Base:
            ${context}

        Instructions:
        1. Carefully review the alert details and the knowledge base.
        2. Use only information from the knowledge base and alert details to explain the alert.
        3. If the knowledge base does not contain relevant information, state that clearly.
        4. Format your answer with headings, bullet points, or numbered lists for clarity.
        5. Keep your explanation concise and easy to understand.
        6. If the user asks for a optimization, provide the optimization details from the alert details first.
        7. If the user ask for for the understand the alert better, provide the alert details in simple language which directly relates to the alert and make it concise.
        `
    const formattedMessages = messages.map((message: any) => ({
        role: message.role,
        content: [{ type: "text", text: message.content }],
    }));
    formattedMessages.push({
        role: "user",
        content: [{ type: "text", text: query }],
    });
    // console.log("formattedMessages", formattedMessages);
    // console.log("prompt", prompt);
    // console.log("formattedMessages", JSON.stringify(formattedMessages));
    const response = await fetch(process.env.API_GATEWAY_URL || "", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "path": "bedrock/chat",
            "httpMethod": "POST",
            "systemPrompt": prompt,
            "messages": formattedMessages,
        }),
    });

    // console.log("response:", response);
    const data = await response.json();
    // console.log("data from openai:", data);
    res.status(200).json(data);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Read the JSON file from the public directory
            const filePath = path.join(process.cwd(), 'public', 'KB', 'KB-for-agent-Levels.md');
            const fileContents = fs.readFileSync(filePath, 'utf8');

            const { alertData, query, messages } = req.body; // Get query from request body
            console.log("alertData from help-me-understand:", alertData);
            await responseFromOpenAI(alertData, fileContents, query, messages, res); // Pass res to the function
        } catch (error: any) {
            console.log("error", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}