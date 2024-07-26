import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../utils/mongodb';
import User from '../../../models/User';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: 'User created successfully' });
};

export default signup;
