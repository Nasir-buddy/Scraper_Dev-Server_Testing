import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/utils/db';
import Message from '../../../schemas/alert-schemas/Messages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const { userId, alertId } = req.query;

            const messages = await Message.findOne({ userId, alertId });

            if (!messages) {
                return res.status(404).json({ success: false, message: 'Messages not found' });
            }

            res.status(200).json({ success: true, data: messages });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
