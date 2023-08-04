import { UserImage, Tab, Loading } from "components";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDateTransform, getUploadDate } from "utilities/date";
import { useAppSelector } from "hooks/store";
import {
  useGetAllPostsQuery,
  useGetAllReportsQuery,
  useDeletePostMutation,
  useDeleteReportMutation,
} from "services/adminService";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PostList = ({
  onDelete,
}: {
  onDelete: (id: number) => Promise<void>;
}) => {
  const { data, isLoading } = useGetAllPostsQuery();
  const posts = data?.data;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        posts?.map((post) => (
          <div
            className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col dark:bg-slate-800 dark:text-neutral-300"
            key={post.id}
          >
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
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <div className="font-[400] text-[16px] leading-[26px] pl-[56px] ">
              {post.post}
            </div>
          </div>
        ))
      )}
    </>
  );
};

const ReportList = ({
  onDelete,
}: {
  onDelete: (id: number) => Promise<void>;
}) => {
  const { data, isLoading } = useGetAllReportsQuery();
  const reports = data?.data;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        reports?.map((report) => (
          <div
            className="px-[24px] py-[16px] border-b border-slate-200 flex flex-col dark:bg-slate-800 dark:text-neutral-300"
            key={report.id}
          >
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
                    <li>上傳日期： {getUploadDate(report.createdAt)}</li>
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
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <div className=" font-[300] text-[16px] leading-[26px] line-clamp-1 sm:line-clamp-2 ">
              {report.report}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export const Activities = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const currentTab = useAppSelector(
    (state) => state.mainPageReducer.currentTab,
  );

  const [deletePost, { isLoading: deletePostLoading, isError: deletePostErr }] =
    useDeletePostMutation();
  const [
    deleteReport,
    { isLoading: deleReportLoading, isError: deleteReportErr },
  ] = useDeleteReportMutation();

  const isDeleteLoading = deletePostLoading || deleReportLoading;
  const isError = deletePostErr || deleteReportErr;

  async function handlePostDelete(id: number) {
    deletePost(id)
      .unwrap()
      .then(() => {
        setShowMsg(true);
        setMsg("刪除成功！");
      })
      .catch((err) => setMsg(err?.data.message))
      .finally(() =>
        setTimeout(() => {
          setShowMsg(false);
        }, 3000),
      );
  }

  async function handleReportDelete(id: number) {
    deleteReport(id)
      .unwrap()
      .then(() => {
        setShowMsg(true);
        setMsg("刪除成功！");
      })
      .catch((err) => setMsg(err?.data.message))
      .finally(() =>
        setTimeout(() => {
          setShowMsg(false);
        }, 3000),
      );
  }

  useEffect(() => {
    return () => {
      setShowMsg(false);
      setMsg("");
    };
  }, []);

  return (
    <div className="w-full relative">
      <Tab post="貼文清單" report="報告清單" />
      {isDeleteLoading && (
        <svg
          className="absolute left-1/2 top-1/4 animate-spin h-5 w-5 border-slate-500 border-t-slate-200 rounded-full border-2"
          viewBox="0 0 24 24"
        ></svg>
      )}
      {showMsg && (
        <p
          className={`${
            isError
              ? "bg-red-400 text-amber-800 dark:text-red-500"
              : "bg-dark-green text-light-green dark:text-amber-700"
          } "text-center absolute top-1 left-1/3 rounded-lg py-1 px-4 dark:bg-slate-300"`}
        >
          {msg}
        </p>
      )}
      <div className="h-screen overflow-y-auto scrollbar-y">
        {currentTab === "post" ? (
          <PostList onDelete={handlePostDelete} />
        ) : (
          <ReportList onDelete={handleReportDelete} />
        )}
      </div>
    </div>
  );
};
