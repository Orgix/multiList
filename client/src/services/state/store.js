import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskSlice'
import authSlice from './authSlice'
import profileSlice from './profileSlice'

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
    auth: authSlice,
    profile: profileSlice
  },
})