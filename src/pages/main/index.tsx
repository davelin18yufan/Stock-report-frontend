import { Navigate, Outlet, useLocation } from "react-router-dom"
import {
  MainContainer,
  ScrollToTopBtn,
  Footer,
  Header,
  Navbar,
} from "components"

const MainPage = () => {
  const token = localStorage.getItem("authToken")
  const location = useLocation()
  return (
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row ">
        <Navbar />
        {token ? (
          <Outlet />
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )}
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
  )
}

export default MainPage
