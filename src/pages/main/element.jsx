import { PostCard, ReportCard, Tab } from "../../components";
import {
  getPosts,
  deletePost,
  getReports,
  deleteReport,
  getUserInfo,
} from "../../apis";
import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/MainContext";
import Swal from "sweetalert2";

export const MainSector = () => {
  const { posts, setPosts, reports, setReports, currentTab } = useMainContext();
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const currentUserId = localStorage.getItem("userId");
  const favoritePostsId = favoritePosts.map((item) => item.id);

  async function handlePostDelete(e, id) {
    e.stopPropagation();
    setIsSubmitting(true);
    const { success, message } = await deletePost(id);
    if (success) {
      setPosts((prevPost) => {
        return prevPost.filter((item) => item.id !== id);
      });
      setIsSubmitting(false);
      setShowSuccessMsg(true);
      return setTimeout(() => {
        setShowSuccessMsg(false);
      }, 4000);
    }
    Swal.fire({
      position: "top",
      title: message,
      icon: "error",
      showConfirmButton: true,
      confirmButtonColor: "gray",
    });
    setIsSubmitting(false);
  }

  async function handleReportDelete(e, id) {
    e.stopPropagation();
    setIsSubmitting(true);
    const { success, message } = await deleteReport(id);
    if (success) {
      setReports((prevReport) => {
        return prevReport.filter((item) => item.id !== id);
      });
      setIsSubmitting(false);
      setShowSuccessMsg(true);
      return setTimeout(() => {
        setShowSuccessMsg(false);
      }, 4000);
    }
    Swal.fire({
      position: "top",
      title: message,
      icon: "error",
      showConfirmButton: true,
      confirmButtonColor: "gray",
    });
    setIsSubmitting(false);
  }

  useEffect(() => {
    async function getUserAsync() {
      // 檢查這頁的哪些貼文已被收藏
      try {
        const { success, data } = await getUserInfo(currentUserId);
        if (success) {
          setFavoritePosts(data.FavoritePosts);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // 更新完成，設置 isLoading 為 false
      }
    }
    async function getPostsAsync() {
      try {
        const { success, data } = await getPosts();
        if (success) {
          if (data.length > 50) {
            return setPosts(data.slice(0, 50));
          }
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    async function getReportsAsync() {
      try {
        const { success, data } = await getReports();
        if (success) {
          if (data.length > 50) {
            return setReports(data.slice(0, 50));
          }
          setReports(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserAsync();
    getPostsAsync();
    getReportsAsync();
  }, [setPosts, setReports, currentUserId]);

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 grow w-full relative">
      <Tab post="最新貼文" report="最新報告" />
      {isSubmitting && (
        <svg
          className="absolute left-1/2 top-1/4 animate-spin h-5 w-5 border-slate-500 border-t-slate-200 rounded-full border-2"
          viewBox="0 0 24 24"
        ></svg>
      )}
      {showSuccessMsg && (
        <p className="bg-dark-green text-light-green text-center absolute top-1 left-1/3 rounded-lg py-1 px-4 dark:bg-slate-300 dark:text-amber-700">
          刪除成功！
        </p>
      )}
      <div className="w-full h-screen overflow-y-auto scrollbar-y">
        {currentTab === "post" &&
          (isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-green"></div>
            </div>
          ) : (
            posts.map((item) => (
              <PostCard
                post={item}
                key={item.id}
                isFavorite={favoritePostsId.includes(item.id)}
                onDelete={(e, postId) => handlePostDelete(e, postId)}
              />
            ))
          ))}
        {currentTab === "report" &&
          reports.map((item) => {
            return (
              <ReportCard
                report={item}
                key={item.id}
                userName={item.user_name}
                stockName={item.stock_name}
                onDelete={(e, reportId) => handleReportDelete(e, reportId)}
              />
            );
          })}
      </div>
    </main>
  );
};
