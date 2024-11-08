import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import addressService from '../Services/addressServices';

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (address) => {
        const res = await addressService.addAddress(address);
        return res; // Ensure only the data is returned
    }
);

export const getAllAddress = createAsyncThunk(
    'address/getAllAddress',
    async () => {
        const res = await addressService.getAllAddress();
        return res; // Ensure only the data is returned
    }
);

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (id) => {
        const res = await addressService.deleteAddress(id);
        return { ...res, id }; // Attach ID if needed
    }
);

export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async (address) => {
        const res = await addressService.updateAddress(address);
        return res; // Ensure only the data is returned
    }
);

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            .addCase(getAllAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default addressSlice.reducer;
