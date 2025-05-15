import { Pinecone } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { z } from "zod";
const { zodResponseFormat } = require("openai/helpers/zod");
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

const indexName = 'chatbot-shopper-new';

const responseSchema = z.object({
    isEnhanced: z.boolean(),
    enhancedResponse: z.string()
});

const responseFromOpenAI = async (context: any, query:string, initialResponse:string) => {
    const prompt = `
        # User Query
        - ${query}

        # Initial Response
        - ${initialResponse}

        # INPUT DATA
        ${context}

        - User query is asked by the user.
        - There is a Initial Response which was given by the assistant for the user query as a response to the user.
        - You task is to give some enhanced response to the user query based on the INPUT DATA chunks given to you which might help the user to get more information about the query.    
        - Make sure the response you give will not have the same information as the Initial Response.

        # INSTRUCTIONS
        Your goal is to provide a concise response to the user query using the relevant information in the INPUT DATA:  
        - Each item in the input data consists of two parts:  
        - **Context**: Overall subject or setting.  
        - **Text**: Detailed information relevant to the query.  

        Note: If there are scope of improvement in the provided response data, then you should mark the isEnhanced as true and provide the enhanced response only which is not similar to the provided response.
        If there are no relevent chunks in Input data to enhance the resonse then make the isEnhanced as false and provide the response as empty string.
        Give the response from the Input data text part only.

        
        Follow these steps to provide the response:  
        1. Understand the user query.  
        2. Identify relevant "Context" fields.  
        3. Extract key details from the "Text" fields of Input data.  
        4. Only give the enhanced response if there are scope of improvement in the provided response data.
        5. Make sure the response you give only comes from the text part of the input data.
        6. Write a brief response to the user query:
        - Directly address the query.  
        - Be concise and precise.  
        - Indicate if no relevant information is found without assumptions. 
        - Answer should be only from the text part of the input data.
        - In response use proper indentation and line breaks, bullet points or numbering and other formatting similarly present in the input data.
        `
        // - Make sure the answer is correct and relevant to the query and short and concise, and not more than 4 lines long.

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: zodResponseFormat(responseSchema, "PromptObject"),
        temperature: 0.1,
    });
    const content = response.choices[0].message.content;
    return content;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') { // Handle only POST requests
        try {
            const { query, response } = req.body; // Get query from request body
            const index = pc.index(indexName);
            const latestQuery = query + " " + response;
            const embeddings = await openai.embeddings.create({
                model: model,
                input: latestQuery, // Use the text of the current chunk
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
            // console.log("queryResponse", JSON.stringify(matches));
            const enhancedResponse = await responseFromOpenAI(JSON.stringify(matches),  query, response); // Pass res to the function
            res.status(200).json({ enhancedResponse });
        } catch (error: any) {
            console.log("error", error)
            res.status(500).json({ error: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}