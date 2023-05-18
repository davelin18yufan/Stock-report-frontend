import { createContext, useContext,  useState } from "react"

export const MainContext = createContext(null)
export function useMainContext() { 
  return useContext(MainContext)
}


export const MainContextProvider = ({children}) => {
  const [menuToggle, setMenuToggle] = useState(false)


  return <>
        <MainContext.Provider value={{menuToggle, setMenuToggle} }>
            { children }
        </MainContext.Provider>
    </>
}

