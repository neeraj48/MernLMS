import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import { authApi } from "@/feature/api/authApi";
import { courseApi } from "@/feature/api/courseApi";
import { lectureApi } from "@/feature/api/lectureApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [lectureApi.reducerPath]: lectureApi.reducer,
  auth: authReducer,
});

export default rootReducer;
