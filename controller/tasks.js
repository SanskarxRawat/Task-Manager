const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const {createCustomError}=require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await Task.find({});
    res.status(200).json({ status: 'success', data: task });
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ status: 'success', data: task });

})

const getTask = async (req, res,next) => {

    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task){
        return  next(createCustomError(`No task with the given id : ${taskId}`,404));
    }
    res.status(201).json({ status: 'success', data: task });
}
const updateTask = asyncWrapper(async (req, res,next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task){
        return  next(createCustomError(`No task with the given id : ${taskId}`,404));
    }    res.status(201).json({ id: taskId, data: req.body });

})

const deleteTask = asyncWrapper(async (req, res,next) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task){
        return  next(createCustomError(`No task with the given id : ${taskId}`,404));
    }    res.status(201).json({ status: 'success', data: task });

})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}