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
        console.log(response)
        return response.data
    }
    catch(error){
        throw new Error('Problem with login ')
    }
})

export const signout = createAsyncThunk('auth/singout', async()=>{
    try{
        const response = await api.signOut()
        console.log(response)
        return response.data
    }
    catch(error){
        throw new Error('Problem while logging out')
    }
})