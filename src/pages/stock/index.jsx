import { MainContainer, Footer, Header, Navbar, ScrollToTopBtn } from "../../components"
import { MainSector } from "./element"
import { Outlet } from "react-router-dom"


const StockPage = () => {
  return(
    <>
      <Outlet />
      <MainContainer>
        <Header />
        <div className="h-full flex flex-col sm:flex-row  dark:bg-slate-800 ">
          <Navbar />
          <MainSector />
        </div>
        <Footer />
        <ScrollToTopBtn />
      </MainContainer>
    </>
  )
}

export default StockPage