import { MainContainer, Footer, Header } from "../../../components"
import AdminNavbar from "../AdminSidebar"
import { MainSector } from "./element"

const AdminList = () => {
  return (
    <MainContainer>
      <Header  />
      <div className="h-screen flex flex-col sm:flex-row overflow-y-auto dark:bg-slate-800 ">
        <AdminNavbar />
        <MainSector />
      </div>
      <Footer />
    </MainContainer>
  )
}

export default AdminList