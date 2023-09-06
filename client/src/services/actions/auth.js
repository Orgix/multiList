import * as api from '../api/'
import { createAsyncThunk} from '@reduxjs/toolkit'

export const register = createAsyncThunk('auth/register', async ({firstName, lastName, password, email, username}) =>{
    try{
        const response = await api.signUp({firstName, lastName, email, password, username})
        return response.data
    }
    catch(error){
       throw new Error(error.response.data.message)
    }
})

export const signin = createAsyncThunk('auth/signin', async(formData) =>{
    try{
        const response = await api.signIn(formData)
        return response.data
    }
    catch(error){
        throw new Error('Problem with login ')
    }
})

export const signout = createAsyncThunk('auth/singout', async()=>{
    try{
        const response = await api.signOut()
        return response.data
    }
    catch(error){
        throw new Error('Problem while logging out')
    }
})

export const fetchUserTasks = createAsyncThunk('auth/fetchUserTasks', async()=>{
    try{
        const response = await api.fetchUserTasks();
        return response.data
    }
    catch(err){
        throw new Error('Problem retrieving user task data.')
    }
})

export const updateUserData = createAsyncThunk('auth/updateUserData', async(updatedUser)=>{
    console.log(updatedUser)
    try{
        const response = await api.updateUserData(updatedUser)
        return response.data.user;
    }
    catch(err){
        throw new Error('Problem updating user\`s personal information.')
    }
})

export const deleteUser = createAsyncThunk('auth/deleteUser', async(userId)=>{
    try{
        const response = await api.deleteUser(userId)
        return response.data;
    }
    catch(error){
        throw new Error('Problem deleting user\`s personal information.')
    }
    
})

export const toggleFavorite = createAsyncThunk('auth/toggleFavorite', async(toggleSettings)=>{
    try{
        const response = await api.toggleFavorite(toggleSettings.id, toggleSettings.favorite)
        return response.data
    }
    catch(err){
        return new Error('error toggling')
    }
})

export const addFriend = createAsyncThunk('auth/addFriend', async(userId)=>{
    try{
        const response = await api.addFriend(userId)
        console.log(response)
        return response.data;
    }
    catch(err){
        return new Error('error adding user')
    }
    
})

export const deleteFriend = createAsyncThunk('auth/deleteFriend', async(userId)=>{
    try{
        const response = await api.deleteFriend(userId)
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
    const response = await api.cancelRequest(id, from);
    console.log(response)
    return response.data
})

export const resolveUserRequest = createAsyncThunk('auth/resolveUserRequest', async(request)=>{
    const {id, resp} = request
    const response = await api.resolveRequest(id, resp);
    return id
})

export const fetchRequests = createAsyncThunk('auth/fetchRequests', async(length)=>{
    try{
        const response = await api.fetchRequests(length);
        return response.data;
    }
    catch(err){
        throw new Error('error')
    }
})