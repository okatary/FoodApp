import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/authentication/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: ({ email, password, name }) => ({
                url: '/authentication/register',
                method: 'POST',
                body: { email, password, name }
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApiSlice