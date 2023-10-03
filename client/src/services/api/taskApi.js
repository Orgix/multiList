import API from './index.js'

export const fetchPaginatedTasks = (page) => API.get(`/tasks?page=${page}`);
export const fetchTasks = () => API.get('/profile/me/tasks');
export const fetchTask = (id) => API.get(`/profile/me/tasks/${id}`);
export const createTask = (newTask) => API.post('/profile/me/tasks', newTask);
export const updateTask = (id, updatedTask) => API.patch(`profile/me/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/profile/me/tasks/${id}`);
export const completeTask = (id) => API.patch(`/profile/me/tasks/${id}/complete`);
export const fetchUserTasks = () => API.get('/profile/me/tasks/user');
export const fetchFavoriteTasks = () => API.get('/profile/me/favorites')
export const fetchTaskSuggestions = (taskId) => API.get(`/tasks/${taskId}/suggestions`);
export const postSuggestion = (taskId, newSuggestion) => API.post(`/tasks/${taskId}/suggestions`, newSuggestion);
export const deleteSuggestion = (taskId, suggestionId) => API.delete(`/tasks/${taskId}/suggestions/${suggestionId}`);
export const editSuggestion = (suggestionId, updatedSuggestion) => API.patch(`/tasks/suggestions/${suggestionId}`, updatedSuggestion);
export const fetchReplies = (suggestionId) => API.get(`/tasks/suggestions/${suggestionId}/replies`);
export const postReply = (suggestionId, reply) => API.post(`/tasks/suggestions/${suggestionId}/replies`, reply);
export const deleteReply = (suggestionId, id) => API.delete(`/tasks/suggestions/${suggestionId}/replies/${id}`);