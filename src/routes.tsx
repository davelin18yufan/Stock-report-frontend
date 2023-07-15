import HomePage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import MainPage from "./pages/main";
import StockPage from "./pages/stock";
import SingleStockPage from "./pages/stock/singleStock";
import Setting from "./pages/setting";
import Admin from "./pages/admin";
import UserPage from "./pages/user";
import { Activities } from "./pages/admin/list";
import { UserList } from "./pages/admin/users";
import type { RouteObject } from "react-router-dom";
import AllStocks from "pages/stock/stockList";

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
    path: "/setting",
    element: <Setting />,
    children: [],
  },
  {
    path: "/main",
    element: <MainPage />,
    children: [],
  },
  {
    path: "/stock",
    element: <StockPage />,
    children: [
      {
        path: "/stock/:symbol",
        element: <SingleStockPage />,
        children: [],
      },
      {
        path: "/stock",
        element: <AllStocks />,
        children: [],
      },
    ],
  },
  {
    path: "/user/:userId",
    element: <UserPage />,
    children: [],
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
