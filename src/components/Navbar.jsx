import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from "../components/Modal"
import { useState } from "react"
import Tooltip from '@mui/material/Tooltip';
import { useMainContext } from "../contexts/AuthContext"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [modalOpened, setModalOpened] = useState(null)
  const { menuToggle, setMenuToggle } = useMainContext()

  return (
    <nav className={`${menuToggle ? "scale-x-1" : "scale-x-0"} 
      sm:static sm:transform-none text-3xl space-y-16 shadow-lg navToggle bg-light-green sm:bg-[#FAFAFB]`} 
      onMouseEnter={() => setMenuToggle(true)} 
      onMouseLeave={() => setMenuToggle(false)}>
      <ul className="text-dark-green flex-col items-start space-y-8 ">
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100`}>
          <Tooltip title="首頁" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </Tooltip>
        </li>
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100`}>
          <Tooltip title="個人頁面" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-address-card" />
          </Tooltip>
        </li>
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100`}>
          <Tooltip title="設定" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-gear" />
          </Tooltip>
        </li>
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100 `}
        onClick={() => {
          setOpen(true)
          setModalOpened("post")}}>
          <Tooltip title="發文" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-pen" />
          </Tooltip>
        </li>
        <li className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100 `}
        onClick={() => {
          setOpen(true)
          setModalOpened("report")
        }}>
          <Tooltip title="報告" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-file" />
          </Tooltip>
        </li>
      </ul>
      <div className={`${menuToggle? "opacity-100" : "opacity-0"} hover:text-green-700 nav-item sm:opacity-100 pb-2`}>
        <Tooltip title="登出" placement="right">
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
        </Tooltip>
      </div>
      <Modal open={open} setOpen={setOpen} modal={modalOpened}/>
    </nav>
  )
}

export default Navbar