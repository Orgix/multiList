import { createSlice} from '@reduxjs/toolkit'
import { signin, register } from "../actions/auth";

const initialState = {
    isLoading: false,
    token:localStorage.getItem('token') ? localStorage.getItem('token'): null,
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null,
    error:'',
    success:false
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
    }
})

export default authSlice.reducer