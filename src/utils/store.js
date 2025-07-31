import { configureStore } from "@reduxjs/toolkit";
// store.js ya store/index.js mein
import filterSlice from './filterSlice'; 
import authSlice from './authSlice' 

 const store = configureStore({
    reducer:{
        filterSlice : filterSlice,
        authSlice :authSlice
    }
 })
 export default store