import { combineReducers } from '@reduxjs/toolkit'
import sidebarSlice from './Slice/sidebarSlice';
import adminSlice from './Slice/adminSlice';
import cateSlice from "./Slice/cateSlice";
import staffSlice from './Slice/staffSlice';
import productSlice from './Slice/productSlice';
import userSlice from './Slice/userSlice';
import faqSlice from './Slice/faqSlice';
import getAllSubCat from './Slice/subcateSlice';
import orderSlice from './Slice/orderSlice';
import addressSlice from './Slice/addressSlice';
import contactSlice from './Slice/contactSlice';

const combineReducer = combineReducers({
    sidebar:sidebarSlice,
    admin:adminSlice,
    category:cateSlice,
    staff:staffSlice,
    product:productSlice,
    user:userSlice,
    faq:faqSlice,
    subcategory:getAllSubCat,
    order:orderSlice,
    address:addressSlice,
    contact:contactSlice
})

export default combineReducer;