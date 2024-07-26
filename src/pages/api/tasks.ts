import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../utils/mongodb';
import Task from '../../models/Task';
import authMiddleware from '../../middleware/authMiddleware';

const tasks = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  const userId = await authMiddleware(req);

  switch (req.method) {
    case 'GET':
      const tasks = await Task.find({ userId });
      res.status(200).json(tasks);
      break;
    case 'POST':
      const newTask = new Task({ ...req.body, userId });
      await newTask.save();
      res.status(201).json(newTask);
      break;
    case 'PUT':
      const { taskId, ...updateData } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
      res.status(200).json(updatedTask);
      break;
    case 'DELETE':
      const { id } = req.body;
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: 'Task deleted' });
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
};

export default tasks;
