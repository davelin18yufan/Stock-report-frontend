import { createContext, useContext,  useState, useEffect } from "react"

export const MainContext = createContext(null)
export function useMainContext() { 
  return useContext(MainContext)
}


export const MainContextProvider = ({children}) => {
  const [ menuToggle, setMenuToggle ] = useState(false)
  const [ currentTab, setCurrentTab ] = useState("post")
  const [ darkMode, setDarkMode ] = useState(false)
  const [ postCardId, setPostCardId ] = useState(null)
  const [ reportCardId, setReportCardId ] = useState(null)
  const [ posts, setPosts ] = useState([])
  const [ reports, setReports ] = useState([])
  useEffect(() => {
    // 检查本地存储中的主题值
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return <>
        <MainContext.Provider value={{
          menuToggle, 
          setMenuToggle, 
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
          setCurrentTab
        }}>
          { children }
        </MainContext.Provider>
    </>
}

