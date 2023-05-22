import {LogoTitle, InputCard, SubmitBtn, AuthContainer} from "../../components/AuthInput"
import { useNavigate  } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import Swal from "sweetalert2"

const Login = () => {
  const go = useNavigate()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const { login, isAuthenticated } = useAuth()

  async function handleLogin(){
    if(email.length === 0){
      return 
    }
    if(password.length === 0){
      return
    }

    const result = await login({email, password})
    if(result){
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
    }else{
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }

  // 檢查是否要重新登入
  useEffect(() => {
    if(isAuthenticated){
      go("/main")
    }
  }, [go, isAuthenticated])

  return (
    <AuthContainer>
        <LogoTitle title="登入 Stock Report"/>
        
        <div className="w-full ">
          <InputCard label="帳號 Account" placeholder="請輸入你的信箱" type="text" name="email" onChange={(inputValue) => setEmail(inputValue)}/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password" onChange={(inputValue) => setPassword(inputValue)}/>
        </div>

        <div className="w-4/5 mx-auto">
          <SubmitBtn submit="登入 Login" onSubmit={handleLogin}/>
        </div>

        <div className="w-4/5 mx-auto mt-4 flex ">
          <p className="flex-1 text-end link" onClick={() => go("/register")}>註冊</p>
          <span className="block px-[20px]">&#8729;</span>
          <p className="link" onClick={() => go("/admin/login")}>後台登入</p>
        </div>
    </AuthContainer>
  )
}

export default Login