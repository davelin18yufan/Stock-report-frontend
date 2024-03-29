import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlassDollar,
  faAddressCard,
  faGear,
  faPen,
  faFile,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { Modal, DarkModeSwitch } from "components"
import { useState } from "react"
import Tooltip from "@mui/material/Tooltip"
import FormControlLabel from "@mui/material/FormControlLabel"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { setDarkMode, setMenuToggle } from "slices/mainSlice"
import { confirmPopOut } from "utilities/confirmPopOut"
import { logout } from "slices/authSlice"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [modalOpened, setModalOpened] = useState("")
  const userId = Number(localStorage.getItem("userId"))
  const go = useNavigate()
  const dispatch = useAppDispatch()
  const menuToggle = useAppSelector((state) => state.mainPageReducer.menuToggle)

  const handleSwitch = () => {
    dispatch(setDarkMode())
  }

  function handleLogout() {
    confirmPopOut("確定登出？", true).then((result) => {
      if (result) {
        dispatch(logout())
        Swal.fire({
          position: "top",
          title: "登出成功！",
          timer: 1300,
          icon: "success",
          showConfirmButton: false,
        })
        go("/login")
      }
      return
    })
  }

  return (
    <nav
      className={`${menuToggle ? "scale-x-1" : "scale-x-0"} 
      sm:static sm:transform-none text-3xl space-y-16 shadow-lg navToggle bg-light-green sm:bg-light-gray sm:rounded-none dark:bg-slate-800`}
      onMouseEnter={() =>
        window.innerWidth <= 640 && dispatch(setMenuToggle(true))
      }
      onMouseLeave={() =>
        window.innerWidth <= 640 && dispatch(setMenuToggle(true))
      }
    >
      <ul className="text-dark-green dark:text-neutral-300 flex-col items-start space-y-8 ">
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/main")}
        >
          <Tooltip title="首頁" placement="right">
            <FontAwesomeIcon icon={faHouse} />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/main/stock")}
        >
          <Tooltip title="股票代號搜尋" placement="right">
            <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go(`/main/user/${userId}`)}
        >
          <Tooltip title="個人頁面" placement="right">
            <FontAwesomeIcon icon={faAddressCard} />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/main/setting")}
        >
          <Tooltip title="設定" placement="right">
            <FontAwesomeIcon icon={faGear} />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100 `}
          onClick={() => {
            setOpen(true)
            setModalOpened("post")
          }}
        >
          <Tooltip title="發文" placement="right">
            <FontAwesomeIcon icon={faPen} />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 first:nav-item sm:opacity-100 `}
          onClick={() => {
            setOpen(true)
            setModalOpened("report")
          }}
        >
          <Tooltip title="報告" placement="right">
            <FontAwesomeIcon icon={faFile} />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100 flex flex-col items-center pl-6`}
        >
          <Tooltip title="夜間模式" placement="right">
            <FormControlLabel
              control={<DarkModeSwitch sx={{ m: 1 }} onChange={handleSwitch} />}
              label=""
            />
          </Tooltip>
        </li>
      </ul>
      <div
        className={`${
          menuToggle ? "opacity-100" : "opacity-0"
        } dark:text-slate-400 hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100 pb-2`}
        onClick={handleLogout}
      >
        <Tooltip title="登出" placement="right">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Tooltip>
      </div>
      <Modal open={open} setOpen={setOpen} modal={modalOpened} />
    </nav>
  )
}

export default Navbar
