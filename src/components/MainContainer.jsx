import { useAppSelector } from "hooks"

export const MainContainer = ({ children }) => {
  const darkMode = useAppSelector(state => state.mainPageReducer.darkMode)

  return (
    <div
      className={`mx-auto xl:container ${
        darkMode && "dark"
      } transition-colors dark:scrollbar-track-gray-400 `}
    >
      {children}
    </div>
  );
};
