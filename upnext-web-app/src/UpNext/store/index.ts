import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/accountReducer";

const store = configureStore({
  reducer: {
    accountReducer,
  },
});

export default store;
