import { Pinecone } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is not defined");
}
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});
const model = "text-embedding-3-small"
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const indexName = 'shoppermodel-objective';

const responseFromOpenAI = async (query: string, context: any, messages: any, res: NextApiResponse) => {
    const prompt = `You are a helpful assistant analyzing the given input data to provide an helpful response to the user query.
        # INPUT DATA
        ${context}

        # INSTRUCTIONS
        Your goal is to provide a concise response to the user query using the relevant information in the input data:  
        - Each item in the input data consists of two parts:  
        - **Context**: Overall subject or setting.  
        - **Text**: Detailed information relevant to the query.  

        Follow these steps:  
        1. Understand the user query.  
        2. Identify relevant "Context" fields.  
        3. Extract key details from the "Text" fields of Input data.  
        4. Write a brief response to the user query:  
        - Directly address the query.  
        - Be concise and precise.  
        - Indicate if no relevant information is found without assumptions. 
        - Answer should be only from the text part of the input data.
        - If answer is not found in the input data, then do not give based on assumption only answer from the input data.
        - In response use proper indentation and line breaks, bullet points or numbering and other formatting similarly present in the input data.
        `
        // - Make sure the answer is correct and relevant to the query and short and concise, and not more than 4 lines long.

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: prompt }, ...messages],
        stream: true,
    });
    for await (const chunk of response) {
        const content = chunk.choices[0].delta.content;
        // console.log(content);
        res.write(content || ""); // Send each chunk to the frontend
    }
    res.end(); // End the response after all chunks are sent
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') { // Handle only POST requests
        try {
            // ... existing code for creating index and embeddings ...

            const { query, latestQuery, messages } = req.body; // Get query from request body
            // console.log("messages Received:", messages);
            messages.push({ role: "user", content: latestQuery });
            console.log("messages Received:", messages);
            // console.log("query", query, "latestQuery", latestQuery)
            const index = pc.index(indexName);
            const embeddings = await openai.embeddings.create({
                model: model,
                input: query, // Use the text of the current chunk
                encoding_format: "float",
            });
            console.log("Embedding", embeddings);
            const queryResponse = await index.query({
                topK: 5,
                vector: embeddings.data[0]?.embedding || [],
                includeValues: false,
                includeMetadata: true
            });
            // console.log("queryResponse", queryResponse);

            const matches = queryResponse.matches.map(match => match.metadata)
            // console.log("queryResponse", matches);
            await responseFromOpenAI(latestQuery, JSON.stringify(matches), messages, res); // Pass res to the function
        } catch (error: any) {
            console.log("error", error)
            res.status(500).json({ error: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}