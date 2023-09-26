import * as userApi from '../api/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async(userId)=>{
    const response = await userApi.fetchUserProfile(userId)
    return response.data;
})


export const synchronizeUser = createAsyncThunk('profile/syncrhonizeUser', async()=>{
    const response = await userApi.syncrhonizeUser()
    return response.data;
})