import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMainContext } from '../contexts/MainContext'

const Header = () => {
  const { menuToggle, setMenuToggle} = useMainContext()
  return(
    <header className= "bg-dark-green dark:bg-slate-900 text-light-green dark:text-slate-200 h-[70px] flex justify-between items-center">
      <h5 className="text-light-green dark:text-slate-400 text-4xl font-bold pl-8">
        LOGO
      </h5>
      <div className="h-full absolute left-1 top-4 sm:hidden" 
        onClick={() => setMenuToggle(!menuToggle)} 
        onMouseEnter={() => setMenuToggle(true)} 
        onMouseLeave={() => setMenuToggle(false)}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </div>
      <div className="flex text-center space-x-2 pr-2">
        <div>
          <a href="https://mops.twse.com.tw/mops/web/index" className="opacity-70 hover:opacity-100 ">
            <img src={require("../assets/images/TWSE.jpeg")} alt="TWSE" className="linkImg"/>
            TWSE
          </a>
        </div>
        <div>
          <a href="https://ctee.com.tw/stock" className="opacity-70 hover:opacity-100">
            <img src={require("../assets/images/工商.png")} alt="工商時報" className="linkImg"/>
            工商
          </a>
        </div>
        <div>
          <a href="https://money.udn.com/money/cate/5590" className="opacity-70 hover:opacity-100" >
            <img src={require("../assets/images/經濟.png")} alt="經濟日報" className="linkImg"/>
            經濟
          </a>
        </div>
        <div>
          <a href="https://www.digitimes.com.tw/" className="opacity-70 hover:opacity-100">
            <img src={require("../assets/images/電子.png")} alt="電子時報" className="linkImg"/>
            電子
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header