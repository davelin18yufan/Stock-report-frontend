import { createContext, useContext,  useState, useEffect } from "react"

export const MainContext = createContext(null)
export function useMainContext() { 
  return useContext(MainContext)
}


export const MainContextProvider = ({children}) => {
  const [menuToggle, setMenuToggle] = useState(false)
  const [ darkMode, setDarkMode ] = useState(false);
  useEffect(() => {
    // 检查本地存储中的主题值
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return <>
        <MainContext.Provider value={{menuToggle, setMenuToggle, darkMode, setDarkMode} }>
            { children }
        </MainContext.Provider>
    </>
}

