import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const keywordsFilePath = path.join(process.cwd(), 'src', 'pages', 'refactored-write', 'existing-keywords.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { keyword, detail, context } = req.body;

        if (!keyword || !detail || !context) {
            console.error('Missing keyword data');
            return res.status(400).json({ error: 'Missing keyword data' });
        }

        fs.readFile(keywordsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read keywords file:', err);
                return res.status(500).json({ error: 'Failed to read keywords file' });
            }

            try {
                const keywords = JSON.parse(data);
                const keywordIndex = keywords.findIndex((k: any) => k.keyword === keyword);

                if (keywordIndex === -1) {
                    console.error('Keyword not found');
                    return res.status(404).json({ error: 'Keyword not found' });
                }

                keywords[keywordIndex] = { keyword, detail, context };

                fs.writeFile(keywordsFilePath, JSON.stringify(keywords, null, 2), (err) => {
                    if (err) {
                        console.error('Failed to update keywords file:', err);
                        return res.status(500).json({ error: 'Failed to update keywords file' });
                    }
                    console.log('Keyword updated successfully');
                    return res.status(200).json({ message: 'Keyword updated successfully' });
                });
            } catch (parseError) {
                console.error('Failed to parse keywords file:', parseError);
                return res.status(500).json({ error: 'Failed to parse keywords file' });
            }
        });
    } else {
        console.error(`Method ${req.method} Not Allowed`);
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
