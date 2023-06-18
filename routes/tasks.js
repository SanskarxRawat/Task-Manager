const express=require('express');
const {getAllTasks, createTask, getTask, updateTask,deleteTask} =require('../controller/tasks');
const router=express.Router();

router.
get('/',getAllTasks).
get('/:id',getTask).
post('/',createTask).
patch('/:id',updateTask).
delete('/:id',deleteTask);

exports.routes=router;