import { createSlice} from '@reduxjs/toolkit'
import { signin, register } from "../actions/auth";

const initialState = {
    isLoading: false,
    token:'',
    user:{},
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
              state.isLoading =  false
              if(action.payload){
                state.singleStatus = 'succeeded'
                state.tasks.push(action.payload)
              }
            })
            .addCase(signin.rejected, (state, action)=>{
                  state.isLoading = false
                  state.singleStatus = 'failed'
                  state.error = action.error.message
            })
    }
})

export default authSlice.reducer