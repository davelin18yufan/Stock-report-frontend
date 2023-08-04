import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faXmark,
  faBullseye,
  faBookmark as faBookMarkSolid,
} from "@fortawesome/free-solid-svg-icons"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import React, { useEffect, memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTimeDiffTransForm, getUploadDate } from "utilities/date"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { setCurrentTab, setPostId, setReportId } from "slices/mainSlice"
import {
  useFavoritePostMutation,
  useDeleteFavoritePostMutation,
} from "services/postService"
import { confirmPopOut } from "utilities/confirmPopOut"
import { Post, Report } from "types/user"

export const UserImage = ({
  user,
  avatar,
  userId,
}: {
  user?: string
  avatar?: string
  userId?: number
}) => {
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

export const Tab = ({ post, report }: { post: string; report: string }) => {
  const currentTab = useAppSelector(
    (state) => state.mainPageReducer.currentTab
  ) as string
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
  ({
    post,
    isFavorite,
    onDelete,
  }: {
    post: Post
    isFavorite?: boolean
    onDelete: (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      id: number
    ) => void
  }) => {
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)
    const dispatch = useAppDispatch()
    const userId = Number(localStorage.getItem("userId"))
    const [favoritePost] = useFavoritePostMutation()
    const [cancelFavorite] = useDeleteFavoritePostMutation()

    async function handleFavorite(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      favoritePost(post.id)
        .unwrap()
        .then(() => setIsFavoriteState(true))
        .catch((err) => confirmPopOut(err?.data?.message, false))
    }

    async function handleCancelFavorite(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      cancelFavorite(post.id)
        .unwrap()
        .then(() => setIsFavoriteState(false))
        .catch((err) => confirmPopOut(err?.data.message, false))
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
                &#8729;{" "}
                {typeof post.updatedAt === "string"
                  ? getTimeDiffTransForm(post.updatedAt)
                  : ""}
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
              <FontAwesomeIcon icon={faXmark} />
            </div>
          ) : null}
          {isFavoriteState ? (
            <div
              className="absolute right-2 top-2 "
              onClick={handleCancelFavorite}
            >
              <FontAwesomeIcon icon={faBookMarkSolid} />
            </div>
          ) : (
            <div className="absolute right-2 top-2 " onClick={handleFavorite}>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          )}
        </div>
      </a>
    )
  }
)

export const TargetCard = ({
  target,
  symbol,
}: {
  target?: string
  symbol?: number
}) => {
  const go = useNavigate()
  return (
    <div
      className="max-x-[100px] flex items-center border-2 rounded-full pl-2 text-rose-900"
      onClick={() => go(`/main/stock/${symbol}`)}
    >
      <FontAwesomeIcon icon={faBullseye} />
      <p className="px-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 truncate">
        {target}
      </p>
    </div>
  )
}

export const ReportCard = ({
  report,
  onDelete,
}: {
  report?: Report
  onDelete?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void
}) => {
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
      onClick={() => {
        if (report) dispatch(setReportId(report?.id))
      }}
    >
      <div className="w-full ml-2">
        <h2 className="font-bold text-lg dark:text-neutral-300 line-clamp-1">
          {report?.title}
        </h2>
        <div className="flex space-x-4 pt-2 ">
          <ul className="basis-3/5 pl-4 font-normal list-disc text-sm text-[#6C757D] break-normal dark:text-amber-200">
            <li>上傳者： {report?.User?.name}</li>
            <li>上傳日期： {getUploadDate(report?.createdAt)}</li>
            <li>出版日期： {report?.publish_date}</li>
            <li>出版作者： {report?.from}</li>
          </ul>
          <div className="h-[120px] flex flex-col gap-1 flex-wrap ">
            <TargetCard
              target={report?.Stock?.name}
              symbol={report?.Stock?.symbol}
            />
          </div>
          {userId === report?.userId ? (
            <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={(e) => onDelete?.(e, report?.id)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          ) : null}
        </div>
      </div>
    </a>
  )
}
