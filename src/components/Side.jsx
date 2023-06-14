import { UserImage, TargetCard } from "./Card"
import { getDateTransform } from "../utilities/date"
import { getSinglePost, getSingleReport } from "../apis"
import { useState, useEffect } from "react"
import { useMainContext } from "../contexts/MainContext"


export const PostSide = ({post}) => {
  
  return(
    <div className="w-full">
      <div className="flex pl-6 pr-8 py-2">
        <UserImage user={post.User.name} avatar={post.User.avatar}/>
        <div className="ml-2 flow-root ">
          <p>{post.User.name}</p>
          <p className="text-[#6C757D] slashed-zero">
            {getDateTransform(post.updatedAt)} &#9786;
          </p>
        </div>
      </div>
      <div className="px-6 pb-4">
        <h3 className="font-bold text-xl dark:text-white">{post.title}</h3>
        {
          post.image ?
            <img 
            src={post.image} 
            alt="post" 
            className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-contain my-3 mx-auto"/>
          :
          null
        }
        <p className="antialiased font-sans w-full whitespace-pre-line">{post.post}</p>
      </div>
    </div>
  )
}

export const ReportSide = ({report}) => {
  return (
    <div className="px-6 py-4">
      <h2 className="mb-4 font-bold text-xl dark:text-white">{report.title}</h2>
      <p className="text-[#6C757D] slashed-zero">
        {report.publish_date} 
      </p>
      <div className="flex flex-wrap py-2 gap-1">
        <TargetCard target={report.Stock.name} />
      </div>
      <div className="mt-4">
        <p className="antialiased font-sans leading-6 text-[#333333] dark:text-neutral-300 whitespace-pre-line">{report.report}</p>
      </div>
    </div>
  )
}

export const DefaultSide = () => {
  return(
    <div className="rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded w-12"></div>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
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
  if((currentTab === "post" && !hasPostCardClicked) || (currentTab === "report" && !hasReportCardClicked) || (currentTab === "favorite" && !hasPostCardClicked)){
    return (
      <aside className="basis-2/5 grow border-x-2 dark:bg-slate-800 dark:border-slate-300/25 w-full h-screen ">
        <DefaultSide /> 
      </aside>
      )
  }
  return (
    <aside className="basis-2/5 grow border-x-2 dark:bg-slate-800 dark:border-slate-300/25 scroll-smooth w-full h-screen overflow-y-auto scrollbar-y" id="side">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-green"></div>
        </div>
      ) : (
        <>
          {
            currentTab === "report" ? (
              report && <ReportSide report={report} />
              ) : (
              post && <PostSide post={post} />)
          }
        </>
      )}
    </aside>
  )
}