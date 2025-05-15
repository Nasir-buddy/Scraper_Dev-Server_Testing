// import { Pinecone } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";
import fs from "fs";
import path from "path";
// if (!process.env.PINECONE_API_KEY) {
//     throw new Error("PINECONE_API_KEY is not defined");
// }
// const pc = new Pinecone({
//     apiKey: "pcsk_655q6M_LBouCtdZj3dX85HHJKFMM7rWLmjthNAPS6k3VesbiVNvfGNhdqnpXTpz19ynpzA"
// });
// const model = "text-embedding-3-small"
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const indexName = 'shoppermodel-optimizations-chatbot';

const responseFromOpenAI = async (query: string, context: any, messages: any, res: NextApiResponse) => {
    const prompt = `You are a helpful assistant analyzing the given input data to provide an helpful response to the user query.
        # INPUT DATA
        ${context}

        # INSTRUCTIONS
        Your goal is to provide a concise response to the user query using the relevant information in the input data:    


        Follow these steps:  
        1. Understand the user query.    
        2. Write a brief response to the user query:  
        - Directly address the query.  
        - Be concise and precise.  
        - Indicate if no relevant information is found without assumptions. 
        - Answer should be only from the text part of the input data.
        - If answer is not found in the input data, then do not give based on assumption only answer from the input data.
        - In response use proper indentation and line breaks, bullet points or numbering and other formatting similarly present in the input data.
        - Give the response in markdown format exactly as present in the input data.
        `
    // - Make sure the answer is correct and relevant to the query and short and concise, and not more than 4 lines long.

    // const response = await openai.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [{ role: "system", content: prompt }, ...messages],
    //     stream: true,
    // });
    // for await (const chunk of response) {
    //     const content = chunk.choices[0].delta.content;
    //     // console.log(content);
    //     res.write(content || ""); // Send each chunk to the frontend
    // }
    // res.end(); // End the response after all chunks are sent
    const formattedMessages = messages.map((message: any) => ({
        role: message.role,
        content: [{ type: "text", text: message.content }],
    }));
    console.log("formattedMessages", formattedMessages);
    console.log("prompt", prompt);
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
    console.log("data from openai:", data);
    res.status(200).json(data);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Read the JSON file from the public directory
            const filePath = path.join(process.cwd(), 'public', 'KB', 'KB-for-agent-Levels.md');
            const fileContents = fs.readFileSync(filePath, 'utf8');
            // const jsonData = JSON.parse(fileContents);

            // Use jsonData as needed in your logic
            // console.log("JSON Data:", fileContents);

            // ... existing code for creating index and embeddings ...

            const { query, latestQuery, messages } = req.body; // Get query from request body
            // console.log("messages Received:", messages);
            messages.push({ role: "user", content: latestQuery });
            // console.log("messages Received:", messages);
            // console.log("query", query, "latestQuery", latestQuery)
            // const index = pc.index(indexName);
            // const embeddings = await openai.embeddings.create({
            //     model: "text-embedding-3-small",
            //     input: query, // Use the text of the current chunk
            //     encoding_format: "float",
            // });
            // // console.log("Embedding", embeddings);
            // const queryResponse = await index.query({
            //     topK: 5,
            //     vector: embeddings.data[0]?.embedding || [],
            //     includeValues: false,
            //     includeMetadata: true
            // });
            // // console.log("queryResponse", queryResponse);

            // const matches = queryResponse.matches.map(match => match.metadata)
            // console.log("queryResponse matches", matches);
            
            await responseFromOpenAI(latestQuery, fileContents, messages, res); // Pass res to the function
        } catch (error: any) {
            console.log("error", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}