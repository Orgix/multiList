import express from  'express'
import { getTasksByPage, getTaskSuggestions } from '../controllers/general.js';

const router = express.Router();

router.get('/', getTasksByPage)
router.get('/:id/suggestions', getTaskSuggestions)


export default router