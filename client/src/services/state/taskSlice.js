import { createSlice} from '@reduxjs/toolkit'
import {fetchTasks} from '../actions/tasks'


const initialState = {
  isLoading: false,
  tasks:[
    {createdAt: "2023-06-04T14:26:44.322Z",_id:1, title:'wwe', author: 'uwunistis', priority:0, privacy:'Public', tasks:[{id:'3123c8ewdv', name:'uwunismos', completed:false},{id:'3123c8ewdv', name:'uwunismos', completed:true},{id:'3123c8ewdv', name:'uwunismos', completed:true}], team:{id:'3132131'}},
    {createdAt: "2023-05-31T10:32:44.322Z",_id:3, title:'wwe', author: 'uwunistis', priority:0, privacy:'Public', tasks:[{id:'3123c8ewdv', name:'uwunismos', completed:true}], team:{id:'3132131'}},
    {createdAt: "2023-05-31T10:32:44.322Z",_id:2, title:'wwe', author: 'uwunistis', priority:0, privacy:'Public', tasks:[{id:'3123c8ewdv', name:'uwunismos', completed:false}], team:{id:'3132131'}},
    {createdAt: "2023-05-31T10:32:44.322Z",_id:5, title:'wwe', author: 'uwunistis', priority:0, privacy:'Public', tasks:[{id:'3123c8ewdv', name:'uwunismos', completed:true}], team:{id:'3132131'}},
    {createdAt: "2023-05-31T10:32:44.322Z",_id:4, title:'wwe', author: 'uwunistis', priority:0, privacy:'Public', tasks:[{id:'3123c8ewdv', name:'uwunismos', completed:false}], team:{id:'3132131'}},
  ],
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