import { MainContainer, Footer, Header, Navbar, ScrollToTopBtn } from "../../components"
import { MainSector } from "./element"


const StockPage = () => {
  return(
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row  dark:bg-slate-800 ">
        <Navbar />
        <MainSector />
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
)
}

export default StockPage