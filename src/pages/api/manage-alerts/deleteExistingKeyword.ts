import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const keywordsFilePath = path.join(process.cwd(), 'src', 'pages', 'refactored-write', 'existing-keywords.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { index } = req.query;

        if (typeof index !== 'string') {
            console.error('Invalid index type');
            return res.status(400).json({ error: 'Invalid index' });
        }

        fs.readFile(keywordsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read keywords file:', err);
                return res.status(500).json({ error: 'Failed to read keywords file' });
            }

            try {
                const keywords = JSON.parse(data);
                const idx = parseInt(index, 10);

                console.log(`Received index: ${idx}, Keywords length: ${keywords.length}`);

                if (isNaN(idx) || idx < 0 || idx >= keywords.length) {
                    console.error('Invalid index value');
                    return res.status(400).json({ error: 'Invalid index' });
                }

                keywords.splice(idx, 1);

                fs.writeFile(keywordsFilePath, JSON.stringify(keywords, null, 2), (err) => {
                    if (err) {
                        console.error('Failed to update keywords file:', err);
                        return res.status(500).json({ error: 'Failed to update keywords file' });
                    }
                    console.log('Keyword deleted successfully');
                    return res.status(200).json({ message: 'Keyword deleted successfully' });
                });
            } catch (parseError) {
                console.error('Failed to parse keywords file:', parseError);
                return res.status(500).json({ error: 'Failed to parse keywords file' });
            }
        });
    } else {
        console.error(`Method ${req.method} Not Allowed`);
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
