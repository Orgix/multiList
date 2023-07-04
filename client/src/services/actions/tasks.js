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

export const updateTask = createAsyncThunk('tasks/updateTask', async(taskData) =>{
    try{
        
        const response = await api.updateTask(taskData._id, taskData)
        return response.data
    }
    catch(error){
        throw new Error('Error updating task.')
    }
    
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(id)=>{
    const response = await api.deleteTask(id)
    return {data:response.data.message, id}
})

export const createTask = createAsyncThunk('tasks/createTask', async(newTask)=>{
    const response = await api.createTask(newTask)
    return response.data
})

export const completeTask = createAsyncThunk('tasks/completeTask', async(id)=>{
    const response = await api.completeTask(id)
    return {data:response.data.message, id}
})

export const fetchPaginatedTasks = createAsyncThunk('tasks/fetchPaginatedTasks', async(page)=>{
    try{
        const response = await api.fetchPaginatedTasks(page)
        return response.data
    }
    catch(error){
        throw new Error('Error updating task.')
    }
    
    
})

export const fetchTaskSuggestions = createAsyncThunk('comments/fetchTasksSuggestions', async(taskId)=>{
    try{
        const response = await api.fetchTaskSuggestions(taskId);
        return response.data
    }
    catch(err){
        throw new Error('Error fetching suggestions.')
    }
})

export const postSuggestion = createAsyncThunk('comments/postSuggestion',async(NewTaskSuggestion)=>{
    try{
        console.log(NewTaskSuggestion)
        const response = await api.postSuggestion(NewTaskSuggestion.id, NewTaskSuggestion.suggestion)
    }
    catch(err){
        throw new Error('Error updating task.')
    }
})
//fetchTask, createTask, updateTask, deleteTask,