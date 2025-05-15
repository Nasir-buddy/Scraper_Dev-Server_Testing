import OpenAI from "openai";
const openaiKey = process.env.OPENAI_API_KEY;
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from "@pinecone-database/pinecone";
const openai = new OpenAI({
    apiKey: openaiKey
});
const pc = new Pinecone({
    apiKey: "pcsk_655q6M_LBouCtdZj3dX85HHJKFMM7rWLmjthNAPS6k3VesbiVNvfGNhdqnpXTpz19ynpzA"
});
const indexName = 'shoppermodel-optimizations-chatbot';
const readAndDivide = async () => {
    // Function to read file and create data array for indexing
    const filePath = path.join(process.cwd(), 'public', 'KB-for-agent.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const createDataArrayFromFile = () => {

        const sections = fileContent.split(/(?=\n# )/).map(section => section.trim()).filter(Boolean); // Split by Markdown headers

        const dataArray: { id: string; text: string }[] = [];
        const chunkSize = 1024;
        const overlap = 300;

        sections.forEach(section => {
            let start = 0;
            while (start < section.length) {
                const end = Math.min(start + chunkSize, section.length);
                const chunk = section.slice(start, end);
                dataArray.push({ id: `vec${dataArray.length}`, text: chunk });
                start += chunkSize - overlap; // Move start index forward by chunkSize - overlap
            }
        });

        return dataArray; // Return an array of objects
    };

    // Define the path to the file in the public directory
    // Updated to point to out.md
    const data = createDataArrayFromFile();
    console.log("data", data);
    return { data, fileContent };
}

async function main() {
    const filePath = path.join(process.cwd(), 'public', "test-processed-nodes.json");
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const input = JSON.parse(fileContent);

    input.forEach(async (d: any, indexNumber: number) => {
        const embeddings = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: `Content: ${d.content}`,
            encoding_format: "float",
        });
        console.log("Embedding", embeddings);

        const index = pc.index(indexName);

        const vector = {
            id: `vec${indexNumber}`, // Use the index number as the id
            values: embeddings.data[0]?.embedding || [], // Get the embedding for the current chunk
            metadata: { content: d.content }
        };
        const indexResponse = await index.upsert([vector]); // Upsert the vector for the current chunk
        const stats = await index.describeIndexStats();

        console.log("stats", stats)
        console.log("Index Response", indexResponse);
    });
}
// async function Contextual_Retrieval(chunk: string, document: any) {
//     const prompt = `<document> 
//         ${document} 
//         </document> 
//         Here is the chunk we want to situate within the whole document 
//         <chunk> 
//          ${chunk} 
//         </chunk> 
//         Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk. Answer only with the succinct context and nothing else. `
//     const response = await openai.chat.completions.create({
//         model: "gpt-4o",
//         messages: [{ role: "user", content: prompt }],
//     });
//     console.log("response is:", response.choices[0].message.content);
//     return response.choices[0].message.content;
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const query = req.body.query; // Get query from request body
            // const {data, fileContent} = await readAndDivide();
            // console.log("queryResponse data:", data);
            console.log("file content:")


            // Create index if it doesn't exist
            // await pc.createIndex({
            //     name: indexName,
            //     dimension: 1536, // Replace with your model dimensions
            //     metric: 'cosine', // Replace with your model metric
            //     spec: {
            //         serverless: {
            //             cloud: 'aws',
            //             region: 'us-east-1'
            //         }
            //     }
            // });

            // const filePathForDoc = path.join(process.cwd(), 'public', 'KB-for-agent.md');
            // const fileContentForDoc = fs.readFileSync(filePathForDoc, 'utf-8');
            // const filePath = path.join(process.cwd(), 'public', 'processed-nodes.json');
            // const fileContent = fs.readFileSync(filePath, 'utf-8');
            // const input = JSON.parse(fileContent);
            // const response: any[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'context-response.json'), 'utf-8'));
            // const outputPath = path.join(process.cwd(), 'public', 'context-response.json');
            // input.forEach(async (d: any, indexNumber: number) => {
            //     if (response.find((r: any) => r.id === `vec${indexNumber}`)) {
            //         return;
            //     }
            //     const Contextual_Retrieval_Res = await Contextual_Retrieval(d.content, fileContentForDoc)
            //     console.log("Contextual_Retrieval_Res", Contextual_Retrieval_Res)
            //     response.push({
            //         id: `vec${indexNumber}`,
            //         context: Contextual_Retrieval_Res,
            //         text: d.content
            //     })
            //     fs.writeFileSync(outputPath, JSON.stringify(response));
            // });


            await main();
            // const contextResponse=await Contextual_Retrieval(data[35].text, fileContent)
            // console.log("Context response:", contextResponse)
            res.status(200).json({ "message": "success" }); // Send response back to frontend
        } catch (error: any) {
            console.log("error", error)
            res.status(500).json({ error: error.message }); // Handle errors
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle unsupported methods
    }
}