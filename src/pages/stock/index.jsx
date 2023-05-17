import { MainContainer } from "../../components/MainContainer"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import { MainContextProvider } from "../../contexts/AuthContext"

const StockPage = () => {
  return(
    <MainContextProvider>
      <MainContainer>
        <Header />
        <div className="h-full flex flex-col sm:flex-row ">
          <Navbar />
        </div>
        <Footer />
      </MainContainer>
    </MainContextProvider>
  )
}

export default StockPage