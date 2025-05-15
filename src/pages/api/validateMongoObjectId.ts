import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { quizId } = req.query;
console.log(quizId, "Quiz id is available for validate");
  if (!quizId || !ObjectId.isValid(quizId as string)) {
    return res.status(400).json({ valid: false });
  }

  return res.status(200).json({ valid: true });
}