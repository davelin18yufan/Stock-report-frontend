import { LogoTitle, InputCard, SubmitBtn, AuthContainer } from "../../../components/AuthInput"
import { useNavigate  } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import Swal from "sweetalert2"

const AdminLogin = () => {
  const go = useNavigate()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const { login, isAuthenticated } = useAuth()

  async function handleLogin(){
    if(email.length === 0){
      return;
    }
    if (password.length === 0) {
      return;
    }
    const result = await login({ email, password })
    if(result){
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
      go("/admin/users")
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

  useEffect(() => {
    if(isAuthenticated){
      go("/admin/list")
    }
  }, [go, isAuthenticated])

  return (
     <AuthContainer>
        <LogoTitle title="登入管理者後台"/>
        
        <div className="w-full ">
          <InputCard label="帳號 Account" placeholder="請輸入你的信箱" type="text" name="email" onChange={(inputValue) => setEmail(inputValue)}/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password" onChange={(inputValue) => setPassword(inputValue)}/>
        </div>

        <div className="w-4/5 mx-auto">
          <SubmitBtn submit="後台登入" onSubmit={handleLogin}/>
        </div>

        <div className="w-4/5 text-end mt-4 mx-auto">
          <p className="link" onClick={() => go("/login")}>回前台登入</p>
        </div>
    </AuthContainer>
  )
}

export default AdminLogin