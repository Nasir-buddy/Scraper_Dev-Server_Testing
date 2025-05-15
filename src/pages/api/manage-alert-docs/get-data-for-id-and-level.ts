import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import DocsLevel1 from '../../../schemas/alert-schemas/Docs-Level-1';
import DocsLevel2 from '../../../schemas/alert-schemas/Docs-Level-2';
import DocsLevel3 from '../../../schemas/alert-schemas/Docs-Level-3';
import DocsLevel4 from '../../../schemas/alert-schemas/Docs-Level-4';
import { connectToDatabase } from "../../../lib/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { level, id } = req.query;
    if (!level || !id) {
        return res.status(400).json({ error: 'Missing level or id' });
    }
    await connectToDatabase();

    try {
        let content = '';

        if (level === '1') {
            const docLevel1 = await DocsLevel1.findById(id);
            if (!docLevel1) {
                return res.status(404).json({ error: 'Document not found' });
            }
            content += docLevel1.content + '\n';

            const docsLevel2 = await DocsLevel2.find({ docsLevel1Id: id });
            for (const docLevel2 of docsLevel2) {
                content += docLevel2.content + '\n';

                const docsLevel3 = await DocsLevel3.find({ docsLevel2Id: docLevel2._id });
                for (const docLevel3 of docsLevel3) {
                    content += docLevel3.content + '\n';

                    const docsLevel4 = await DocsLevel4.find({ docsLevel3Id: docLevel3._id });
                    for (const docLevel4 of docsLevel4) {
                        content += docLevel4.content + '\n';
                    }
                }
            }
        } else if (level === '2') {
            const docLevel2 = await DocsLevel2.findById(id);
            if (!docLevel2) {
                return res.status(404).json({ error: 'Document not found' });
            }
            content += docLevel2.content + '\n';

            const docsLevel3 = await DocsLevel3.find({ docsLevel2Id: id });
            for (const docLevel3 of docsLevel3) {
                content += docLevel3.content + '\n';

                const docsLevel4 = await DocsLevel4.find({ docsLevel3Id: docLevel3._id });
                for (const docLevel4 of docsLevel4) {
                    content += docLevel4.content + '\n';
                }
            }
        } else if (level === '3') {
            const docLevel3 = await DocsLevel3.findById(id);
            if (!docLevel3) {
                return res.status(404).json({ error: 'Document not found' });
            }
            content += docLevel3.content + '\n';

            const docsLevel4 = await DocsLevel4.find({ docsLevel3Id: id });
            for (const docLevel4 of docsLevel4) {
                content += docLevel4.content + '\n';
            }
        } else if (level === '4') {
            const docLevel4 = await DocsLevel4.findById(id);
            if (!docLevel4) {
                return res.status(404).json({ error: 'Document not found' });
            }
            content += docLevel4.content + '\n';
        } else {
            return res.status(405).end(`Level ${level} Not Allowed`);
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
} 