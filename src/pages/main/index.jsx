import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { MainContainer } from "../../components/MainContainer"
import { MainSector, Side } from "./component"
import { MainContextProvider } from "../../contexts/AuthContext"
import React, { useState } from 'react'


const MainPage = () => {
  const [currentTab, setCurrentTab] = useState("post")
  return (
    <MainContextProvider>
      <MainContainer>
        <Header  />
        <div className="h-full flex flex-col sm:flex-row ">
          <Navbar />
          <div className="lg:flex dark:bg-slate-800 dark:text-neutral-300">
            <MainSector currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            <Side currentTab={currentTab}/>
          </div>
        </div>
        <Footer />
      </MainContainer>
    </MainContextProvider>
  )
}

export default MainPage