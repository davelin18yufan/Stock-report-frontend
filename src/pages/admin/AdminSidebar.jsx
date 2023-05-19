import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMainContext } from "../../contexts/AuthContext"
import Tooltip from '@mui/material/Tooltip';


const AdminNavbar = () => {
  const { menuToggle, setMenuToggle } = useMainContext()

  return (
    <nav className={`${menuToggle ? "scale-x-1" : "scale-x-0"} 
      sm:static sm:transform-none text-3xl space-y-16 shadow-lg navToggle bg-light-green sm:bg-light-gray`} 
      onMouseEnter={() => setMenuToggle(true)} 
      onMouseLeave={() => setMenuToggle(false)}>
      <ul className="text-dark-green flex-col items-start space-y-8 ">
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100`}>
          <Tooltip title="活動清單" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-newspaper" />
          </Tooltip>
        </li>
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100`}>
          <Tooltip title="使用者清單" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-face-grimace" />
          </Tooltip>
        </li>
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100`}>
          <Tooltip title="設定" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-gear" />
          </Tooltip>
        </li>
      </ul>
      <div className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100 pb-2`}>
        <Tooltip title="登出" placement="right">
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
        </Tooltip>
      </div>
    </nav>
  )
}

export default AdminNavbar