import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryServices from "../Services/categoryServices";


export const addCate = createAsyncThunk(
    "category/addCate",
    async (data) => {
        try {
            console.log("cate is ", data)
            const res = await categoryServices.addCate(data);
            console.log("res in",res)
            return res.data;
        } catch (err) {
            console.log("error in add category ", err);
        }
    }
)
export const getAllCate = createAsyncThunk(
    "category/getAllCate",
    async () => {
        try {
            const res = await categoryServices.getAllCate();
            return res;
        } catch (err) {
            console.log("error in get category ", err);
        }
    }
)
export const editCate = createAsyncThunk(
    "category/editCate",
    async (data) => {
        try {
            console.log("cate is ", data)
            const res = await categoryServices.editCategory(data);
            console.log("edit cate ", res)
            return data;
        } catch (err) {
            console.log("error in edit category ", err);
        }
    }
)
export const deleteCate = createAsyncThunk(
    "category/deleteCate",
    async (id) => {
        try {
            await categoryServices.deleteCate(id);
            return id;
        } catch (err) {
            console.log("error in delete category ", err);
        }
    }
)
const cateSlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: "",
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCate.pending, (state) => {
                state.loading = false;
            })
            .addCase(addCate.fulfilled, (state, action) => {
                state.loading = false
                state.categories = [...state.categories, action.payload]
            })
            .addCase(addCate.rejected, (state) => {
                state.loading = false;
            })
        builder
            .addCase(getAllCate.pending, (state) => {
                state.loading = false;
            })
            .addCase(getAllCate.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload
            })
            .addCase(getAllCate.rejected, (state) => {
                state.loading = false;
            })
        builder
            .addCase(deleteCate.pending, (state) => {
                state.loading = false;
            })
            .addCase(deleteCate.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter((product) => product.id !== action.payload)
            })
        builder
            .addCase(editCate.pending, (state) => {
                state.loading = false;
            })
            .addCase(editCate.fulfilled, (state, action) => {
                state.loading = false;
                console.log('action ',action.payload)
                const index = state.categories.findIndex((product) => product.id === action.payload.id)
                if (index !== -1) {
                    const updatedCate = [...state.categories]
                    updatedCate[index] = action.payload
                    console.log("upt ",updatedCate)
                    return {
                        ...state,
                        categories: updatedCate
                    }
                } else {
                    return state;
                }
            })
            .addCase(editCate.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default cateSlice.reducer