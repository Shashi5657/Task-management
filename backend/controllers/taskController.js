const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const { userId } = req;
  const tasks = await Task.find({ userId });
  res.status(200).json(tasks);
};

exports.createTask = async (req, res) => {
  const { userId } = req;
  const newTask = new Task({ ...req.body, userId });
  await newTask.save();
  res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
  const { taskId, ...updateData } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  res.status(200).json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.body;
  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: 'Task deleted' });
};
