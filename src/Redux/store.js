import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import emojiReducer from "./emojiSlice";
import videoReducer from "./videoSlice";
import tabReducer from "./tabSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    post: postReducer,
    emoji: emojiReducer,
    video: videoReducer,
    tab: tabReducer
  },
});
