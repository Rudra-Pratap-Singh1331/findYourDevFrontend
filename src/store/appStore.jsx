import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import friendListReducer from "./friendSlice";
import chatReducer from "./chatSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    friendList: friendListReducer,
    chat: chatReducer,
  },
});

export default appStore;
