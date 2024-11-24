import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/feature/api/authApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  // },
});

export default store;

export const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.getUserProfile.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
