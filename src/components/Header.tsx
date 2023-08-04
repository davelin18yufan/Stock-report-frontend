import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { ReactComponent as Logo } from "assets/images/logo.svg"
import { ReactComponent as LogoDark } from "assets/images/logoDark.svg"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { setMenuToggle } from "slices/mainSlice"

const Header = () => {
  const dispatch = useAppDispatch()
  const menuToggle = useAppSelector((state) => state.mainPageReducer.menuToggle)
  const darkMode = useAppSelector((state) => state.mainPageReducer.darkMode)

  return (
    <header className="bg-dark-green dark:bg-slate-900 text-light-green dark:text-slate-200 h-[70px] flex justify-between items-center overflow-hidden">
      <div className="pl-6 sm:pl-0 overflow-hidden bg-inherit">
        {darkMode ? <LogoDark /> : <Logo />}
      </div>
      <div
        className="h-full absolute left-1 top-4 sm:hidden"
        onClick={() => dispatch(setMenuToggle(!menuToggle))}
        onMouseEnter={() => dispatch(setMenuToggle(true))}
        onMouseLeave={() => dispatch(setMenuToggle(false))}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="flex text-center space-x-2 pr-2">
        <div>
          <a
            href="https://mops.twse.com.tw/mops/web/index"
            className="opacity-70 hover:opacity-100 "
          >
            <img
              src={require("../assets/images/TWSE.jpeg")}
              alt="TWSE"
              className="linkImg"
            />
            TWSE
          </a>
        </div>
        <div>
          <a
            href="https://ctee.com.tw/stock"
            className="opacity-70 hover:opacity-100"
          >
            <img
              src={require("../assets/images/工商.png")}
              alt="工商時報"
              className="linkImg"
            />
            工商
          </a>
        </div>
        <div>
          <a
            href="https://money.udn.com/money/cate/5590"
            className="opacity-70 hover:opacity-100"
          >
            <img
              src={require("../assets/images/經濟.png")}
              alt="經濟日報"
              className="linkImg"
            />
            經濟
          </a>
        </div>
        <div>
          <a
            href="https://www.digitimes.com.tw/"
            className="opacity-70 hover:opacity-100"
          >
            <img
              src={require("../assets/images/電子.png")}
              alt="電子時報"
              className="linkImg"
            />
            電子
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
