import { MainContainer } from "../../components/MainContainer"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import ScrollToTopBtn from "../../components/ScrollToTopBtn"
import { Side } from "../main/component"
import { PostCard, ReportCard } from "../../components/Card"
import { useMainContext } from "../../contexts/MainContext"
import { Tab } from "../main/component"
import { getUserPosts, getUserReports, getUserInfo } from "../../apis/user"
import { useEffect, useState } from "react"

const MainSector = () => {
  const { posts, setPosts, reports, setReports, currentTab } = useMainContext()
  const userId = localStorage.getItem("userId")
  const [ user, setUser ] = useState({})
 
 useEffect(() => {
  async function getUserAsync(){
    try{
        const { data } = await getUserInfo(userId)
        if(data){
          setUser(data)
        }
      }catch(err){
        console.log(err)
      }
  }
    
    async function getPostsAsync() {
      try{
        const { data } = await getUserPosts(userId)
        if(data){
          setPosts(data)
        }
      }catch(err){
        console.log(err)
      }
    }
    async function getReportsAsync(){
      try{
        const { data } = await getUserReports(userId)
        if(data){
          setReports(data)
        }
      }catch(err){
        console.log(err)
      }
    }
    getUserAsync()
    getPostsAsync()
    getReportsAsync()
  }, [setPosts, setReports, userId])

  return(
    <div className="basis-4/5 h-screen overflow-y-auto flex flex-col items-center space-y-4">
      <div className="w-full aspect-square mt-4 sm:flex relative outline outline-2 outline-transparent duration-500 cover" >
        <img src="https://loremflickr.com/500/400/nature" alt="cover" className=" absolute w-full h-full z-[-1] object-cover duration-500"/>
        <div className="w-max mx-auto">
          <img 
            src={user?.avatar} alt={user?.name} 
            className="w-40 h-40 rounded-full object-cover" />
          <h3 className="mb-2 text-center font-bold text-2xl text-dark-green mt-3 rounded-lg shadow-lg outline outline-2 outline-transparent hover:outline-gray-600 hover:outline-offset-6 bg-slate-300/30 dark:text-amber-400 ">{user?.name}</h3>
        </div>
        <div className="w-max mt-4 py-2 px-4 sm:pt-8 text-slate-300 mx-auto opacity-20 duration-500 ">
          <p>加入日期 : <span className="userInfo">{user?.createdAt}</span></p>
          <p>已發佈貼文數 : <span className="userInfo">{user?.posts_count}</span></p>
          <p>已發佈報告數 : <span className="userInfo">{user?.reports_count}</span></p>
          <p>發文被收藏數 : <span className="userInfo">5</span></p>
        </div>
      </div>
      <div className="w-full ">
        <Tab post="已發佈貼文" report="已上傳報告"/>
        <div className="w-full h-screen  overflow-y-auto">
          {currentTab === "post" && (posts.map(item => {
            return(
              <PostCard 
                post={item}
                key={item.id}
              />
            )
          }))}
          {currentTab === "report" && (reports.map(item => {
            return(
              <ReportCard 
                report={item}
                key={item.id}
                userName={item.user_name}
                stockName={item.stock_name}
              />
            )
          }))}
        </div>
      </div>
    </div>
  )
}

const UserPage = () => {
  return(
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row  dark:bg-slate-800 ">
        <Navbar />
        <div className="lg:flex dark:bg-slate-800 dark:z-0 dark:text-neutral-300 grow">
          <MainSector />
          <Side currentTab="post"/>
        </div>
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
  )
}

export default UserPage