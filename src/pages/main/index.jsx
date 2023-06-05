import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ScrollToTopBtn from "../../components/ScrollToTopBtn"
import { MainContainer } from "../../components/MainContainer"
import { MainSector, Side } from "./component"

const MainPage = () => {
  
  return (
    <MainContainer>
      <Header  />
      <div className="h-full flex flex-col sm:flex-row ">
        <Navbar />
        <div className="lg:flex dark:bg-slate-800 dark:text-neutral-300 grow">
          <MainSector />
          <Side />
        </div>
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
  )
}

export default MainPage