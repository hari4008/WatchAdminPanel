import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import faqServices from "../Services/faqServices";

export const getAllFaq = createAsyncThunk(
    'faq/getAllFaq',
    async ()=>{
        try {
            const res = await faqServices.getAllFaq();
            // console.log(res);
            return res.data;
        } catch (error) {
            console.log("error in get faq slice",error);
        }
    }
)

export const addFaq = createAsyncThunk(
    'faq/addFaq',
    async (data)=>{
        try {
            console.log(data);
            const res = await faqServices.addFaq(data);
            console.log("in slice ",res);
            return res;
        } catch (error) {
            console.log("error in get faq slice",error);
        }
    }
)

export const deleteFaq = createAsyncThunk(
    'faq/deleteFaq',
    async (id)=>{
        try {
            const res = await faqServices.deleteFaq(id);
            console.log(res);
            return id;
        } catch (error) {
            console.log("error in get faq slice",error);
        }
    }
)


const  faqSlice= createSlice({
    name:"faq",
    initialState:{
        loading:false,
        error:null,
        faqs:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllFaq.pending,(state)=>{
            state.loading = false;
        })
        .addCase(getAllFaq.fulfilled,(state,action)=>{
            state.loading = false
            // console.log("action.payload in faq",action.payload);
            state.faqs = action.payload;
        })
        .addCase(getAllFaq.rejected, (state) => {
            state.loading = false;
        })

        builder
        .addCase(addFaq.pending,(state)=>{
            state.loading = false;
        })
        .addCase(addFaq.fulfilled,(state,action)=>{
            state.loading = false
            console.log("action.payload in addfaq",action.payload);
            state.faqs = [...state.faqs,action.payload];
        })
        .addCase(addFaq.rejected, (state) => {
            state.loading = false;
        })

        builder
        .addCase(deleteFaq.pending,(state)=>{
            state.loading = false;
        })
        .addCase(deleteFaq.fulfilled,(state,action)=>{
            state.loading = false
            console.log("action.payload in delete faq",action.payload);
            state.faqs = state.faqs.filter((faq) => faq.id !== action.payload);
        })
        .addCase(deleteFaq.rejected, (state) => {
            state.loading = false;
        })

    }
})

export default faqSlice.reducer