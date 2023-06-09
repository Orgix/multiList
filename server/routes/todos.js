import express from "express";
import {getTask, createTask, updateTask, deleteTask, getTasks,completeTask, fetchUserTasks,} from '../controllers/todos.js'
import {fetchUserProfile, synchronizeUser} from '../controllers/user.js'
import {determineUser, compareTokens} from "../middleware/determineUser.js";
const router = express.Router({mergeParams:true});

//get task edit form with the fields filled in
router.get('/tasks/:id/edit', getTask);


router.get('/', fetchUserProfile)
//get user's tasks
router.get('/tasks/user', fetchUserTasks);

//get task page with details
router.get('/tasks/:id',determineUser, compareTokens, getTask);

//post new task
router.post('/tasks/',determineUser, createTask)

//get all tasks for user (if there is an id in params, it's for another user, else, its the author that is requesting)
router.get('/tasks/', getTasks);

//update task
router.patch('/tasks/:id',determineUser, updateTask)

//delete task
router.delete('/tasks/:id',determineUser, deleteTask)

//add completion status to the task
router.patch('/tasks/:id/complete', completeTask)

//retrieve updated task tuples for own profile
router.get('/sync', synchronizeUser)

export default router;