import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMainContext } from '../contexts/MainContext'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { favoritePost, cancelFavoritePost } from '../apis/post'
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

export const PostCard = ({post, isFavorite}) => {
  const { setPostCardId } = useMainContext()
  const [ favorite, setFavorite ] = useState(isFavorite)

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

export const TargetCard = ({target}) => {
  return(
      <div className="flex items-center border-2 rounded-full pl-2 text-rose-900" >
        <FontAwesomeIcon icon="fa-solid fa-bullseye" />
        <p className="px-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{target}</p>
      </div>    
  )
}

export const ReportCard = ({report, userName, stockName}) => {
  const { setReportCardId } = useMainContext()
  useEffect(() => {
    return () => {
      setReportCardId(null) // 離開頁面時設為 null
    };
  }, [setReportCardId])
  // 拿到的時間去掉尾巴時分
  const uploadDate = getDateTransform(report.createdAt).substring(0, getDateTransform(report.createdAt).indexOf("·")).trim()
  return (
    <a className={`flex pl-6 pr-8 py-3 h-[160px] sm:h-[190px] bg-card dark:bg-slate-800 shadow`} href="#side"
      onClick={() => setReportCardId(report.id)}>
      <div className="ml-2 flow-root ">
        <h2 className="font-bold text-lg dark:text-neutral-300 line-clamp-1">{report.title}</h2>
        <div className="flex space-x-8 pt-2 sm:space-x-28">
          <ul className="pl-4 font-normal list-disc text-sm text-[#6C757D] dark:text-amber-200">
            <li>上傳者： {userName}</li>
            <li>上傳日期： {uploadDate}</li>
            <li>出版日期： {report.publish_date}</li>
            <li>出版作者： {report.from}</li>
          </ul>
          <div className="h-[100px] flex flex-col flex-wrap ">
            <TargetCard target={stockName} />
          </div>
        </div>
      </div>
    </a>
  )
}

export const ReportSide = ({report}) => {
  return (
    <div className="px-6 py-4">
      <h2 className="mb-4 font-bold text-xl dark:text-white">{report.title}</h2>
      <p className="text-[#6C757D] slashed-zero">
        {report.publish_date} 
      </p>
      <div className=" flex flex-wrap py-2">
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