import { PostSide, PostCard, ReportCard, ReportSide, DefaultSide } from "../../components/Card"
import { getPosts, getSinglePost } from "../../apis/post"
import { getReports, getSingleReport } from "../../apis/report"
import { useEffect, useState } from "react"
import { useMainContext } from "../../contexts/MainContext"

export const Tab = ({post, report}) => {
  const { setCurrentTab } = useMainContext()
  function handleTabClick(tab){
    if(tab === "post"){
      setCurrentTab("post")
    }else{
      setCurrentTab("report")
    }
  }
  return(
    <div className="flex p-2 text-gray-500 border-b-2 dark:border-b-slate-300/50">
      <button className="border-b-2 border-gray-400/50 focus:text-black  focus:border-black dark:focus:text-white dark:focus:border-white" autoFocus onClick={() => handleTabClick("post")}>{post}</button>
      <button className="border-b-2 ml-3 focus:text-black border-gray-400/50 focus-border-black dark:focus:text-white dark:focus:border-white" onClick={() => handleTabClick("report")}>{report}</button>
    </div>
  )
}

export const MainSector = () => {
  const { posts, setPosts, reports, setReports, currentTab } = useMainContext()
  
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
      <Tab post="最新貼文" report="最新報告"/>
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
    </main>
  )
}

export const Side = () => {
  const [ post, setPost ] = useState(null)
  const [ report, setReport ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const { postCardId, reportCardId, currentTab } = useMainContext()

  // 確保它們只有在有值時為 true，沒有值時為 false。
  const hasPostCardClicked = !!postCardId
  const hasReportCardClicked = !!reportCardId 

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
      setIsLoading(false)
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
      setIsLoading(false)
    }
    if(currentTab === "post" && hasPostCardClicked){ // 被點擊了再拿資料
      getPostAsync()
    }
    if(currentTab === "report" && hasReportCardClicked){
      getSingleReportAsync()
    }
  }, [reportCardId, postCardId, currentTab, hasPostCardClicked, hasReportCardClicked])

  // 沒被點擊先渲染預設畫面
  if((currentTab === "post" && !hasPostCardClicked) || (currentTab === "report" && !hasReportCardClicked)){
    return (
      <aside className="basis-2/5 grow border-x-2 dark:bg-slate-800 dark:border-slate-300/25 w-full h-screen ">
        <DefaultSide /> 
      </aside>
      )
  }
  return (
    <aside className="basis-2/5 grow border-x-2 dark:bg-slate-800 dark:border-slate-300/25 scroll-smooth w-full h-screen overflow-y-auto" id="side">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-green"></div>
        </div>
      ) : (
        <>
          {currentTab === "post" && post && <PostSide post={post} />}
          {currentTab === "report" && report && <ReportSide report={report} />}
        </>
      )}
    </aside>
  )
}