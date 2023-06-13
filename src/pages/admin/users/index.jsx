import { MainContainer, Footer, Header } from "../../../components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminNavbar from "../AdminSidebar"
import { useState, useEffect } from "react"
import { getAllUsersAdmin } from "../../../apis"


const UserCard = ({user}) => {
  return(
    <div className="w-[200px] h-[200px] relative break-all cursor-pointer border-1 rounded-lg shadow-lg " >
      <div className="absolute inset-0 opacity-20 hover:opacity-80 rounded-lg transparent">
        <img src={user.avatar} alt="user" className="object-cover object-center w-full h-full"/>
      </div>
      <div className="py-8 px-6 rounded-[10px] ">
        <p className="font-bold text-center">{user.name}</p>
        <p className="text-[14px] text-[#6C757D] text-center">{user.email}</p>
        <div className="flex justify-center mt-[21px] items-center">
            <FontAwesomeIcon icon="fa-solid fa-newspaper" />
            <p className="ml-2 mr-3 ">{user.ReportsCount}</p>
            <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
            <p className="ml-1">{user.PostsCount}</p>
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

const UserList = () => {
  const [ users, setUsers ] = useState([])
  useEffect(() => {
    async function getAllUsersAsync(){
      const { success, data } = await getAllUsersAdmin()
      if(success){
        setUsers(data)
      }
    }
    getAllUsersAsync()
  }, [])
  return (
    <div className="flex flex-wrap gap-4 p-4 dark:bg-slate-800 dark:text-white overflow-y-auto h-screen scrollbar-y">
      {users?.map( user => <UserCard user={user} key={user.id}/>)}    
    </div>
  )
}

const AdminUser = () => {
  return (
    <MainContainer>
      <Header  />
      <div className="h-full flex flex-col sm:flex-row ">
        <AdminNavbar />
        <UserList />
      </div>
      <Footer />
    </MainContainer>
  )
}

export default AdminUser