import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMainContext } from "../../contexts/MainContext";
import Tooltip from "@mui/material/Tooltip";
import { DarkModeSwitch } from "../../components";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { menuToggle, setMenuToggle, darkMode, setDarkMode } = useMainContext();
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
        go("/admin/login");
      } else {
        return;
      }
    });
  }

  return (
    <nav
      className={`${menuToggle ? "scale-x-1" : "scale-x-0"} 
      sm:static sm:transform-none text-3xl space-y-16 shadow-lg navToggle bg-light-green sm:bg-light-gray dark:bg-slate-800`}
      onMouseEnter={() => setMenuToggle(true)}
      onMouseLeave={() => setMenuToggle(false)}
    >
      <ul className="text-dark-green dark:text-neutral-300 flex-col items-start space-y-8 ">
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/admin/list")}
        >
          <Tooltip title="活動清單" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-newspaper" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
          onClick={() => go("/admin/users")}
        >
          <Tooltip title="使用者清單" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-face-grimace" />
          </Tooltip>
        </li>
        <li
          className={`${
            menuToggle ? "opacity-100" : "opacity-0"
          } hover:text-green-700 dark:hover:text-gray-500 nav-item sm:opacity-100`}
        >
          <Tooltip title="設定" placement="right">
            <FontAwesomeIcon icon="fa-solid fa-gear" />
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
    </nav>
  );
};

export default AdminNavbar;
