import { createSlice} from '@reduxjs/toolkit'
import { signin, register,signout, fetchUserTasks, updateUserData, deleteUser, toggleFavorite, addFriend, deleteFriend, cancelRequest } from "../actions/auth";
import { deleteTask,updateTask,completeTask} from '../actions/tasks';
import { synchronizeUser } from '../actions/profile';

const initialState = {
    isLoading: false,
    token:localStorage.getItem('token') ? localStorage.getItem('token'): null,
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null,
    error:'',
    success:false,
    tasks:[]
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(register.fulfilled, (state,action)=>{
                //add map here to handle the posts
                state.isLoading = false
                state.success = true
            })
            .addCase(register.rejected, (state,action)=>{
                  state.isLoading = false
                  state.error = action.error.message
            } ) 
            .addCase(signin.pending, (state,action)=>{
                  state.isLoading = true
                  state.error=''
            })   
            .addCase(signin.fulfilled, (state,action)=>{
                console.log("success")
                state.isLoading =  false
                state.success = true;
                state.token = action.payload.token
                state.user = action.payload.user 

                localStorage.setItem("user", JSON.stringify(action.payload.user))
                localStorage.setItem("token",JSON.stringify(action.payload.token))
            
            })
            .addCase(signin.rejected, (state, action)=>{
                  state.isLoading = false
                  state.singleStatus = 'failed'
                  state.error = action.error.message
            })
            .addCase(signout.fulfilled, (state,action)=>{
                state.user = null
                state.token = null
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            })
            .addCase(signout.rejected, (state,action)=>{
                console.log("error")
            })
            .addCase(fetchUserTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
              })
              .addCase(fetchUserTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
              .addCase(deleteTask.fulfilled, (state,action)=>{
                const deleted = action.payload.id
                state.tasks = state.tasks.filter(task=>task._id !== deleted)
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
              .addCase(synchronizeUser.fulfilled, (state,action)=>{
                const data = JSON.parse(localStorage.getItem('user'))
                
                data.tasks = action.payload.tasks;
                data.synced = action.payload.synced

                localStorage.setItem('user', JSON.stringify(data))
                console.log(localStorage.getItem('user'))
                state.user = data
            })
            .addCase(updateUserData.fulfilled, (state,action)=>{
              const data = action.payload
              localStorage.setItem('user', JSON.stringify(data))
              state.user = data
            })
            .addCase(deleteUser.fulfilled, (state,action)=>{
                state.user = null
                state.token = null
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            })
            .addCase(toggleFavorite.fulfilled, (state,action)=>{
              const favorites = action.payload.favorites;
              const user = JSON.parse(localStorage.getItem('user'))
              
              user.favorites = favorites

              localStorage.setItem('user', JSON.stringify(user))
              state.user = user
            })
            .addCase(addFriend.fulfilled, (state,action)=>{
              //userId will be in the payload, add it to the user's friend array
              const user = JSON.parse(localStorage.getItem('user'))

              user.requests.push(action.payload) 
              localStorage.setItem('user', JSON.stringify(user))
              state.user = user 
            })
            .addCase(deleteFriend.fulfilled, (state,action)=>{
              //userId will be in the payload, filter it from the user's delete array
              const {id} = action.payload;
              const user = JSON.parse(localStorage.getItem('user'))

              user.friends = user.friends.filter(friend=> friend !== id)

              localStorage.setItem('user', JSON.stringify(user))
              state.user = user
            })
            .addCase(cancelRequest.fulfilled, (state, action)=>{
              console.log(action.payload)
               const {id} = action.payload
               const user = JSON.parse(localStorage.getItem('user'))
               console.log(user)
               user.requests= user.requests.filter(request=> request.id !== id)
               console.log(user)
               localStorage.setItem('user', JSON.stringify(user))
               state.user = user
            })
    }
})

export const getUser = (state) => state.auth.user;
export default authSlice.reducer