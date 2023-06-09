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
export const updateUserData = (updatedUser) => API.patch('/auth/update',updatedUser)
export const deleteUser = (userId) => API.delete(`/auth/delete/${userId}`)
export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
export const signOut = () => API.post('/auth/logout')
export const syncrhonizeUser = () => API.get('/profile/me/sync')
