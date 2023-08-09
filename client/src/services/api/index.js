import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
  }
  return req;
});


export const fetchPaginatedTasks = (page) => API.get(`/tasks?page=${page}`);
export const fetchTasks = () => API.get('/profile/me/tasks');
export const fetchTask = (id) => API.get(`/profile/me/tasks/${id}`);
export const createTask = (newTask) => API.post('/profile/me/tasks', newTask);
export const updateTask = (id, updatedTask) => API.patch(`profile/me/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/profile/me/tasks/${id}`);
export const completeTask = (id) => API.patch(`/profile/me/tasks/${id}/complete`)
export const fetchUserTasks = () => API.get('/profile/me/tasks/user')
export const fetchUserProfile = (userId) => API.get(`/profile/${userId}`)
export const fetchTaskSuggestions = (taskId) => API.get(`/tasks/${taskId}/suggestions`)
export const postSuggestion = (taskId, newSuggestion) => API.post(`/tasks/${taskId}/suggestions`, newSuggestion)
export const deleteSuggestion = (taskId, suggestionId) => API.delete(`/tasks/${taskId}/suggestions/${suggestionId}`);
export const editSuggestion = (suggestionId, updatedSuggestion) => API.patch(`/tasks/suggestions/${suggestionId}`,updatedSuggestion)
export const fetchReplies = (suggestionId) => API.get(`/tasks/suggestions/${suggestionId}/replies`)
export const postReply = (suggestionId, reply) => API.post(`/tasks/suggestions/${suggestionId}/replies`, reply)
export const deleteReply = (suggestionId, id) => API.delete(`/tasks/suggestions/${suggestionId}/replies/${id}`)
export const updateUserData = (updatedUser) => API.patch('/auth/update',updatedUser)
export const deleteUser = (userId) => API.delete(`/auth/delete/${userId}`)
export const toggleFavorite = (taskId, favorite) => API.patch(`/auth/favorites/${taskId}`,{favorite:favorite})
export const addFriend = (userId) => API.post(`/auth/add/${userId}`)
export const deleteFriend = (userId) => API.patch(`/auth/delete/${userId}`)
export const cancelRequest = (requestId, userId) => API.delete(`/auth/${userId}/requests/cancel/${requestId}`)
export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
export const signOut = () => API.post('/auth/logout')
export const syncrhonizeUser = () => API.get('/profile/me/sync')
