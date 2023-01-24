import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const resetVideoSlice = createAction('resetVideoSlice');
export const onChangeMute = createAction('onChangeMute');
const initialState = {
  isMuted: true
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: {
    [onChangeMute]: (state, action) => {
      console.log(action);
      state.isMuted = action.payload;
    },
    [resetVideoSlice]: () => initialState
  },
});

export default videoSlice.reducer;
