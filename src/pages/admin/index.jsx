import { Outlet } from "react-router-dom";
import { MainContainer, Footer, Header } from "../../components";
import AdminNavbar from "./AdminSidebar";

const Admin = () => {
  return (
    <MainContainer>
      <Header />
      <div className="h-screen flex flex-col sm:flex-row overflow-y-auto dark:bg-slate-800 ">
        <AdminNavbar />
        <Outlet />
      </div>
      <Footer />
    </MainContainer>
  );
};

export default Admin;
