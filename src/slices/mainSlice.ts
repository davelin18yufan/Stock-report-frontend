import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {  Post, Report } from "types/user"


type MainState = {
  darkMode: boolean
  postCardId: number | null
  reportCardId: number | null
  posts: Post[]
  reports: Report[]
  currentTab: string
}

const initialState: MainState = {
  darkMode: false,
  postCardId: null,
  reportCardId: null,
  posts: [],
  reports: [],
  currentTab: "post",
}

const mainSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode
    }
  }
})

export const {setDarkMode} = mainSlice.actions
export default mainSlice.reducer