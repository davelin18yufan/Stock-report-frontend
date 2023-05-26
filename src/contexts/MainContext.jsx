import { createContext, useContext,  useState, useEffect } from "react"

export const MainContext = createContext(null)
export function useMainContext() { 
  return useContext(MainContext)
}


export const MainContextProvider = ({children}) => {
  const [ menuToggle, setMenuToggle ] = useState(false)
  const [ darkMode, setDarkMode ] = useState(false)
  const [ postCardId, setPostCardId ] = useState(2)
  const [ reportCardId, setReportCardId ] = useState(2)
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
          setReports
        }}>
          { children }
        </MainContext.Provider>
    </>
}

