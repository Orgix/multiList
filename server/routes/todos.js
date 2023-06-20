import express from "express";
import {getTask, createTask, updateTask, deleteTask, getTasks} from '../controllers/todos.js'
import {determineUser, compareTokens} from "../middleware/determineUser.js";
const router = express.Router({mergeParams:true});

//get task edit form with the fields filled in
router.get('/:id/edit', getTask);

//get task page with details
router.get('/:id',determineUser, compareTokens, getTask);

//post new task
router.post('/',determineUser, createTask)

//get all tasks for user (if there is an id in params, it's for another user, else, its the author that is requesting)
router.get('/', getTasks);

//update post
router.patch('/:id',determineUser, updateTask)

//delete post
router.delete('/:id',determineUser, deleteTask)

export default router;