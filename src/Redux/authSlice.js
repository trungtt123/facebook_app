import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Services/Api/authService";
import { _setCache, _getCache } from "../Services/Helper/common";
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
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        authService.logout();
        // throw new Error();
      }
      return await authService.checkToken(token);
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
const setToken = async (token) => {
  await _setCache("token", token);
};
const getToken = () => {
  const token = _getCache("token");
  if (token !== "undefined" && token) return token;
  return "";
};
const initialState = {
  user: null,
  isAuthenticated: null,
  isLoading: true,
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
      setToken(payload?.data?.token);
    },
    [login.rejected]: (state, action) => {
      console.log("action reject", action);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.loginType = false;
    },
    [loadUser.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      console.log("actiion ful", action);
      state.isLoading = false;
      state.user = action?.payload?.data;
      console.log("state us", state.user);
      state.isAuthenticated = true;
    },
    [loadUser.rejected]: (state, action) => {
      console.log("action reject", action);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      logout();
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
