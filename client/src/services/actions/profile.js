import * as api from '../api/'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async(userId)=>{
    const response = await api.fetchUserProfile(userId)
    return response.data;
})


export const synchronizeUser = createAsyncThunk('profile/syncrhonizeUser', async()=>{
    const response = await api.syncrhonizeUser()
    return response.data;
})