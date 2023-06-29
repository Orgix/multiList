import express from  'express'
import { getTasksByPage } from '../controllers/general.js';

const router = express.Router();

router.get('/', getTasksByPage)


export default router