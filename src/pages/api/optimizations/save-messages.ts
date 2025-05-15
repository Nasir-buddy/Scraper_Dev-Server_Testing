import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/utils/db';
import Message from '../../../schemas/alert-schemas/Messages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'POST') {
        try {
            const { userId, alertId, messages } = req.body;
            // console.log("userId", userId)
            // console.log("alertId", alertId)
            // console.log("messages", messages)
            if (messages.length === 0) {
                return res.status(400).json({ success: false, message: 'Messages are required' });
            }
            if (!userId || !alertId) {
                return res.status(400).json({ success: false, message: 'User ID and alert ID are required' });
            }
            // Check if a message with the same userId and alertId already exists
            const existingMessage = await Message.findOne({ userId, alertId });

            if (existingMessage) {
                // Update the messages array if the document exists
                existingMessage.messages = messages;
                await existingMessage.save();
                res.status(200).json({ success: true, data: existingMessage });
            } else {
                // Create a new message if no document exists
                const newMessage = new Message({
                    userId,
                    alertId,
                    messages,
                });

                await newMessage.save();
                res.status(201).json({ success: true, data: newMessage });
            }
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
