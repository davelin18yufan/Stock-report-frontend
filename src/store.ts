import { configureStore } from "@reduxjs/toolkit"
import mainPageReducer from "slices/mainSlice"
import { postApi } from "services/postService"
import { reportApi } from "services/reportService"
import { userApi } from "services/userService"
import { combineReducers } from "@reduxjs/toolkit"

const reducers = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  mainPageReducer,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(reportApi.middleware)
      .concat(userApi.middleware)
})

// 反推行別
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store