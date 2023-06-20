import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
  }
  return req;
});

export const fetchTasks = () => API.get('/profile/me/tasks');
export const fetchTask = (id) => API.get(`/profile/me/tasks/${id}`);
export const createTask = (newTask) => API.post('/profile/me/tasks', newTask);
export const updateTask = (id, updatedTask) => API.patch(`profile/me/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/profile/me/tasks/${id}`);
export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
export const signOut = () => API.post('/auth/logout')
// convert profile/me to profile/userName/tasks/ ... so as to avoid duplicate links