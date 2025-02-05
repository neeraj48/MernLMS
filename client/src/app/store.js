import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/feature/api/authApi";
import { courseApi } from "@/feature/api/courseApi";
import { lectureApi } from "@/feature/api/lectureApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      lectureApi.middleware
    ),
});

export default store;

export const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.getUserProfile.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
