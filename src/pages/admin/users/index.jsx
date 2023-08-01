import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGetAllUsersQuery } from "services/adminService"
import { Loading } from "components"

const UserCard = ({ user }) => {
  return (
    <div className="w-[200px] h-[200px] relative break-all cursor-pointer border-1 rounded-lg shadow-lg ">
      <div className="absolute inset-0 opacity-20 hover:opacity-80 rounded-lg transparent">
        <img
          src={user.avatar}
          alt="user"
          className="object-cover object-center w-full h-full"
        />
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
            <span className="ml-1 text-red-800 dark:text-amber-200">{user.beingFavorite_count}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export const UserList = () => {
  const { data, isLoading } = useGetAllUsersQuery()
  const users = data?.data

  return (
    <div className="w-full flex flex-wrap gap-4 p-4 dark:bg-slate-800 dark:text-white overflow-y-auto h-screen scrollbar-y">
      {isLoading ? (
        <Loading />
      ) : (
        users?.map((user) => <UserCard user={user} key={user.id} />)
      )}
    </div>
  )
}
