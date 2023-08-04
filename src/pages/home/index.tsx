import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "hooks/useAuth"

//總導引頁
const HomePage = () => {
  const go = useNavigate()
  const { user: currentUser } = useAuth()
  //決定導向頁面
  useEffect(() => {
    return currentUser ? go("/admin/list") : go("/main")
  }, [go, currentUser])
  return (
    <div>
      {currentUser ? (
        <div>
          {/* 顯示已登入的內容 */}
          <h1>歡迎回來！</h1>
          <button>登出</button>
        </div>
      ) : (
        <div>
          <h1>前往登入</h1>
          <button onClick={() => go("/login")}>登入</button>
        </div>
      )}
    </div>
  )
}

export default HomePage
