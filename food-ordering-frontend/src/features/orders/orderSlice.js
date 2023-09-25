import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: 'order',
    initialState: { order: null },
    reducers: {
        setOrder: (state, action) => {
            const order = action.payload
            state.order = order
        }
    },
})

export const { setOrder } = orderSlice.actions

export default orderSlice.reducer

export const selectCurrentOrder = (state) => state.order.order