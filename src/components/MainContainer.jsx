import { useMainContext } from "../contexts/MainContext"
export const MainContainer = ({children}) => {
  const { darkMode  } = useMainContext()

  return(
    <div className={`mx-auto xl:container ${darkMode && "dark"} transition-colors dark:scrollbar-track-gray-400`}>
      {children}
    </div>
  )
}