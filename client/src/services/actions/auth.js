import * as authApi from '../api/authApi'
import * as userApi from '../api/userApi'
import * as taskApi from '../api/taskApi'
import { createAsyncThunk} from '@reduxjs/toolkit'

export const register = createAsyncThunk('auth/register', async ({firstName, lastName, password, email, username}) =>{
    try{
        const response = await authApi.signUp({firstName, lastName, email, password, username})
        return response.data
    }
    catch(error){
       throw new Error(error.response.data.message)
    }
})

export const signin = createAsyncThunk('auth/signin', async(formData) =>{
    try{
        const response = await authApi.signIn(formData)
        return response.data
    }
    catch(error){
        throw new Error('Problem with login ')
    }
})

export const signout = createAsyncThunk('auth/singout', async()=>{
    try{
        const response = await authApi.signOut()
        return response.data
    }
    catch(error){
        throw new Error('Problem while logging out')
    }
})

export const fetchUserTasks = createAsyncThunk('auth/fetchUserTasks', async()=>{
    try{
        const response = await taskApi.fetchUserTasks();
        return response.data
    }
    catch(err){
        throw new Error('Problem retrieving user task data.')
    }
})

export const updateUserData = createAsyncThunk('auth/updateUserData', async(updatedUser)=>{
    console.log(updatedUser)
    try{
        const response = await taskApi.updateUserData(updatedUser)
        return response.data.user;
    }
    catch(err){
        throw new Error('Problem updating user\`s personal information.')
    }
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async(userId)=>{
    try{
        const response = await userApi.deleteUser(userId)
        return response.data;
    }
    catch(error){
        throw new Error('Problem deleting user\`s personal information.')
    }
    
})

export const toggleFavorite = createAsyncThunk('auth/toggleFavorite', async(toggleSettings)=>{
    try{
        const response = await userApi.toggleFavorite(toggleSettings.id, toggleSettings.favorite)
        return response.data
    }
    catch(err){
        return new Error('error toggling')
    }
})

export const addFriend = createAsyncThunk('auth/addFriend', async(userId)=>{
    try{
        const response = await userApi.addFriend(userId)
        console.log(response)
        return response.data;
    }
    catch(err){
        return new Error('error adding user')
    }
    
})

export const deleteFriend = createAsyncThunk('auth/deleteFriend', async(userId)=>{
    try{
        const response = await userApi.deleteFriend(userId)
        console.log(response)
        return response.data;
    }
    catch(err){
        return new Error('error deleting user')
    }
})

export const cancelRequest = createAsyncThunk('auth/cancelRequest', async(request)=>{
    console.log(request)
    const {id, from} = request
    const response = await userApi.cancelRequest(id, from);
    console.log(response)
    return response.data
})

export const resolveUserRequest = createAsyncThunk('auth/resolveUserRequest', async(request)=>{
    const {id, resp} = request
    const response = await userApi.resolveRequest(id, resp);
    return id
})

export const fetchRequests = createAsyncThunk('auth/fetchRequests', async(lengths)=>{
    const {friends, requests} = lengths
    try{
        const response = await userApi.fetchRequests(friends, requests);
        return response.data;
    }
    catch(err){
        throw new Error('error')
    }
})

export const searchUser = createAsyncThunk('auth/searchUser', async(searchTerm)=>{
    console.log(searchTerm)
    try{
        const response = await userApi.searchUser(searchTerm)
        console.log(response)
    }
    catch(err){
        throw new Error('error')
    }
})