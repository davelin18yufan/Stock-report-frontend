import { PostCard, ReportCard, Tab, Loading, Side } from "components"
import { useState } from "react"
import { useAppSelector } from "hooks/store"
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "services/postService"
import {
  useGetReportsQuery,
  useDeleteReportMutation,
} from "services/reportService"
import { confirmPopOut } from "utilities/confirmPopOut"
import { useGetUserInfoQuery } from "services/userService"

const PostList = ({ onDelete }) => {
  const currentUserId = Number(localStorage.getItem("userId"))
  const { data: allPosts,error, isLoading } = useGetPostsQuery()
  const { data: userInfo } = useGetUserInfoQuery(currentUserId)
  const posts = allPosts && allPosts.data

  if (error) {
    confirmPopOut(error?.data.message, false)
  }

  // check favorite post
  const favoritePosts = userInfo?.data.FavoritePosts
  const favoritePostsId = favoritePosts?.map((item) => item.id)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        posts.map((item) => (
          <PostCard
            post={item}
            key={item.id}
            isFavorite={ favoritePostsId?.includes(item.id)}
            onDelete={onDelete}
          />
        ))
      )}
    </>
  )
}

const ReportList = ({ onDelete }) => {
  const { data, isLoading, isSuccess, error } = useGetReportsQuery()
  if (error) confirmPopOut(error?.data.message, false)
  const reports = isSuccess ? data.data.slice(0, 30) : []
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        reports.map((item) => {
          return (
            <ReportCard
              report={item}
              key={item.id}
              userName={item.user_name}
              stockName={item.stock_name}
              onDelete={onDelete}
            />
          )
        })
      )}
    </>
  )
}

export const MainSector = () => {
  const currentTab = useAppSelector((state) => state.mainPageReducer.currentTab)
  const [showMsg, setShowMsg] = useState(false)

  const [
    deletePost,
    { isSuccess: isDeletePostSuccess, error: DeletePostError },
  ] = useDeletePostMutation()

  const [
    deleteReport,
    { isSuccess: isDeleteReportSuccess, error: DeleteReportError },
  ] = useDeleteReportMutation()

  async function handlePostDelete(e, id) {
    e.stopPropagation()
    const ans = await confirmPopOut("確認刪除此貼文？", true)
    if (ans) {
      await deletePost(id)
      setShowMsg(true)
      setTimeout(() => setShowMsg(false), 3500)
    }
    return
  }

  async function handleReportDelete(e, id) {
    e.stopPropagation()
    const ans = await confirmPopOut("確認刪除此報告？", true)
    if (ans) {
      await deleteReport(id)
      setShowMsg(true)
      setTimeout(() => setShowMsg(false), 3500)
    }
    return
  }

  const isSuccess = isDeleteReportSuccess || isDeletePostSuccess
  const error = DeletePostError || DeleteReportError

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 grow w-full relative ">
      <Tab post="最新貼文" report="最新報告" />
      {showMsg ? (
        <p
          className={`text-center absolute top-1 left-1/3 rounded-lg py-1 px-4 dark:bg-slate-300 hover:opacity-50 cursor-pointer ${
            isSuccess
              ? "bg-dark-green text-light-green dark:text-amber-700"
              : "bg-red-400 text-amber-800 dark:text-red-500"
          }`}
        >
          {isSuccess ? "刪除成功" : error}
        </p>
      ) : null}
      <div className="w-full h-screen overflow-y-auto scrollbar-y">
        {currentTab === "post" && (
          <PostList onDelete={handlePostDelete} />
        )}
        {currentTab === "report" && (
          <ReportList onDelete={handleReportDelete} />
        )}
      </div>
    </main>
  )
}

const FrontPage = () => {
  return (
    <div className="lg:flex dark:bg-slate-800 dark:text-neutral-300 grow">
      <MainSector />
      <Side />
    </div>
  )
}

export default FrontPage
