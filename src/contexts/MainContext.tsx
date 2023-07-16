import { createContext, useContext, useState, useEffect } from "react"
import { ChildrenProp, Post, Report } from "types/user"

type DefaultContext = {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  postCardId: number | null
  setPostCardId: React.Dispatch<React.SetStateAction<number | null>>
  reportCardId: number | null
  setReportCardId: React.Dispatch<React.SetStateAction<number | null>>
  posts: Post[] | null
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>
  reports: Report[] | null
  setReports: React.Dispatch<React.SetStateAction<Report[] | null>>
  currentTab: string
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

export const MainContext = createContext<DefaultContext | null>(null)
export function useMainContext() {
  return useContext(MainContext)
}

export const MainContextProvider = ({ children }: ChildrenProp) => {
  const [currentTab, setCurrentTab] = useState("post")
  const [darkMode, setDarkMode] = useState(false)
  const [postCardId, setPostCardId] = useState<number | null>(null)
  const [reportCardId, setReportCardId] = useState<number | null>(null)
  const [posts, setPosts] = useState<Post[] | null>([])
  const [reports, setReports] = useState<Report[] | null>([])
  useEffect(() => {
    // 检查本地存储中的主题值
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
    }
  }, [])

  return (
    <>
      <MainContext.Provider
        value={{
          darkMode,
          setDarkMode,
          postCardId,
          setPostCardId,
          reportCardId,
          setReportCardId,
          posts,
          setPosts,
          reports,
          setReports,
          currentTab,
          setCurrentTab,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  )
}
