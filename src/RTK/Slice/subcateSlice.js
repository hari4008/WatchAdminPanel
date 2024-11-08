import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subcatServices from "../Services/subcatServices";

export const addSubcate = createAsyncThunk(
    "subcategory/addSubcate",
    async (data) => {
        try {
            const res = await subcatServices.addSubcate(data);
            console.log("add sub ", res)
            return res;
        } catch (error) {
            throw error;
        }
    }
)
export const getAllSubCat = createAsyncThunk(
    "subcategory/getAllSubCat",
    async () => {
        try {
            // console.log("mnnnnnnnnnnnnnnnnnnn");
            const res = await subcatServices.getAllSubCat();
            return res.data;
        } catch (error) {
            console.log("error in get all subcate ", error);
        }
    }
)

export const deleteSubCate = createAsyncThunk(
    "subcategory/deleteSubCate",
    async (id) => {
        try {
            const res = await subcatServices.deleteSubcate(id);
            return id;
        } catch (error) {
            throw error;
        }
    }
)
export const updateSubCate = createAsyncThunk(
    "subcategory/updateSubCate",
    async (data) => {
        try {
            console.log("update sub ", data)
            const res = await subcatServices.updateSubCate(data);
            console.log("res in update ", res);
            return res;
        } catch (error) {
            throw error
        }
    }
)
const subcategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        subcate: [],
        loading: "",
        // error:"",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSubcate.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSubcate.fulfilled, (state, action) => {
                state.loading = false
                console.log("action sub ", action.payload)
                state.subcate = [...state.subcate, action.payload]
            })
            .addCase(addSubcate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getAllSubCat.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSubCat.fulfilled, (state, action) => {
                console.log("in builder subcategory ", action.payload)
                state.loading = false
                state.subcate = action.payload
            })
            .addCase(getAllSubCat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteSubCate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubCate.fulfilled, (state, action) => {
                state.loading = false
                state.subcate = state.subcate.filter((item) => item.id !== action.payload)
            })
            .addCase(deleteSubCate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateSubCate.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSubCate.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.subcate.findIndex((subc) => subc.id === action.payload.data.id);
                console.log("index update sub cate ", action.payload.data.subcategory_name);
                if (index !== -1) {
                    state.subcate[index].subcategory_name = action.payload.data.subcategory_name
                } else {
                    return state;
                }
            })
    }
})

export default subcategorySlice.reducer;


// export default subcategorySlice.reducer;