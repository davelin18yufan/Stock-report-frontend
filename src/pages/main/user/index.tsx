import { PostCard, ReportCard, Side, Tab, Loading } from "components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { setCurrentTab } from "slices/mainSlice"
import { getUploadDate } from "utilities/date"
import {
  useGetUserPostsQuery,
  useGetUserReportsQuery,
} from "services/userService"
import {
  useDeletePostMutation,
  useGetUserFavoritesQuery,
} from "services/postService"
import { useDeleteReportMutation } from "services/reportService"
import { confirmPopOut } from "utilities/confirmPopOut"

const UserPostList = ({
  onDelete,
  userId,
}: {
  onDelete: (e: React.MouseEvent<HTMLDivElement>, id: number) => Promise<void>
  userId?: string
}) => {
  const currentUserId = Number(localStorage.getItem("userId"))
  const {
    data: allPosts,
    error,
    isLoading,
  } = useGetUserPostsQuery(Number(userId))
  const { data: userInfo } = useGetUserFavoritesQuery(currentUserId)
  const posts = allPosts?.data

  if (error) console.error("get user Posts error", error)

  // check favorite post
  const favoritePosts = userInfo?.data.FavoritePosts
  const favoritePostsId = favoritePosts?.map((item) => item.id)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        posts?.map((item) => (
          <PostCard
            post={item}
            key={item.id}
            isFavorite={favoritePostsId?.includes(item.id)}
            onDelete={onDelete}
          />
        ))
      )}
    </>
  )
}

const UserReportsList = ({
  onDelete,
  userId,
}: {
  onDelete: (e: React.MouseEvent<HTMLDivElement>, id: number) => Promise<void>
  userId?: string
}) => {
  const { data, isLoading, error } = useGetUserReportsQuery(Number(userId))
  if (error) console.error("get user reports error", error)
  const reports = data?.data.slice(0, 30)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        reports?.map((item) => {
          return <ReportCard report={item} key={item.id} onDelete={onDelete} />
        })
      )}
    </>
  )
}

const MainSector = () => {
  const [showMsg, setShowMsg] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const currentTab = useAppSelector((state) => state.mainPageReducer.currentTab)
  const dispatch = useAppDispatch()
  const userId = useParams().userId
  const currentUserId = localStorage.getItem("userId")

  //Favorites
  const { data: userInfo } = useGetUserFavoritesQuery(Number(userId))
  const user = userInfo?.data
  const favoritePosts = user?.FavoritePosts
  const favoritePostsId = favoritePosts?.map((item) => item.id)

  const [deletePost, { isSuccess: isDeletePostSuccess }] =
    useDeletePostMutation()

  const [deleteReport, { isSuccess: isDeleteReportSuccess }] =
    useDeleteReportMutation()

  async function handlePostDelete(
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) {
    e.stopPropagation()
    const ans = await confirmPopOut("確認刪除此貼文？", true)
    if (ans) {
      await deletePost(id)
        .then(() => setShowMsg(true))
        .catch((err) => setErrMsg(err.data.message))
        .finally(() => {
          return setTimeout(() => {
            setShowMsg(false)
            setErrMsg("")
          }, 3500)
        })
    }
    return
  }

  async function handleReportDelete(
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) {
    e.stopPropagation()
    const ans = await confirmPopOut("確認刪除此報告？", true)
    if (ans) {
      await deleteReport(id)
        .then(() => setShowMsg(true))
        .catch((err) => setErrMsg(err.data.message))
        .finally(() => {
          return setTimeout(() => {
            setShowMsg(false)
            setErrMsg("")
          }, 3500)
        })
    }
    return
  }

  const isSuccess = isDeleteReportSuccess || isDeletePostSuccess

  useEffect(() => {
    return () => {
      dispatch(setCurrentTab("post"))
    }
  }, [dispatch])

  return (
    <div className="basis-4/5 h-screen overflow-y-auto flex flex-col items-center space-y-4">
      <div className="w-full aspect-square mt-4 sm:flex relative outline outline-2 outline-transparent duration-500 cover cursor-cell">
        <img
          src="https://loremflickr.com/500/340/nature"
          alt="cover"
          className=" absolute w-full h-full z-[-1] object-cover duration-500"
        />
        <div className="w-max mx-auto mt-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-40 h-40 rounded-full object-cover"
          />
          <h3 className="mb-2 text-center font-bold text-2xl text-dark-green mt-3 rounded-lg shadow-lg outline outline-2 outline-transparent hover:outline-gray-600 hover:outline-offset-6 bg-slate-300/30 dark:text-gray-400 ">
            {user?.name}
          </h3>
        </div>
        <div className="w-max mt-4 py-2 px-4 sm:pt-8 text-slate-300 mx-auto opacity-20 duration-500 ">
          <p>
            加入日期 :{" "}
            <span className="userInfo">{getUploadDate(user?.createdAt)}</span>
          </p>
          <p>
            已發佈貼文數 : <span className="userInfo">{user?.posts_count}</span>
          </p>
          <p>
            已發佈報告數 :{" "}
            <span className="userInfo">{user?.reports_count}</span>
          </p>
          <p>
            發文被收藏數 :{" "}
            <span className="userInfo">{user?.beingFavorite_count}</span>
          </p>
        </div>
      </div>
      <div className="w-full ">
        <div className="flex justify-between relative">
          <Tab post="已發佈貼文" report="已上傳報告" />
          {showMsg ? (
            <p
              className={`text-center absolute top-1 left-1/2 rounded-lg py-1 px-4 dark:bg-slate-300 hover:opacity-50 cursor-pointer ${
                isSuccess
                  ? "bg-dark-green text-light-green dark:text-amber-700"
                  : "bg-red-400 text-amber-800 dark:text-red-500"
              }`}
            >
              {isSuccess ? "刪除成功" : errMsg}
            </p>
          ) : null}
          <div className="py-1">
            {currentUserId === userId ? (
              <button
                className="bg-gradient-to-r focus:from-purple-500 focus:to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-slate-500 font-semibold py-1 px-4 rounded-full shadow-md transition-colors duration-300 focus:text-gray-300 dark:focus:border-white mr-2 "
                onClick={() => dispatch(setCurrentTab("favorite"))}
              >
                &#9750; 收藏貼文
              </button>
            ) : null}
          </div>
        </div>
        <div className="w-full h-screen overflow-y-auto scrollbar-y">
          {currentTab === "post" && (
            <UserPostList onDelete={handlePostDelete} userId={userId} />
          )}
          {currentTab === "report" && (
            <UserReportsList onDelete={handleReportDelete} userId={userId} />
          )}
          {currentTab === "favorite" &&
            favoritePosts?.map((item) => {
              return (
                <PostCard
                  post={item}
                  key={item.id}
                  isFavorite={favoritePostsId?.includes(item.id)}
                  onDelete={handlePostDelete}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

const UserPage = () => {
  return (
    <div className="lg:flex dark:bg-slate-800 dark:z-0 dark:text-neutral-300 grow">
      <MainSector />
      <Side />
    </div>
  )
}

export default UserPage
