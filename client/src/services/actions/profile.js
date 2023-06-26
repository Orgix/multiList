import * as api from '../api/'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async(userId)=>{
    const response = await api.fetchUserProfile(userId)
    console.log(response)
   return response.data;
})