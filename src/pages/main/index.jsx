import { MainContainer, ScrollToTopBtn, Footer, Header, Navbar } from "../../components"
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