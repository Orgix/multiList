import * as api from '../api/'
import { createAsyncThunk} from '@reduxjs/toolkit'


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    try{
        const response = await api.fetchTasks()
        return response.data
    }
    catch(error){
        return error
    }
})

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (id) =>{
    try{
        const response = await api.fetchTask(id)

        return response.data
    }
    catch(error){
        if(error.code === 'ERR_BAD_REQUEST') throw new Error('Not Found')
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async(id, task) =>{
    const response = await api.updateTask(id, task)
    console.log(response)
    return response.data
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(id)=>{
    const response = await api.deleteTask(id)
    console.log(response)
    return response.data
})
//fetchTask, createTask, updateTask, deleteTask,