import { configureStore } from "@reduxjs/toolkit"
import mainPageReducer from "slices/mainSlice"
import { postApi } from "services/postService"
import { reportApi } from "services/reportService"

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    mainPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware).concat(reportApi.middleware)
})

// 反推行別
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store