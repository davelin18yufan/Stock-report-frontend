import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMainContext } from '../contexts/MainContext'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { favoritePost, cancelFavoritePost } from '../apis'
import { getTimeDiffTransForm, getDateTransform } from "../utilities/date"

export const UserImage = ({user, avatar, userId}) => {
  const go = useNavigate()
  return (
    <img 
      src={avatar} alt={user} 
      className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer{"
      onClick={(e) => {
        e.stopPropagation()
        go(`/user/${userId}`)}}
    />
  )
}

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

export const PostCard = ({post, isFavorite, onDelete}) => {
  const { setPostCardId } = useMainContext()
  const [ favorite, setFavorite ] = useState(isFavorite)
  const userId = localStorage.getItem("userId")

  async function handleFavorite(e){
    e.stopPropagation()
    const { success, message } = await favoritePost(post.id)
    if (success) {
      setFavorite(true)
    }else{
      console.log(message)
    }
  }

  async function handleCancelFavorite(e){
    e.stopPropagation()
    const { success, message } = await cancelFavoritePost(post.id)
    if (success) {
      setFavorite(false)
    }else{
      console.log(message)
    }
  }

  useEffect(() => {
    return () => {
      setPostCardId(null) // 離開頁面時設為 null
    }
  }, [setPostCardId])
  return(
    <a 
      className="flex pl-6 pr-8 py-3 h-[110px] sm:h-[140px] bg-card dark:bg-slate-800 shadow" 
      href="#side" 
      onClick={() => setPostCardId(post.id)}>
      <UserImage user={post.User?.name} avatar={post.User?.avatar} userId={post.User?.id}/>
      <div className="ml-2 flow-root ">
        <div className="">
          <p>{post.User?.name}
            <span className="text-[14px] text-[#6C757D] ml-2">
              &#8729; {getTimeDiffTransForm(post.updatedAt)}
            </span>
          </p>
          <h4 className="font-bold text-lg dark:text-white">{post.title}</h4>
          <p className="leading-[26px] text-md line-clamp-1 sm:line-clamp-2">{post.post}</p>
        </div>
        {
          Number(userId) === post.User?.id ?
            <div 
              className="absolute top-2 right-7 cursor-pointer"
              onClick={(e) => onDelete?.(e,post.id)} >
              <FontAwesomeIcon icon="fa-solid fa-xmark" /> 
            </div>
            :
            null
        }
        {favorite ? 
          <div className="absolute right-2 top-2 " onClick={handleCancelFavorite}>
            <FontAwesomeIcon icon="fa-solid fa-bookmark" />
          </div>
          :
          <div className="absolute right-2 top-2 " onClick={handleFavorite}>
            <FontAwesomeIcon icon="fa-regular fa-bookmark" /> 
          </div>
        }
      </div>
    </a>
  )
}


export const TargetCard = ({target, symbol}) => {
  const go = useNavigate()
  return(
      <div className="max-x-[100px] flex items-center border-2 rounded-full pl-2 text-rose-900" 
        onClick={() => go(`/stock/${symbol}`)}>
        <FontAwesomeIcon icon="fa-solid fa-bullseye" />
        <p className="px-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 truncate">{target}</p>
      </div>    
  )
}

export const ReportCard = ({report, onDelete}) => {
  const { setReportCardId } = useMainContext()
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    return () => {
      setReportCardId(null) // 離開頁面時設為 null
    };
  }, [setReportCardId])
  // 拿到的時間去掉尾巴時分
  const uploadDate = getDateTransform(report.createdAt).substring(0, getDateTransform(report.createdAt).indexOf("·")).trim()
  return (
    <a className={`flex pl-6 pr-8 py-3 h-[160px] sm:h-[200px] bg-card dark:bg-slate-800 shadow`} href="#side"
      onClick={() => setReportCardId(report.id)}>
      <div className="w-full ml-2">
        <h2 className="font-bold text-lg dark:text-neutral-300 line-clamp-1">{report.title}</h2>
        <div className="flex space-x-4 pt-2 ">
          <ul className="basis-3/5 pl-4 font-normal list-disc text-sm text-[#6C757D] break-normal dark:text-amber-200">
            <li>上傳者： {report.User?.name}</li>
            <li>上傳日期： {uploadDate}</li>
            <li>出版日期： {report.publish_date}</li>
            <li>出版作者： {report.from}</li>
          </ul>
          <div className="h-[120px] flex flex-col gap-1 flex-wrap ">
            <TargetCard target={report.Stock?.name} symbol={report.Stock?.symbol}/>
          </div>
          {
            Number(userId) === report.userId ?
              <div 
                className="absolute top-2 right-3 cursor-pointer"
                onClick={(e) => onDelete?.(e,report.id)} >
                <FontAwesomeIcon icon="fa-solid fa-xmark" /> 
              </div>
              :
              null
          }
        </div>
      </div>
    </a>
  )
}
