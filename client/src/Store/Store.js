import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../Slice/authSlice'

export const store = configureStore({
    reducer: {
        authSlice: AuthSlice
    },
})