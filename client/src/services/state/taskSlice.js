import { createSlice} from '@reduxjs/toolkit'
import {fetchTasks} from '../actions/tasks'


const initialState = {
  isLoading: false,
  tasks:[],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder
          .addCase(fetchTasks.pending, (state, action) => {
              state.status = 'loading'
          })
          .addCase(fetchTasks.fulfilled, (state,action)=>{
              //add map here to handle the posts
              state.status = 'succeeded'
              state.tasks.push(...action.payload)
          })
          .addCase(fetchTasks.rejected, (state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
          } )    
  }
})
        
//export const { increment, decrement, incrementByAmount } = taskSlice.actions
export const getTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;

export default taskSlice.reducer