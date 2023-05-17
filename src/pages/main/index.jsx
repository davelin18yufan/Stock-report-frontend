import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { MainContainer } from "../../components/MainContainer"
import { MainSector, Side } from "./component"
import React, { useState } from 'react'

const MainPage = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const [currentTab, setCurrentTab] = useState("post")

  return (
    <MainContainer>
      <Header setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
      <div className="h-full flex flex-col sm:flex-row ">
        <Navbar 
          menuToggle={menuToggle} 
          setMenuToggle={setMenuToggle}
        />
        <div className="sm:flex sm:flex-col lg:flex-row">
          <MainSector currentTab={currentTab} setCurrentTab={setCurrentTab}/>
          <Side currentTab={currentTab}/>
        </div>
      </div>
      <Footer />
    </MainContainer>
  )
}

export default MainPage