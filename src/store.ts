import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mainPageReducer from "slices/mainSlice";
import authReducer from "slices/authSlice";
import { postApi } from "services/postService";
import { reportApi } from "services/reportService";
import { authApi } from "services/authService";
import { userApi } from "services/userService";
import { stockApi } from "services/stockSlices";
import { adminApi } from "services/adminService";

const reducers = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [stockApi.reducerPath]: stockApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  mainPageReducer,
  authReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(reportApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(stockApi.middleware)
      .concat(adminApi.middleware),
});

// 反推行別
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
