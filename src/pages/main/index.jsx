import {
  MainContainer,
  ScrollToTopBtn,
  Footer,
  Header,
  Navbar,
  Side,
} from "../../components";
import { MainSector } from "./element";

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
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
  );
};

export default MainPage;
