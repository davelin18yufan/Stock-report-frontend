import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTimeDiffTransForm, getUploadDate } from "utilities/date"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { setCurrentTab, setPostId, setReportId } from "slices/mainSlice"
import {
  useFavoritePostMutation,
  useDeleteFavoritePostMutation,
} from "services/postService"
import { confirmPopOut } from "utilities/confirmPopOut"

export const UserImage = ({ user, avatar, userId }) => {
  const go = useNavigate()
  return (
    <img
      src={avatar}
      alt={user}
      className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer{"
      onClick={(e) => {
        e.stopPropagation()
        go(`/main/user/${userId}`)
      }}
    />
  )
}

export const Tab = ({ post, report }) => {
  const currentTab = useAppSelector((state) => state.mainPageReducer.currentTab)
  const dispatch = useAppDispatch()

  return (
    <div className="flex p-2 text-gray-500 border-b-2 dark:border-b-slate-300/50">
      <button
        className="border-b-2 border-gray-400/50 focus:text-black  focus:border-black dark:focus:text-white dark:focus:border-white"
        autoFocus={currentTab === "post"}
        onClick={() => dispatch(setCurrentTab("post"))}
      >
        {post}
      </button>
      <button
        className="border-b-2 ml-3 focus:text-black border-gray-400/50 focus:border-black dark:focus:text-white dark:focus:border-white"
        onClick={() => dispatch(setCurrentTab("report"))}
      >
        {report}
      </button>
    </div>
  )
}

export const PostCard = memo(
  ({ post, isFavorite, onDelete }) => {
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)
    const dispatch = useAppDispatch()
    const userId = Number(localStorage.getItem("userId"))
    const [favoritePost] = useFavoritePostMutation()
    const [cancelFavorite] = useDeleteFavoritePostMutation()

    async function handleFavorite(e) {
      e.stopPropagation()
      const { data, error } = await favoritePost(post.id)
      if (data) {
        return setIsFavoriteState(true)
      } else if (error) {
        confirmPopOut(error?.data.message, false)
      }
    }

    async function handleCancelFavorite(e) {
      e.stopPropagation()
      const { data, error } = await cancelFavorite(post.id)
      if (data) {
        return setIsFavoriteState(false)
      } else if (error) {
        confirmPopOut(error?.data.message, false)
      }
    }

    // 如果 isFavorite prop 有變動，同步更新 isFavoriteState 狀態
    useEffect(() => {
      setIsFavoriteState(isFavorite)
    }, [isFavorite])

    useEffect(() => {
      return () => {
        dispatch(setPostId(null)) // 離開頁面時設為 null
      }
    }, [dispatch])
    return (
      <a
        className="flex pl-6 pr-8 py-3 h-[110px] sm:h-[140px] bg-card dark:bg-slate-800 shadow"
        href="#side"
        onClick={() => dispatch(setPostId(post.id))}
      >
        <UserImage
          user={post.User?.name}
          avatar={post.User?.avatar}
          userId={post.User?.id}
        />
        <div className="ml-2 flow-root ">
          <div className="">
            <p>
              {post.User?.name}
              <span className="text-[14px] text-[#6C757D] ml-2">
                &#8729; {getTimeDiffTransForm(post.updatedAt)}
              </span>
            </p>
            <h4 className="font-bold text-lg dark:text-white">{post.title}</h4>
            <p className="leading-[26px] text-md line-clamp-1 sm:line-clamp-2">
              {post.post}
            </p>
          </div>
          {userId === post.User?.id ? (
            <div
              className="absolute top-2 right-7 cursor-pointer"
              onClick={(e) => onDelete(e, post.id)}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          ) : null}
          {isFavoriteState ? (
            <div
              className="absolute right-2 top-2 "
              onClick={handleCancelFavorite}
            >
              <FontAwesomeIcon icon="fa-solid fa-bookmark" />
            </div>
          ) : (
            <div className="absolute right-2 top-2 " onClick={handleFavorite}>
              <FontAwesomeIcon icon="fa-regular fa-bookmark" />
            </div>
          )}
        </div>
      </a>
    )
  }
)

export const TargetCard = ({ target, symbol }) => {
  const go = useNavigate()
  return (
    <div
      className="max-x-[100px] flex items-center border-2 rounded-full pl-2 text-rose-900"
      onClick={() => go(`/stock/${symbol}`)}
    >
      <FontAwesomeIcon icon="fa-solid fa-bullseye" />
      <p className="px-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 truncate">
        {target}
      </p>
    </div>
  )
}

export const ReportCard = ({ report, onDelete }) => {
  const userId = Number(localStorage.getItem("userId"))
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(setReportId(null)) // 離開頁面時設為 null
    }
  }, [dispatch])

  return (
    <a
      className={`flex pl-6 pr-8 py-3 h-[160px] sm:h-[200px] bg-card dark:bg-slate-800 shadow`}
      href="#side"
      onClick={() => dispatch(setReportId(report.id))}
    >
      <div className="w-full ml-2">
        <h2 className="font-bold text-lg dark:text-neutral-300 line-clamp-1">
          {report.title}
        </h2>
        <div className="flex space-x-4 pt-2 ">
          <ul className="basis-3/5 pl-4 font-normal list-disc text-sm text-[#6C757D] break-normal dark:text-amber-200">
            <li>上傳者： {report.User?.name}</li>
            <li>上傳日期： {getUploadDate(report.createdAt)}</li>
            <li>出版日期： {report.publish_date}</li>
            <li>出版作者： {report.from}</li>
          </ul>
          <div className="h-[120px] flex flex-col gap-1 flex-wrap ">
            <TargetCard
              target={report.Stock?.name}
              symbol={report.Stock?.symbol}
            />
          </div>
          {userId === report.userId ? (
            <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={(e) => onDelete(e, report.id)}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </div>
          ) : null}
        </div>
      </div>
    </a>
  )
}
