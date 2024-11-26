import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import { authApi } from "@/feature/api/authApi";
import { courseApi } from "@/feature/api/courseApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  auth: authReducer,
});

export default rootReducer;
