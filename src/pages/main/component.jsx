import { PostSide, PostCard, ReportCard, ReportSide } from "../../components/Card"

export const MainSector = ({currentTab, setCurrentTab}) => {

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 ">
      <div className="flex p-2 text-gray-500 border-b-2 dark:border-b-slate-300/50">
        <button className="border-b-2 border-gray-400/50 focus:text-black  focus:border-black dark:focus:text-white dark:focus:border-white" autoFocus onClick={() => setCurrentTab("post")}>最新貼文</button>
        <button className="border-b-2 ml-3 focus:text-black border-gray-400/50 focus-border-black dark:focus:text-white dark:focus:border-white" onClick={() => setCurrentTab("report")}>最新報告</button>
      </div>
      <div className="w-full h-screen  overflow-y-auto">
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
        {currentTab==="post" ? <PostCard /> : <ReportCard />}
      </div>
    </main>
  )
}

export const Side = ({currentTab}) => {
  return (
    <aside className="basis-2/5 border-2 dark:bg-slate-800 dark:border-slate-300/25 scroll-smooth " id="side">
      {currentTab==="post" ? <PostSide /> : <ReportSide />}
    </aside>
  )
}