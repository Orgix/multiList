import * as api from '../api/'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await api.fetchTasks()
    return response.data
})

//fetchTask, createTask, updateTask, deleteTask,