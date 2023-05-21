import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import { MainContainer } from "../../../components/MainContainer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminNavbar from "../AdminSidebar"


const UserCard = () => {
  return(
    <div className="w-[200px] h-[200px] relative break-all cursor-pointer border-1 rounded-lg shadow-lg " >
      <div className="absolute inset-0 opacity-20 hover:opacity-80 rounded-lg transparent w-full h-full">
        <img src={`https://loremflickr.com/320/320/headshot/?random=${Math.random() * 100}`} alt="user" className=""/>
      </div>
      <div className="py-8 px-6 rounded-[10px] ">
        <p className="font-bold text-center">Dave</p>
        <p className="text-[14px] text-[#6C757D] text-center">@davelin</p>
        <div className="flex justify-center mt-[21px] items-center">
            <FontAwesomeIcon icon="fa-solid fa-newspaper" />
            <p className="ml-2 mr-3 ">10</p>
            <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
            <p className="ml-1">10</p>
        </div>
        <div className="flex justify-center mt-2">
          <p className="text-[#6C757D] text-[14px]">
            貼文被收藏數
            <span className="text-red-800 dark:text-amber-200">10</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const AdminUser = () => {
  return (
    <MainContainer>
      <Header  />
      <div className="h-full flex flex-col sm:flex-row ">
        <AdminNavbar />
        <div className="flex flex-wrap gap-4 p-4 dark:bg-slate-800 dark:text-white overflow-y-auto h-screen">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
      <Footer />
    </MainContainer>
  )
}

export default AdminUser