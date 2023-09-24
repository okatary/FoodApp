import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        order: orderReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})