import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
// import { checkPermissionUser } from "api/Auth";

//總導引頁
const HomePage = () => {
const go = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //決定導向頁面
  useEffect(() => {
    // 模擬驗證用戶是否登入過，這裡假設您已有一個合適的驗證機制
    const checkUserLoggedIn = () => {
      const userToken = localStorage.getItem('authToken') // 從本地存儲中獲取驗證令牌或其他必要信息

      if (userToken) {
        // 如果存在用戶驗證令牌，表示用戶已登入
        setIsLoggedIn(true)
        go("/main")
      } else {
        // 如果不存在用戶驗證令牌，表示用戶未登入，重定向到登入頁面
        go("/login")
      }
    };

    checkUserLoggedIn()
  }, [go])
  return(
  <div>
      {isLoggedIn ? (
        <div>
          {/* 顯示已登入的內容 */}
          <h1>歡迎回來！</h1>
          <button onClick={() => { /* 登出邏輯 */ }}>登出</button>
        </div>
      ) : <div></div>
      }
  </div>)
}

export default HomePage;