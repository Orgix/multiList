import express from "express";

import { deleteUser, loginUser, registerUser, signout, updateUser,toggleFavorite, addUserToFriendList, deleteUserFromFriendList } from "../controllers/user.js";
import { validateUser } from "../middleware/dataValidation.js";

const router = express.Router();

router.post('/signup', validateUser, registerUser);
router.post('/signin', validateUser, loginUser)
router.post('/logout', signout)
router.patch('/update', updateUser)
router.delete('/delete/:userId', deleteUser)
router.post(`/add/:userId`, addUserToFriendList)
router.patch(`/delete/:userId`, deleteUserFromFriendList)
router.patch('/favorites/:taskId', toggleFavorite)

export default router;