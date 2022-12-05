import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Services/Api/authService";
import {delay} from '../Services/Helper/common'

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const { phonenumber, password } = data;
    return await authService.login(phonenumber, password);
  } catch (e) {
    console.log("error", e);
    return thunkAPI.rejectWithValue("something went wrong");
  }
});
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, thunkAPI) => {
    try {
      await delay(3000);
      return await authService.verifyToken();
    } catch (e) {
      console.log("error", e);
      authService.logout();
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});
const initialState = {
  user: null,
  isAuthenticated: null,
  isLoading: null,
  token: null,
  loginType: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      console.log("actiion ful", action.payload);
      const payload = action.payload;
      state.isLoading = false;
      state.user = payload?.data;
      state.isAuthenticated = true;
      state.token = payload?.data?.token;
      state.loginType = true;
      authService.setToken(payload?.data?.token);
    },
    [login.rejected]: (state, action) => {
      console.log("action reject", action);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.loginType = false;
    },
    [verifyToken.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [verifyToken.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.isLoading = false;
      if (action?.payload?.message == 'OK')
      state.isAuthenticated = true;
      else state.isAuthenticated = false;
    },
    [verifyToken.rejected]: (state, action) => {
      console.log("action reject", action);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      logout();
    },
    [logout.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
