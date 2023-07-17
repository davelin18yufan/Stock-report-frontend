import { createContext, useContext, useState } from "react"
import { ChildrenProp, Post, Report } from "types/user"

type DefaultContext = {
  postCardId: number | null
  setPostCardId: React.Dispatch<React.SetStateAction<number | null>>
  reportCardId: number | null
  setReportCardId: React.Dispatch<React.SetStateAction<number | null>>
  posts: Post[] | null
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>
  reports: Report[] | null
  setReports: React.Dispatch<React.SetStateAction<Report[] | null>>
}

export const MainContext = createContext<DefaultContext | null>(null)
export function useMainContext() {
  return useContext(MainContext)
}

export const MainContextProvider = ({ children }: ChildrenProp) => {
  const [postCardId, setPostCardId] = useState<number | null>(null)
  const [reportCardId, setReportCardId] = useState<number | null>(null)
  const [posts, setPosts] = useState<Post[] | null>([])
  const [reports, setReports] = useState<Report[] | null>([])

  return (
    <>
      <MainContext.Provider
        value={{
          postCardId,
          setPostCardId,
          reportCardId,
          setReportCardId,
          posts,
          setPosts,
          reports,
          setReports,
        }}
      >
        {children}
      </MainContext.Provider>
    </>
  )
}
