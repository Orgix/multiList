import { createSlice} from '@reduxjs/toolkit'
import {fetchTasks, fetchTask, updateTask, deleteTask} from '../actions/tasks'


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
          })
          .addCase(fetchTasks.fulfilled, (state,action)=>{
              //add map here to handle the posts
              state.isLoading = false
              state.status = 'succeeded'
              state.tasks.push(...action.payload)
          })
          .addCase(fetchTasks.rejected, (state,action)=>{
                state.isLoading = false
                state.status = 'failed'
                state.error = action.error.message
          } ) 
          .addCase(fetchTask.pending, (state,action)=>{
                state.isLoading = true
          })   
          .addCase(fetchTask.fulfilled, (state,action)=>{
            state.isLoading =  false
            if(action.payload){
              state.singleStatus = 'succeeded'
              state.tasks.push(action.payload)
            }
          })
          .addCase(fetchTask.rejected, (state, action)=>{
                state.singleStatus = 'failed'
                state.error = action.error.message
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