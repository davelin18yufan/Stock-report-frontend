import HomePage from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import MainPage from "./pages/main"

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
    // {
    //     path: "/setting",
    //     element: <Setting />,
    //     children: []
    // },
    {
        path: "/main",
        element: <MainPage />,
        children: []
    },
    // {
    //     path: "/user",
    //     element: <User />,
    //     children: []
    // },
    // {
    //     path: "/admin/home",
    //     element: <AdminHome />,
    //     children: []
    // },
    // {
    //     path: "/admin/login",
    //     element: <AdminLogin />,
    //     children: []
    // },
    // {
    //     path: "/admin/users",
    //     element: <AdminUser />,
    //     children: []
    // }
]

export default routes
