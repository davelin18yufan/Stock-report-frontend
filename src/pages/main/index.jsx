import { Outlet } from "react-router-dom";
import {
  MainContainer,
  ScrollToTopBtn,
  Footer,
  Header,
  Navbar,
} from "../../components";

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row ">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
  );
};

export default MainPage;
