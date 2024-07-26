import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const authMiddleware = (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Authentication required');

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return (decoded as any).userId;
};

export default authMiddleware;
