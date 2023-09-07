import API from './index.js'

export const fetchUserProfile = (userId) => API.get(`/profile/${userId}`);
export const updateUserData = (updatedUser) => API.patch('/auth/update', updatedUser);
export const deleteUser = (userId) => API.delete(`/auth/delete/${userId}`);
export const toggleFavorite = (taskId, favorite) => API.patch(`/auth/favorites/${taskId}`, { favorite: favorite });
export const addFriend = (userId) => API.post(`/auth/add/${userId}`);
export const deleteFriend = (userId) => API.patch(`/auth/delete/${userId}`);
export const cancelRequest = (requestId, userId) => API.delete(`/auth/${userId}/requests/cancel/${requestId}`);
export const resolveRequest = (requestId, response) => API.put(`/auth/requests/${requestId}/resolve/${response}`);
export const fetchRequests = (length) => API.get(`/auth/requests/fetch`, length);
export const syncrhonizeUser = () => API.get('/profile/me/sync');