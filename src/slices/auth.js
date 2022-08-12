import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./error.js";

const base_url="http://analyticsv.pythonanywhere.com";
export const user = createAsyncThunk(
    "auth/user",
    async (_,{thunkAPI,getState}) => {
        try {
            const state=getState()
            // console.log("hi",state.auth.token)
            // console.log("made req")
            const headers = {
                
                'Authorization': 'Token ' + state.auth.token
              }
            const response = await axios.get(base_url+'/user',{headers: headers})
            // console.log(response.data)
            return response.data 
        } 
        catch (error) {
            
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, thunkAPI) => {
        try {
            // console.log("here")
            const response = await axios.post(base_url+'/user/login', { username, password });
            // console.log(response)
            return response.data;
        } catch (error) {
            const msg=error.response.data
            Object.keys(msg).forEach(function(key) {
                thunkAPI.dispatch(setError(msg[key]));
                // ...
            });
            
            
            return thunkAPI.rejectWithValue()
        }
    }
)


const initialState = { isLoggedIn: false, token: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        
        [login.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.token = action.payload.token;
            // console.log(state.token)
            state.isLoggedIn = true;
        },
        [login.rejected]: (state, action) => {
            state.token = null;
            state.isLoggedIn = false;

        },
        
        [user.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
            // console.log("user fulfilled: "+state.token)
        },
        [user.rejected]: (state, action) => {
            // console.log("rejected")
            state.isLoggedIn = false
            state.user = null
        },
    },
});

const { reducer } = authSlice;
export default reducer;