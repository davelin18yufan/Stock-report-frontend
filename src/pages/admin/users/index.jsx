import { MainContainer, Footer, Header } from "../../../components"
import AdminNavbar from "../AdminSidebar"
import { UserList } from "./element"

const AdminUser = () => {
  return (
    <MainContainer>
      <Header  />
      <div className="h-full flex flex-col sm:flex-row ">
        <AdminNavbar />
        <UserList />
      </div>
      <Footer />
    </MainContainer>
  )
}

export default AdminUser