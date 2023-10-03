import express from "express";
import {getTask, createTask, updateTask, deleteTask, getTasks,completeTask, fetchUserTasks,fetchUserFavorites} from '../controllers/todos.js'
import {fetchUserProfile, synchronizeUser} from '../controllers/user.js'
import { postActivity, deleteActivities } from "../controllers/activities.js";
import { deleteSuggestions } from "../controllers/general.js"
import {determineUser, compareTokens} from "../middleware/determineUser.js";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router({mergeParams:true});

//get task edit form with the fields filled in
router.get('/tasks/:id/edit', getTask);


router.get('/', fetchUserProfile)
//get user's tasks
router.get('/tasks/user',authorizeUser, fetchUserTasks);

//get task page with details
router.get('/tasks/:id',determineUser, compareTokens, getTask);

//post new task
router.post('/tasks/', determineUser, authorizeUser, createTask)

//get all tasks for user (if there is an id in params, it's for another user, else, its the author that is requesting)
router.get('/tasks/', getTasks);

//update task
router.patch('/tasks/:id',determineUser, updateTask, postActivity)

//delete task
router.delete('/tasks/:id',determineUser, deleteTask, deleteSuggestions, deleteActivities)

//add completion status to the task
router.patch('/tasks/:id/complete', completeTask)

//retrieve updated task tuples for own profile
router.get('/sync', authorizeUser, synchronizeUser)

//retrieve all tasks that were marked as favorite by the user
router.get('/favorites', authorizeUser, fetchUserFavorites)

export default router;