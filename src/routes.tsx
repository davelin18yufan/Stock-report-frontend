import HomePage from "pages/home";
import Login from "pages/login";
import Register from "pages/register";
import MainPage from "pages/main";
import SingleStockPage from "pages/main/stock/singleStock";
import Setting from "pages/main/setting";
import Admin from "pages/admin";
import UserPage from "pages/main/user";
import FrontPage from "pages/main/frontPage";
import { Activities } from "pages/admin/list";
import { UserList } from "pages/admin/users";
import type { RouteObject } from "react-router-dom";
import AllStocks from "pages/main/stock/stockList";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
  {
    path: "/register",
    element: <Register />,
    children: [],
  },
  {
    path: "/main",
    element: <MainPage />,
    children: [
      {
        path: "/main",
        element: <FrontPage />,
        children: [],
      },
      {
        path: "/main/setting",
        element: <Setting />,
        children: [],
      },
      {
        path: "/main/user/:userId",
        element: <UserPage />,
        children: [],
      },
      {
        path: "/main/stock/:symbol",
        element: <SingleStockPage />,
        children: [],
      },
      {
        path: "/main/stock",
        element: <AllStocks />,
        children: [],
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/list",
        element: <Activities />,
        children: [],
      },
      {
        path: "/admin/users",
        element: <UserList />,
        children: [],
      },
    ],
  },
  {
    path: "*",
    element: <HomePage />,
    children: [],
  },
];

export default routes;
