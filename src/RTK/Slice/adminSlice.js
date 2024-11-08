import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminServices from '../Services/adminServices';

export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async(data) =>{
        try {
            console.log("login data in slice",data);
            const res = await adminServices.loginServices(data); 
            return res;
        } catch (error) {
            console.log("error in the add product ", error);
        }
    }
)

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        loading:'',
        // error:'',
        admin:''
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=> {
          state.loading=true;
          state.error=''
        })
        .addCase(adminLogin.fulfilled ,(state,action)=>{
            state.loading= false
            console.log("in action ",action.payload);
            state.admin= action.payload
        })
        .addCase(adminLogin.rejected ,(state,action)=>{
            state.loading= false
            state.error= action.payload
        })
    }
})

export default  adminSlice.reducer;