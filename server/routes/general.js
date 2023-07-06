import express from  'express'
import { getTasksByPage, getTaskSuggestions,postSuggestion,deleteSuggestion, editSuggestion } from '../controllers/general.js';

const router = express.Router();

router.get('/', getTasksByPage)
router.get('/:taskId/suggestions', getTaskSuggestions)
router.post('/:taskId/suggestions', postSuggestion)
router.delete('/:taskId/suggestions/:suggestionId', deleteSuggestion)
router.patch('/suggestions/:suggestionId', editSuggestion)

export default router