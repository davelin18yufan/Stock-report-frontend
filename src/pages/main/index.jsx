import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { PostSide, PostCard, ReportCard, ReportSide } from "../../components/Card"
import React, { useState } from 'react'

const MainSector = ({currentTab, setCurrentTab}) => {

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 ">
      <div className="flex p-2 text-gray-500 border-y-2">
        <button className="border-b-2 focus:text-black focus:border-black" autoFocus onClick={() => setCurrentTab("post")}>最新貼文</button>
        <button className="border-b-2 ml-3 focus:text-black focus:border-black" onClick={() => setCurrentTab("report")}>最新報告</button>
      </div>
      <div className="w-full h-screen  overflow-y-auto">
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
      </div>
    </main>
  )
}

const Side = ({currentTab}) => {
  return (
    <aside className="basis-2/5 border-2 bg-[#FAFAFB] scroll-smooth" id="side">
      {currentTab==="post" ? <PostSide /> : <ReportSide />}
    </aside>
  )
}

const MainContainer = ({children}) => {
  return(
    <div className="mx-auto xl:container">
      {children}
    </div>
  )
}

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