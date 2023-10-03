import * as taskApi from '../api/taskApi'
import { createAsyncThunk} from '@reduxjs/toolkit'


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    try{
        const response = await taskApi.fetchTasks()
        return response.data
    }
    catch(error){
        return error
    }
})

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (id) =>{
    try{
        const response = await taskApi.fetchTask(id)

        return response.data
    }
    catch(error){
        if(error.code === 'ERR_BAD_REQUEST') throw new Error('Not Found')
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async(taskData) =>{
    try{
        
        const response = await taskApi.updateTask(taskData.task._id, taskData)
        return response.data
    }
    catch(error){
        throw new Error('Error updating task.')
    }
    
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(id)=>{
    const response = await taskApi.deleteTask(id)
    return {data:response.data.message, id}
})

export const createTask = createAsyncThunk('tasks/createTask', async(newTask)=>{
    const response = await taskApi.createTask(newTask)
    return response.data
})

export const completeTask = createAsyncThunk('tasks/completeTask', async(id)=>{
    const response = await taskApi.completeTask(id)
    return {data:response.data.message, id}
})

export const fetchPaginatedTasks = createAsyncThunk('tasks/fetchPaginatedTasks', async(page)=>{
    try{
        const response = await taskApi.fetchPaginatedTasks(page)
        return response.data
    }
    catch(error){
        throw new Error('Error updating task.')
    }
    
    
})

//fetch all suggestions for task with the given taskId
export const fetchTaskSuggestions = createAsyncThunk('comments/fetchTasksSuggestions', async(taskId)=>{
    try{
        const response = await taskApi.fetchTaskSuggestions(taskId);
        return response.data
    }
    catch(err){
        throw new Error('Error fetching suggestions.')
    }
})

//create a new suggestion for task with given id
export const postSuggestion = createAsyncThunk('comments/postSuggestion',async(NewTaskSuggestion)=>{
    try{
        const response = await taskApi.postSuggestion(NewTaskSuggestion.id, NewTaskSuggestion.suggestion)
        return response.data
    }
    catch(err){
        throw new Error('Error updating suggestion.')
    }
})

//delete suggestion from task with given taskId
export const deleteSuggestion = createAsyncThunk('comments/deleteSuggestion', async(suggestionObj)=>{
    try{
        const response = await taskApi.deleteSuggestion(suggestionObj.taskId, suggestionObj.suggestionId)
        return response.data;
    }
    catch(err){
        throw new Error('Error while deleting suggestion')
    }
})

export const editSuggestion = createAsyncThunk('suggestions/editSuggestion', async(suggestionObj)=>{
    try{
        const response = await taskApi.editSuggestion(suggestionObj.id, {suggestion: suggestionObj.suggestion});
        return response.data;
    }
    catch(err){
        throw new Error('Error while deleting suggestion')
    }
})

export const fetchReplies = createAsyncThunk('suggestions/fetchReplies', async(suggestionId)=>{
    try{
        const response = await taskApi.fetchReplies(suggestionId)
        return {data:response.data, id:suggestionId}
    }
    catch(error){
        throw new Error('Error while deleting suggestion')
    }
})

export const postReply = createAsyncThunk('suggestions/postReply', async(replyObj)=>{
    try{
        const response = await taskApi.postReply(replyObj.id, {reply: replyObj.reply})
        return response.data
    }
    catch(error){
        throw new Error('Error while posting suggestion reply')
    }
})

export const deleteReply = createAsyncThunk('suggestions/deleteReply', async(replyObj)=>{
    try{
        const response = await taskApi.deleteReply(replyObj.suggestionId, replyObj.id)
        return response.data
    }
    catch(error){
        throw new Error('Error while deleting suggestion reply')
    }
})