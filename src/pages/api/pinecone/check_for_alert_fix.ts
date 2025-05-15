import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

import { z } from "zod";

const responseSchema = z.object({
    is_fix: z.boolean(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') { // Handle only POST requests
        try {
            const { query } = req.body;
            if (!query) {
                return res.status(400).json({ error: "Query is required" });
            }
            const prompt = `You are given a query. You need to check the meaning of query is like a fix for the alert.
            I am giving you some query like this:
            - "Let's fix the alert"
            - "I want to fix the alert"
            - "Lets fix this"

            If the query is like this, then return the json with the following format:
            Example Response:
            {
                "is_fix": true,
            }

            If the query is not like this, then return the json with the following format:
            Example Response:
            {
                "is_fix": false,
            }

            Note: Only return the json response, no other text or explanation.

            #User QUERY
            <query>
            ${query}
            </query>
            `
            const response = await fetch(process.env.API_GATEWAY_URL || "", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "path": "bedrock/chat",
                    "httpMethod": "POST",
                    "messages":[{
                        role: "user",
                        content: [{ type: "text", text: prompt }],
                    }],
                }),
            });
        
            console.log("response for check_for_alert_fix:", response);
            const data = await response.json();
            res.status(200).json({ response: data });
        } catch (error: any) {
            console.log("error", error)
            res.status(500).json({ error: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}
