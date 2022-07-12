import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('token')) || null || { data: [] }
}

export const AuthSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        storingUserData: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('token', JSON.stringify(action.payload))
        },
        removeUserData :()=>{
            localStorage.removeItem('token')
        }
    }
})

export const { storingUserData , removeUserData} = AuthSlice.actions

export default AuthSlice.reducer