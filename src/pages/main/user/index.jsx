import {
  PostCard,
  ReportCard,
  Side,
  Tab,
} from "../../../components";
import { useMainContext } from "../../../contexts/MainContext";
import { getUserPosts, getUserReports, getUserInfo } from "../../../apis";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MainSector = () => {
  const { posts, setPosts, reports, setReports, currentTab, setCurrentTab } =
    useMainContext();
  const userId = useParams().userId;
  const currentUserId = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const favoritePostsId = favoritePosts.map((item) => item.id);

  useEffect(() => {
    async function getUserAsync() {
      try {
        const { success, data } = await getUserInfo(userId);
        if (success) {
          setUser(data);
          setFavoritePosts(data.FavoritePosts);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function getPostsAsync() {
      try {
        const { data } = await getUserPosts(userId);
        if (data) {
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    async function getReportsAsync() {
      try {
        const { data } = await getUserReports(userId);
        if (data) {
          setReports(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserAsync();
    getPostsAsync();
    getReportsAsync();
  }, [setPosts, setReports, userId]);

  useEffect(() => {
    return () => setCurrentTab("post");
  }, [setCurrentTab]);

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
            加入日期 : <span className="userInfo">{user?.createdAt}</span>
          </p>
          <p>
            已發佈貼文數 : <span className="userInfo">{user?.posts_count}</span>
          </p>
          <p>
            已發佈報告數 :{" "}
            <span className="userInfo">{user?.reports_count}</span>
          </p>
          <p>
            發文被收藏數 : <span className="userInfo">5</span>
          </p>
        </div>
      </div>
      <div className="w-full ">
        <div className="flex justify-between">
          <Tab post="已發佈貼文" report="已上傳報告" />
          <div className="py-1">
            {currentUserId === userId ? (
              <button
                className="bg-gradient-to-r focus:from-purple-500 focus:to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-slate-500 font-semibold py-1 px-4 rounded-full shadow-md transition-colors duration-300 focus:text-gray-300 dark:focus:border-white mr-2 "
                onClick={() => setCurrentTab("favorite")}
              >
                &#9750; 收藏貼文
              </button>
            ) : null}
          </div>
        </div>
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
                />
              );
            })}
          {currentTab === "favorite" &&
            favoritePosts.map((item) => {
              return (
                <PostCard
                  post={item}
                  key={item.id}
                  isFavorite={favoritePostsId.includes(item.id)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const UserPage = () => {
  return (
    <div className="lg:flex dark:bg-slate-800 dark:z-0 dark:text-neutral-300 grow">
      <MainSector />
      <Side />
    </div>
  );
};

export default UserPage;
