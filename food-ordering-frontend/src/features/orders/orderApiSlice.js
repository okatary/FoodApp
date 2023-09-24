import { apiSlice } from "../../app/api/apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUserOrders: builder.query({
            query: () => '/orders',
            keepUnusedDataFor: 5,
        }),
        addFoodItemToCurrentOrder: builder.mutation({
            query: ({ foodItemId, quantity }) => ({
                url: '/orders/addFoodItemToCurrentOrder',
                method: 'POST',
                body: { foodItemId, quantity }
            })
        }),
        getCurrentOrder: builder.query({
            query: () => '/orders/getCurrentOrder',
            keepUnusedDataFor: 1,
        }),
        checkoutOrder: builder.query({
            query: () => '/orders/checkoutOrder',
            keepUnusedDataFor: 5,
        }),
    })
})

export const {
    useGetAllUserOrdersQuery,
    useAddFoodItemToCurrentOrderMutation,
    useGetCurrentOrderQuery,
    useLazyCheckoutOrderQuery
} = ordersApiSlice 