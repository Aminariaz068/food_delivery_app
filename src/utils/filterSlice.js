import {createSlice} from "@reduxjs/toolkit";
const filterSlice = createSlice({
   name :"filterSlice",
   initialState:{
    filterVal :null
   },
   reducers:{
    setfiltervalue :(state,action) =>{
       state.filterVal=  action.payload
    }
   }

})
export const {setfiltervalue} = filterSlice.actions
export default filterSlice.reducer