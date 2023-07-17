import { configureStore } from "@reduxjs/toolkit"
import mainPageReducer from "slices/mainSlice"

const store = configureStore({
  reducer: {
    mainPageReducer
  },
})

// 反推行別
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store