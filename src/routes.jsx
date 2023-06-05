import HomePage from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import MainPage from "./pages/main"
import StockPage from "./pages/stock"
import SingleStockPage from "./pages/stock/singleStock"
import Setting from "./pages/setting"
import AdminLogin from "./pages/admin/login"
import AdminUser from "./pages/admin/users"
import AdminList from "./pages/admin/list"
import UserPage from "./pages/user"

const routes = [
    {
        path: "*",
        element: <HomePage />,
        children: []
    },
    {
        path: "/login",
        element: <Login />,
        children: []
    },
    {
        path: "/register",
        element: <Register />,
        children: []
    },
    {
        path: "/setting",
        element: <Setting />,
        children: []
    },
    {
        path: "/main",
        element: <MainPage />,
        children: []
    },
    {
        path: "/stock/:symbol",
        element: <SingleStockPage />,
        children: []
    },
    {
        path: "/stock",
        element: <StockPage />,
        children: []
    },
    {
        path: "/user/:userId",
        element: <UserPage />,
        children: []
    },
    {
        path: "/admin/list",
        element: <AdminList />,
        children: []
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
        children: []
    },
    {
        path: "/admin/users",
        element: <AdminUser />,
        children: []
    }
]

export default routes
