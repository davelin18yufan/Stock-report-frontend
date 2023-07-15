import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, DarkModeSwitch } from "../components";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useMainContext } from "../contexts/MainContext";
import { useAuth } from "../contexts/AuthContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState(null);
  const { menuToggle, setMenuToggle, darkMode, setDarkMode, setCurrentTab } = useMainContext();
  const { currentUser } = useAuth();
  const userId = currentUser?.id;
  const go = useNavigate();
  const { logout } = useAuth();

  const handleSwitch = () => {
    const theme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", theme);
  };
  function handleLogout() {
    Swal.fire({
      title: "確定登出？",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      confirmButtonColor: "green",
      denyButtonColor: "gray",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          position: "top",
          title: "登出成功！",
          timer: 1300,
          icon: "success",
          showConfirmButton: false,
        });
        go("/login");
      } else {
        return;
      }
    });
  }

  return (
    <nav
      className={`${menuToggle ? "scale-x-1" : "scale-x-0"} 
      sm:static sm:transform-none text-3xl space-y-16 shadow-lg navToggle bg-light-green sm:bg-light-gray sm:rounded-none dark:bg-slate-800`}
      onMouseEnter={() => setMenuToggle(true)}
      onMouseLeave={() => setMenuToggle(false)}
    >
      <ul className="text-dark-green dark:text-neutral-300 flex-col items-start space-y-8 ">
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/main")}
        >
          <Tooltip title="首頁" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/stock")}
        >
          <Tooltip title="股票代號搜尋" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass-dollar" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go(`/user/${userId}`)}
        >
          <Tooltip title="個人頁面" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-address-card" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/setting")}
        >
          <Tooltip title="設定" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-gear" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100 `}
          onClick={() => {
            setOpen(true);
            setModalOpened("post");
          }}
        >
          <Tooltip title="發文" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-pen" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 first:nav-item sm:opacity-100 `}
          onClick={() => {
            setOpen(true);
            setModalOpened("report");
          }}
        >
          <Tooltip title="報告" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-file" />
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
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
        </Tooltip>
      </div>
      <Modal open={open} setOpen={setOpen} modal={modalOpened} />
    </nav>
  );
};

export default Navbar;
