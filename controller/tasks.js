const Task = require('../models/tasks');

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).json({ status: 'success', data: task });
    } catch (error) {
        res.send(500).json({msg:error});
    }

}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ status: 'success', data: task });
    }catch(error){
        res.send(500).json({msg:error});
    }
}

const getTask = async (req, res) => {
    const { id: taskId } = req.params;
    try{
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return res.status(404).json(`No task with the given id : ${taskId}`);
        }
        res.status(201).json({ status: 'success', data: task });
    }catch(error){
        res.send(500).json({msg:error});
    }
}
const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    try{
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(201).json({ id: taskId, data: req.body });
        if (!task) {
            return res.status(404).json(`No task with the given id : ${taskId}`);
        }
    }catch(error){
        res.send(500).json({msg:error});
    }
    
}

const deleteTask = async (req, res, next) => {
    const { id: taskId } = req.params;
    try{
        const task = await Task.findOneAndDelete({ _id: taskId });
        if (!task) {
            return res.status(404).json(`No task with the given id : ${taskId}`);
        } 
        res.status(201).json({ status: 'success', data: task });
    }catch(error){
        res.send(500).json({msg:error});
    }
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}