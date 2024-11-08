import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../Services/orderService";
// import orderService from "../services/orderService";

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (order) => {
        try {
            const res = await orderService.addOrder(order);
            console.log("res order slice ", res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)
export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async () => {
        try {
            const res = await orderService.getAllOrders();
            // console.log("res order slice ", res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)
export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (id) => {
        try {
            const res = await orderService.deleteOrder(id);
            console.log("res order slice ", res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)
export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async (order) => {
        try {
            console.log('order ',order)
            const res = await orderService.updateOrder(order);
            // if(res)
            console.log("res order slice ", res)
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: "",
        error: ""
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // console.log(action.payload);
            })
        builder
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("action.payload order ", action.payload);
                if(action.payload.data === 1){
                    state.orders = state.orders.filter(order => order.id != action.payload.id)
                } else {
                    return state.orders
                }
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder    
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                console.log("act ", action.payload.status[0]);
                console.log("act id", action.payload.data);
                if (action.payload.status[0] == 1) {
                    const index = state.orders.findIndex((order) => order.id === action.payload.data.id);
                    console.log('index is ', index);
                    if (index !== -1) {
                        state.orders[index].status = action.payload.data.status;
                    } 
                }
            })
            .addCase(updateOrder.rejected,(state,action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default orderSlice.reducer;