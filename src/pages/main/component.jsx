import { PostSide, PostCard, ReportCard, ReportSide } from "../../components/Card"

export const MainSector = ({currentTab, setCurrentTab}) => {

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 ">
      <div className="flex p-2 text-gray-500 border-y-2">
        <button className="border-b-2 focus:text-black focus:border-black" autoFocus onClick={() => setCurrentTab("post")}>最新貼文</button>
        <button className="border-b-2 ml-3 focus:text-black focus:border-black" onClick={() => setCurrentTab("report")}>最新報告</button>
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
    <aside className="basis-2/5 border-2 bg-[#FAFAFB] scroll-smooth" id="side">
      {currentTab==="post" ? <PostSide /> : <ReportSide />}
    </aside>
  )
}