import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/accountReducer";
import errorReducer from "../redux/errorReducer";

const store = configureStore({
  reducer: {
    accountReducer,
    errorReducer,
  },
});

export default store;
