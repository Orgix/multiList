import express from  'express'
import { getTasksByPage, getTaskSuggestions,postSuggestion,deleteSuggestion, editSuggestion,fetchReplies,postReply,deleteReply } from '../controllers/general.js';
import { authorizeUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTasksByPage)
router.get('/:taskId/suggestions', getTaskSuggestions)
router.get('/suggestions/:suggestionId/replies',fetchReplies)
router.post('/suggestions/:suggestionId/replies', postReply)
router.delete('/suggestions/:suggestionId/replies/:replyId', deleteReply)
router.post('/:taskId/suggestions', authorizeUser, postSuggestion)
router.delete('/:taskId/suggestions/:suggestionId', authorizeUser,deleteSuggestion)
router.patch('/suggestions/:suggestionId', editSuggestion)

export default router