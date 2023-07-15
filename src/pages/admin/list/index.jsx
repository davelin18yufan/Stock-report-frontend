import { UserImage, Tab } from "../../../components";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMainContext } from "../../../contexts/MainContext";
import {
  deletePostAdmin,
  deleteReportAdmin,
  getAllPostsAdmin,
  getAllReportsAdmin,
} from "../../../apis";
import { getDateTransform, uploadDate } from "../../../utilities/date";
import Swal from "sweetalert2";

const PostList = ({ post, onDelete }) => {
  return (
    <div className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col dark:bg-slate-800 dark:text-neutral-300">
      <div className="flex flex-row mb-[5px] items-center">
        <UserImage avatar={post.User?.avatar} />
        <div className="ml-2 flex flex-row items-center gap-[8px]">
          <p className="font-bold text-[16px] leading-[26px] dark:text-gray-200">
            {post.User?.name}
          </p>
          <div className="w-[4px] h-[4px] rounded-full bg-[#6C757D]"></div>
          <p className="text-[#6C757D] text-[14px] leading-[22px] font-[400]">
            {getDateTransform(post.createdAt)}
          </p>
        </div>
        <div
          className="ml-auto cursor-pointer"
          onClick={() => onDelete?.(post.id)}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
      <div className="font-[400] text-[16px] leading-[26px] pl-[56px] ">
        {post.post}
      </div>
    </div>
  );
};

const ReportList = ({ report, onDelete }) => {
  return (
    <div className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col dark:bg-slate-800 dark:text-neutral-300 ">
      <div className="flex flex-row mb-[5px] items-center">
        <div className="w-full flex flex-row items-center gap-[8px]">
          <p className="basis-2/5 font-bold text-[20px] leading-[20px] truncate">
            {report.title}
          </p>
          <div className="basis-3/5 flex pt-2 pl-2 flex-wrap sm:flex-nowrap space-x-6">
            <ul className="pl-2 font-normal list-disc text-sm text-[#6C757D] dark:text-amber-200">
              <li>
                上傳者： <b>{report.User?.name}</b>
              </li>
              <li>上傳日期： {uploadDate(report.createdAt)}</li>
            </ul>
            <ul className="font-normal list-disc text-sm text-[#6C757D] dark:text-amber-200">
              <li>
                出版日期： <b>{report.publish_date}</b>
              </li>
              <li>出版作者： {report.from}</li>
            </ul>
          </div>
        </div>
        <div
          className="ml-auto cursor-pointer"
          onClick={() => onDelete?.(report.id)}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
      <div className=" font-[300] text-[16px] leading-[26px] line-clamp-1 sm:line-clamp-2 ">
        {report.report}
      </div>
    </div>
  );
};

export const Activities = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { posts, setPosts, reports, setReports, currentTab } = useMainContext();

  async function handlePostDelete(id) {
    setIsSubmitting(true);
    const { success, message } = await deletePostAdmin(id);
    if (success) {
      setPosts((prevPost) => {
        return prevPost.filter((item) => item.id !== id);
      });
      setIsSubmitting(false);
      setShowSuccessMsg(true);
      return setTimeout(() => {
        setShowSuccessMsg(false);
      }, 5000);
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

  async function handleReportDelete(id) {
    setIsSubmitting(true);
    const { success, message } = await deleteReportAdmin(id);
    if (success) {
      setReports((prevReport) => {
        return prevReport.filter((item) => item.id !== id);
      });
      setIsSubmitting(false);
      setShowSuccessMsg(true);
      return setTimeout(() => {
        setShowSuccessMsg(false);
      }, 5000);
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
    return () => {
      setIsSubmitting(false);
      setShowSuccessMsg(false);
    };
  }, []);

  useEffect(() => {
    async function getPostsAsync() {
      try {
        const { data } = await getAllPostsAdmin();
        if (data) {
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    async function getReportsAsync() {
      try {
        const { data } = await getAllReportsAdmin();
        if (data) {
          setReports(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getPostsAsync();
    getReportsAsync();
  }, [setPosts, setReports]);
  return (
    <div className="w-full relative">
      <Tab post="貼文清單" report="報告清單" />
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
      <div className="h-screen overflow-y-auto scrollbar-y">
        {currentTab === "post"
          ? posts.map((post) => (
              <PostList
                key={post.id}
                post={post}
                onDelete={(postId) => handlePostDelete(postId)}
              />
            ))
          : reports.map((report) => (
              <ReportList
                key={report.id}
                report={report}
                onDelete={(reportId) => handleReportDelete(reportId)}
              />
            ))}
      </div>
    </div>
  );
};
