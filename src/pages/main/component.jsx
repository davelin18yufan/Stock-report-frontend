import { PostSide, PostCard, ReportCard, ReportSide } from "../../components/Card"
import { getPosts, getSinglePost } from "../../apis/post"
import { getReports, getSingleReport } from "../../apis/report"
import { useEffect, useState } from "react"
import { useMainContext } from "../../contexts/MainContext"

export const MainSector = ({currentTab, setCurrentTab}) => {
  const { posts, setPosts, reports, setReports } = useMainContext()
  
  async function handleTabClick(tab){
    if(tab === "post"){
      setCurrentTab("post")
    }else{
      setCurrentTab("report")
    }
  }

  useEffect(() => {
    async function getPostsAsync() {
      try{
        const { data } = await getPosts()
        if(data){
          setPosts(data)
        }
      }catch(err){
        console.log(err)
      }
    }
    async function getReportsAsync(){
      try{
        const { data } = await getReports()
        if(data){
          setReports(data)
        }
      }catch(err){
        console.log(err)
      }
    }
  
    getPostsAsync()
    getReportsAsync()
  }, [setPosts, setReports])

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 grow w-full">
      <div className="flex p-2 text-gray-500 border-b-2 dark:border-b-slate-300/50">
        <button className="border-b-2 border-gray-400/50 focus:text-black  focus:border-black dark:focus:text-white dark:focus:border-white" autoFocus onClick={() => handleTabClick("post")}>最新貼文</button>
        <button className="border-b-2 ml-3 focus:text-black border-gray-400/50 focus-border-black dark:focus:text-white dark:focus:border-white" onClick={() => handleTabClick("report")}>最新報告</button>
      </div>
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
            />
          )
        }))}
      </div>
    </main>
  )
}

export const Side = ({currentTab}) => {
  const [ post, setPost ] = useState(null)
  const [ report, setReport ] = useState(null)
  const { postCardId, reportCardId } = useMainContext()
  useEffect(() => {
    async function getPostAsync(){
      try{
        const { data } = await getSinglePost(postCardId)
        if(data){
          setPost(data)
        } 
      }catch(err){
        console.log(err)
      }
    }

    async function getSingleReportAsync(){
      try{
        const { data } = await getSingleReport(reportCardId)
        if(data){
          setReport(data)
        }
      }catch(err){
        console.log(err)
      }
    }

    getPostAsync()
    getSingleReportAsync()
  }, [reportCardId, postCardId])
  return (
    <aside className="basis-2/5 grow border-2 dark:bg-slate-800 dark:border-slate-300/25 scroll-smooth w-full h-screen overflow-y-auto" id="side">
        {currentTab === "post" && post && <PostSide post={post} /> }
        {currentTab === "report" && <ReportSide report={report} /> }
    </aside>
  )
}