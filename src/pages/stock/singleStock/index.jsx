import { MainContainer } from "../../../components/MainContainer"
import Footer from "../../../components/Footer"
import Header from "../../../components/Header"
import Navbar from "../../../components/Navbar"
import { MainContextProvider } from "../../../contexts/AuthContext"
import { ReportCard } from "../../../components/Card"
import { Side } from "../../main/component"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"


const MainSector = () => {
  const go = useNavigate()
  return (
    <main className="border-x-2 border-gray-500 basis-3/5">
      <div className="w-full h-screen overflow-y-auto ">
        <div className="w-full bg-light-gray px-4 py-2">
          <div className="w-fit cursor-pointer hover:opacity-70" onClick={() => go("/stock")}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            <span className="ml-2">回到搜尋頁面</span>
          </div>
        </div>
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
      </div>
    </main>
  )
}

const SingleStockPage = () => {
  return (
    <MainContextProvider>
      <MainContainer>
        <Header />
        <div className="h-full flex flex-col sm:flex-row ">
          <Navbar />
          <div className="lg:flex">
            <MainSector />
            <Side />
          </div>
        </div>
        <Footer />
      </MainContainer>
    </MainContextProvider>
  )
}

export default SingleStockPage