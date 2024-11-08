import { configureStore,combineReducers } from "@reduxjs/toolkit";
import combineReducer from './RTK/rootSlice';

const store = configureStore({
  reducer:combineReducer
})

export default store;