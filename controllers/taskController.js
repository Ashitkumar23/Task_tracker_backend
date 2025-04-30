import {Task} from '../models/Task.modals.js';  // Use ES Module import syntax
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = asyncHandler(async (req,res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    throw new ApiError(400, 'All fields are required');
  }
  const task = await Task.create({ ...req.body, projectId: req.params.projectId });
  if (!task) {
    throw new ApiError(500, 'Failed to create task');
  }
  return res.status(201).json(new ApiResponse(200, task, 'Task created successfully'));
});


const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title && !description && !status) {
    throw new ApiError(400, 'At least one field is required to update');
  }

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return res.status(200).json(new ApiResponse(200, task, 'Task updated successfully'));

});


const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export { getTasks, createTask, updateTask,deleteTask}