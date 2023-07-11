import express from "express";

import { loginUser, registerUser, signout, updateUser } from "../controllers/user.js";
import { validateUser } from "../middleware/dataValidation.js";

const router = express.Router();

router.post('/signup', validateUser, registerUser);
router.post('/signin', validateUser, loginUser)
router.post('/logout', signout)
router.patch('/update', updateUser)
export default router;