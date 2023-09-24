import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5158/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        let token = getState().auth.token
        let refreshToken = getState().auth.refreshToken
        if(!token){
            token = localStorage.getItem('token');
            refreshToken = localStorage.getItem('refreshToken');
            console.log("refreshToken", refreshToken)
        }

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.meta?.response?.status === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery({
            url: '/authentication/refreshToken',
            method: 'POST',
            body:
            {
                token: api.getState().auth.token,
                refreshToken: api.getState().auth.refreshToken
            }
          }, api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const email = api.getState().auth.email
            const name = api.getState().auth.name
            const credit = api.getState().auth.credit
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, email, name, credit }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})