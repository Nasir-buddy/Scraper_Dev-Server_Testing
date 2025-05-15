import { Pinecone } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";

const responseFromOpenAI = async (latestQuery: string, alertData: any, res: NextApiResponse) => {
    const prompt = generatePrompt(alertData);
    console.log("prompt:", prompt);
    const formattedMessages = [{
        role: "user",
        content: [{ type: "text", text: latestQuery }],
    }];
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

    console.log("response:", response);
    const data = await response.json();
    console.log("data:", data);
    res.status(200).json(data);
}

const generatePrompt = ( alertData: any): string => {
    console.log("alertData in api:", alertData);
    const { title, description, followUpQuestions, optimizations } = alertData;
    // console.log("optimizations:", optimizations);
    // console.log("followUpQuestions:", followUpQuestions);
    // console.log("title:", title);
    // console.log("description:", description);
    return `
        You are an AI assistant. A user has asked a question related to an alert. 
        Your task is to generate a detailed and comprehensive question based on the user's query and the alert information provided.

        Alert Title: ${title}
        Alert Description: ${description}

        Follow-Up Questions:
        ${JSON.stringify(followUpQuestions) || "No follow-up questions provided"}

        Optimizations:
        ${JSON.stringify(optimizations) || "No optimizations provided"}

        - User Query will be provided by the user.
        - Based on the above information, generate a detailed question that incorporates the user's query and the context of the alert.
        - Only return the question, do not include any other text.
    `;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') { // Handle only POST requests
        try {
            // ... existing code for creating index and embeddings ...

            const { alertData, latestQuery } = req.body; // Get query from request body
            console.log("alertData in api:", alertData);
            console.log("latestQuery in api:", latestQuery);
            await responseFromOpenAI(latestQuery, alertData, res); // Pass res to the function
        } catch (error: any) {
            console.log("error", error)
            res.status(500).json({ error: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}