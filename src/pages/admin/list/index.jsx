import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import { MainContainer } from "../../../components/MainContainer"
import { MainContextProvider } from "../../../contexts/AuthContext"
import AdminNavbar from "../AdminSidebar"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostList = () => {
  return (
    <div className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col dark:bg-slate-800 dark:text-neutral-300">
      <div className="flex flex-row mb-[5px] items-center">
        <div
            className="w-[50px] h-[50px] overflow-hidden rounded-full min-w-[50px] mr-[8px] bg-random"
            style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        />
        <div className="flex flex-row items-center gap-[8px]">
          <p className="font-bold text-[16px] leading-[26px] dark:text-gray-200">dave</p>
          <p className="text-[#6C757D] text-[14px] leading-[22px] font-[400]">@davelin</p>
          <div className="w-[4px] h-[4px] rounded-full bg-[#6C757D]"></div>
          <p className="text-[#6C757D] text-[14px] leading-[22px] font-[400]">2023/05/19</p>
        </div>
        <div 
          className="ml-auto cursor-pointer"
          // onClick={() => id !== undefined && onDelete?.(id)}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />  
        </div>
      </div>
      <div className="font-[400] text-[16px] leading-[26px] pl-[56px] ">
        偉大的投資者，首先管理「風險」。大多數投資者都盯著「回報」，但很少有人關注風險，想想他們可能虧多少。貪婪蒙蔽了人們的雙眼，短暫的狂歡後，往往是無底深淵。有錢該怎麼玩，是一門很講究的學問，下面是媒體盤點的 10 位世界級投資大師的100句投資心得，也是100句金句良言。從中我們或許不能學到多少投資方法和手段，但總會有那麼幾句會觸動我們的投資神經，指引我們投資的方向。
      </div>
    </div>
  )
}

const ReportList = () => {
  return(
    <div className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col dark:bg-slate-800 dark:text-neutral-300">
      <div className="flex flex-row mb-[5px] items-center">
        <div className="flex flex-row items-center gap-[8px]">
          <p className="font-bold text-[20px] leading-[20px] truncate">101句投資金句 來自10 位世界頂尖投資家的財富箴言</p>
          <div className="ml-2 flex  pt-2 flex-wrap sm:flex-nowrap space-x-4">
            <ul className="pl-2 font-normal list-disc text-sm text-[#6C757D] dark:text-amber-200">
              <li>上傳者： Dave</li>
              <li>上傳日期： 2023/05/16</li>
            </ul>
            <ul className="font-normal list-disc text-sm text-[#6C757D] dark:text-amber-200">
              <li>出版日期： 2023/05/16</li>
              <li>出版作者： 兆豐投顧</li>
            </ul>
          </div>
        </div>
        <div 
          className="ml-auto cursor-pointer"
          // onClick={() => id !== undefined && onDelete?.(id)}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />  
        </div>
      </div>
      <div className="font-[400] text-[16px] leading-[26px] line-clamp-1 sm:line-clamp-2 ">
        偉大的投資者，首先管理「風險」。大多數投資者都盯著「回報」，但很少有人關注風險，想想他們可能虧多少。貪婪蒙蔽了人們的雙眼，短暫的狂歡後，往往是無底深淵。有錢該怎麼玩，是一門很講究的學問，下面是媒體盤點的 10 位世界級投資大師的100句投資心得，也是100句金句良言。從中我們或許不能學到多少投資方法和手段，但總會有那麼幾句會觸動我們的投資神經，指引我們投資的方向。
      </div>
    </div>
  )
}


const AdminList = () => {
  const [currentTab, setCurrentTab] = useState("post")

  return (
    <MainContextProvider>
      <MainContainer>
        <Header  />
        <div className="h-screen flex flex-col sm:flex-row overflow-y-auto dark:bg-slate-800">
          <AdminNavbar />
          <div className="w-full">
            <div className="flex p-2 text-gray-500 border-b-4 border-slate-400/25  dark:text-gray-500 dark:border-slate-300/80">
              <button className="border-b-2 border-gray-500 focus:text-black focus:border-black dark:focus:text-white dark:focus:border-white" autoFocus onClick={() => setCurrentTab("post")}>貼文清單</button>
              <button className="border-b-2 ml-3 border-gray-500 focus:text-black focus:border-black dark:focus:text-white dark:focus:border-white" onClick={() => setCurrentTab("report")}>報告清單</button>
            </div>
            <div >
              {currentTab ==="post" ? <PostList /> : <ReportList />}
              {currentTab ==="post" ? <PostList /> : <ReportList />}
              {currentTab ==="post" ? <PostList /> : <ReportList />}
            </div>
          </div>
        </div>
        <Footer />
      </MainContainer>
    </MainContextProvider>
  )
}

export default AdminList