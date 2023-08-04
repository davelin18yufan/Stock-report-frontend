import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type MainState = {
  darkMode: boolean
  menuToggle: boolean
  postCardId: number | null
  reportCardId: number | null
  currentTab: string
}

const initialState: MainState = {
  darkMode: false,
  menuToggle: false,
  postCardId: null,
  reportCardId: null,
  currentTab: "post",
}

const mainSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      const theme = state.darkMode ? "light" : "dark"
      state.darkMode = !state.darkMode
      localStorage.setItem("theme", theme)
    },
    setMenuToggle: (state, action: PayloadAction<boolean>) => {
      state.menuToggle = action.payload
    },
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload
    },
    setPostId: (state, action: PayloadAction<number | null>) => {
      state.postCardId = action.payload
    },
    setReportId: (state, action: PayloadAction<number | null>) => {
      state.reportCardId = action.payload
    },
  },
})

export const {
  setDarkMode,
  setCurrentTab,
  setPostId,
  setReportId,
  setMenuToggle,
} = mainSlice.actions
export default mainSlice.reducer
