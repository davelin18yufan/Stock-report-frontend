import { useAppSelector } from "hooks/store"
import { ChildrenProp } from "types/user"

export const MainContainer = ({ children }: ChildrenProp) => {
  const darkMode = useAppSelector((state) => state.mainPageReducer.darkMode)

  return (
    <div
      className={`mx-auto xl:container ${
        darkMode && "dark"
      } transition-colors dark:scrollbar-track-gray-400 `}
    >
      {children}
    </div>
  )
}
