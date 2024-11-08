import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import contactServices from "../Services/contactService";

export const getAllContact = createAsyncThunk(
    'contact/getAllContact',
    async ()=>{
        try {
            const res = await contactServices.getAllContact();
            console.log("contact",res);
            return res.data;
        } catch (error) {
            console.log("error in get contact slice",error);
        }
    }
)

export const addContact = createAsyncThunk(
    'contact/addContact',
    async (data)=>{
        try {
            console.log(data);
            const res = await contactServices.addContact(data);
            console.log("in slice ",res);
            return res;
        } catch (error) {
            console.log("error in get contact slice",error);
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contact/deleteContact',
    async (id)=>{
        try {
            const res = await contactServices.deleteContact(id);
            console.log(res);
            return id;
        } catch (error) {
            console.log("error in get contact slice",error);
        }
    }
)


const  contactSlice= createSlice({
    name:"contact",
    initialState:{
        loading:false,
        error:null,
        contacts:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllContact.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllContact.fulfilled,(state,action)=>{
            state.loading = false
            if (action.payload) {
                console.log("action.payload in contact_____",action.payload);
                state.contacts = action.payload;
            }
        })
        .addCase(getAllContact.rejected, (state) => {
            state.loading = false;
        })

        builder
        .addCase(addContact.pending,(state)=>{
            state.loading = false;
        })
        .addCase(addContact.fulfilled,(state,action)=>{
            state.loading = false
            console.log("action.payload in addcontact",action.payload);
            state.contacts = [...state.contacts,action.payload];
        })
        .addCase(addContact.rejected, (state) => {
            state.loading = false;
        })

        builder
        .addCase(deleteContact.pending,(state)=>{
            state.loading = false;
        })
        .addCase(deleteContact.fulfilled,(state,action)=>{
            state.loading = false
            console.log("action.payload in delete contact",action.payload);
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        })
        .addCase(deleteContact.rejected, (state) => {
            state.loading = false;
        })

    }
})

export default contactSlice.reducer