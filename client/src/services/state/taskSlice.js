import { createSlice} from '@reduxjs/toolkit'
import {fetchTasks, fetchTask, updateTask, deleteTask,createTask} from '../actions/tasks'


const initialState = {
  isLoading: true,
  tasks:[],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
  singleStatus: 'idle',//'idle'  | 'succeeded' | 'failed',
  error: null
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder
          .addCase(fetchTasks.pending, (state, action) => {
              state.isLoading = true
              state.error = ''
          })
          .addCase(fetchTasks.fulfilled, (state, action) => {
            state.error = '';
            state.isLoading = false;
            state.status = 'succeeded';
          
            action.payload.forEach((newTask) => {
              const existingTask = state.tasks.find((task) => task._id === newTask._id);
              if (!existingTask) {
                state.tasks.push(newTask);
              }
            });
          })
          .addCase(fetchTasks.rejected, (state,action)=>{
                state.isLoading = false
                state.status = 'failed'
                state.error = action.error.message
          } ) 
          .addCase(fetchTask.pending, (state,action)=>{
                state.isLoading = true
                state.error=''
          })   
          .addCase(fetchTask.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
              state.singleStatus = 'succeeded';
              const existingTask = state.tasks.find((task) => task._id === action.payload._id);
              if (!existingTask) {
                state.tasks.push(action.payload);
              }
            }
          })
          .addCase(fetchTask.rejected, (state, action)=>{
                state.isLoading = false
                state.singleStatus = 'failed'
                state.error = action.error.message
          })
          .addCase(createTask.fulfilled, (state,action)=>{
            state.tasks.push(action.payload)
            state.singleStatus = 'succeeded'
          })
          .addCase(createTask.rejected, (state, action)=>{
            state.error = action.error.message
          })
          .addCase(updateTask.fulfilled, (state,action)=>{
            const updatedTask = action.payload;
            state.tasks = state.tasks.map((task) => {
              if (task._id === updatedTask._id) {
                return updatedTask;
              }
              return task;
            });
          })
          .addCase(updateTask.rejected, (state,action)=> {
            console.log('rejected')
          })
          .addCase(deleteTask.fulfilled, (state,action)=>{
            const deleted = action.payload.id
            state.tasks = state.tasks.filter(task=>task._id !== deleted)
          })
  }
})
        
export const getTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;
export const getTaskById = (state, id)=>state.tasks.tasks.find(task => task._id === id)
export const getSinglePostStatus = (state) => state.tasks.singleStatus;
export const getLoading = (state) =>state.tasks.isLoading;
export default taskSlice.reducer