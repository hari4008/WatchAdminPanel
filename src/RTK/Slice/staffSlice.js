import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import staffServices from "../Services/staffServices";

export const addStaff = createAsyncThunk(
    'staff/addStaff',
    async (data) => {
        try {
            console.log("data in staff slice", data)
            const res = await staffServices.addStaff(data);
            console.log("data in staff slice after services", res.data)
            return res;
        } catch (error) {
            console.log("error in add staff ", error)
        }
    }
)

export const getAllStaff = createAsyncThunk(
    'staff/getAllStaff',
    async () => {
        try {
            const res = await staffServices.getAllStaff();
            console.log("data in staff slice after services", res.data)
            return res.data;
        } catch (error) {
            console.log("error in get staff ", error)
        }
    }
)

const staffSlice = createSlice({
    name: "staff",
    initialState: {
        staff: [],
        loading: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addStaff.pending, (state) => {
                state.loading = false;
            })
            .addCase(addStaff.fulfilled, (state, action) => {
                state.loading = false
                console.log("action.payload in staff", action.payload)
                state.staff = [...state.staff, action.payload]
            })
            .addCase(addStaff.rejected, (state) => {
                state.loading = false;
            })

        builder
            .addCase(getAllStaff.pending, (state) => {
                state.loading = false;
            })
            .addCase(getAllStaff.fulfilled, (state, action) => {
                state.loading = false
                console.log("action.payload in staff", action.payload)
                state.staff = [...state.staff, action.payload]
            })
            .addCase(getAllStaff.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default staffSlice.reducer