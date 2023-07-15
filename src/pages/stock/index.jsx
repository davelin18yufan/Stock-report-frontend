import { Outlet } from "react-router-dom";
import {
  MainContainer,
  Footer,
  Header,
  Navbar,
  ScrollToTopBtn,
} from "../../components";

const StockPage = () => {
  return (
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row  dark:bg-slate-800 ">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
  );
};

export default StockPage;
