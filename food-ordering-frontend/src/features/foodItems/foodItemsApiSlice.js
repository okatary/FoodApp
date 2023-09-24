import { apiSlice } from "../../app/api/apiSlice"

export const foodItemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFoodItems: builder.query({
            query: () => '/FoodItems',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetFoodItemsQuery
} = foodItemsApiSlice 