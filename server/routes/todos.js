import express from "express";
import {getTask, createTask, updateTask, deleteTask, getTasks} from '../controllers/todos.js'
const router = express.Router();

//get task edit form with the fields filled in
router.get('/:id/edit', getTask);

//get task page with details
router.get('/:id', getTask);

//post new task
router.post('/', createTask)

//get all tasks for user (if there is an id in params, it's for another user, else, its the author that is requesting)
router.get('/profile/me/tasks', getTasks);

//update post
router.patch('/:id', updateTask)

//delete post
router.delete('/task/:id', deleteTask)

export default router;