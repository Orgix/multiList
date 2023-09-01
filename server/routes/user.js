import express from "express";

import { deleteUser, loginUser, registerUser, signout, updateUser,toggleFavorite, addUserToFriendList, deleteUserFromFriendList, cancelRequest,resolveRequest } from "../controllers/user.js";
import { validateUser } from "../middleware/dataValidation.js";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router.post('/signup', validateUser, registerUser);
router.post('/signin', validateUser, loginUser)
router.post('/logout', authorizeUser, signout)
router.patch('/update', authorizeUser, updateUser)
router.delete('/delete/:userId', authorizeUser, deleteUser)
router.delete('/:userId/requests/cancel/:requestId',cancelRequest)
router.put('/requests/:requestId/resolve/:response', resolveRequest)
router.post('/add/:userId', authorizeUser, addUserToFriendList)
router.patch('/delete/:userId', authorizeUser, deleteUserFromFriendList)
router.patch('/favorites/:taskId', authorizeUser, toggleFavorite)

export default router;