import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name :"authSlice",
    initialState :{
        userData :JSON.parse(localStorage.getItem("userData")|| null)
    },
    reducers:{
        adduserData:(state,actions) =>{
            state.userData = actions.payload
            localStorage.setItem("userData" ,JSON.stringify(actions.payload) )
        },
        removeuserData:(state,actions) =>{
            state.userData = null;
            localStorage.removeItem("userData")

        }
    }
})
export const {adduserData,removeuserData} = authSlice.actions;
export default authSlice.reducer;
