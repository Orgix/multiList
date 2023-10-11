import express from "express";

import { deleteUser, loginUser, registerUser, signout, updateUser,toggleFavorite, addUserToFriendList, deleteUserFromFriendList, cancelRequest,resolveRequest, fetchRequests, searchUser,inviteUsersToTask,resolveTaskInvite } from "../controllers/user.js";
import { validateUser } from "../middleware/dataValidation.js";
import { authorizeUser,validateAuthor } from "../middleware/auth.js";

const router = express.Router();

//all routes have a protection, they can't be used unless the user is validated or authorized 
router.post('/signup', validateUser, registerUser);
router.post('/signin', validateUser, loginUser)
router.post('/logout', authorizeUser, signout)
router.patch('/update', authorizeUser, updateUser)
router.delete('/delete/:userId', authorizeUser, deleteUser)
router.delete('/:userId/requests/cancel/:requestId', authorizeUser, cancelRequest)
router.put('/requests/:requestId/resolve/:response', authorizeUser, resolveRequest)
router.put('/requests/:requestId/taskInvite/resolve/:response', authorizeUser, resolveTaskInvite)
router.get('/requests/fetch',authorizeUser, fetchRequests)
router.post('/add/:userId', authorizeUser, addUserToFriendList)
router.patch('/delete/:userId', authorizeUser, deleteUserFromFriendList)
router.patch('/favorites/:taskId', authorizeUser, toggleFavorite)
router.get('/search/:userId', searchUser)
router.post('/invitations/:taskId',authorizeUser, validateAuthor, inviteUsersToTask)

export default router;