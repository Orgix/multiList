import * as api from '../api/'
import { createAsyncThunk} from '@reduxjs/toolkit'

export const register = createAsyncThunk('auth/register', async ({firstName, lastName, password, email}) =>{
    try{
        const response = await api.signUp({firstName, lastName, email, password})
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
        console.log(response)
    }
    catch(error){
        throw new Error('Problem deleting user\`s personal information.')
    }
    
})