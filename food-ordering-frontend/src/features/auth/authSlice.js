import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { email: null, token: localStorage.getItem('token'), refreshToken: localStorage.getItem('refreshToken'), name: null, credit: 0},
    reducers: {
        setCredentials: (state, action) => {
            const { email, token, refreshToken, name, credit } = action.payload
            state.email = email
            state.token = token
            state.refreshToken = refreshToken
            state.name = name
            state.credit = credit
        },
        logOut: (state) => {
            state.email = null
            state.token = null
            state.refreshToken = null

            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        },
        setCredit: (state, action) => {
            const { credit } = action.payload
            state.credit = credit

            console.log("state.credit", state.credit)
        }
    },
})

export const { setCredentials, logOut, setCredit } = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken
export const selectCurrentUserName = (state) => state.auth.name
export const selectCurrentUserCredit = (state) => state.auth.credit