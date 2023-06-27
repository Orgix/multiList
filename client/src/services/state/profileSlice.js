import { createSlice} from '@reduxjs/toolkit'
import { fetchUserProfile,synchronizeUser } from '../actions/profile.js'


const profileSlice = createSlice({
    name:'auth',
    initialState: {
        isLoading:false,
        profile:{},
        error:null
    },
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(fetchUserProfile.pending, (state, action) => {
               state.isLoading = true;
               state.error = null
            })
            .addCase(fetchUserProfile.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.error = null;
                state.profile = action.payload
            })
            .addCase(fetchUserProfile.rejected, (state,action)=>{
                state.isLoading = false;
                state.error = action.error
            } ) 
           
    }
})


export default profileSlice.reducer