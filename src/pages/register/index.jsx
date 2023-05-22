import {LogoTitle, InputCard, SubmitBtn, AuthContainer} from "../../components/AuthInput"
import { useNavigate  } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2';

const Register = () => {
  const go = useNavigate()
  const { signUp, isAuthenticated } = useAuth()
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ passwordCheck, setPasswordCheck ] = useState("")

  async function handleSignUp() {
    // 檢查輸入
    if (name.length === 0) {
      return
    }
    if (password.length === 0) {
      return
    }
    if (email.length === 0) {
      return
    }
    if (passwordCheck.length === 0) {
        return
    }
    if (password.length === 0) {
        return
    }

    const result = await signUp({ name, email, password })
    if(result){
      Swal.fire({
        position: 'top',
        title: '註冊成功！請重新登入',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
      go("/login")
      return
    }
    Swal.fire({
      position: 'top',
      title: '註冊失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      go('/main')
    }
  }, [go, isAuthenticated])

  return (
    <AuthContainer>
        <LogoTitle title="建立屬於你的帳號"/>

        <div className="w-full ">
          <InputCard label="名稱 Name" placeholder="請輸入你Line群組裡的名稱" type="text" name="name" 
            onChange={(inputValue) => setName(inputValue)}/>
          <InputCard label="信箱 Email" placeholder="請輸入你的信箱" type="text" name="email" 
            onChange={(inputValue) => setEmail(inputValue)}/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password" 
            onChange={(inputValue) => setPassword(inputValue)}/>
          <InputCard label="再次確認密碼 Confirm password" placeholder="請再次輸入你的密碼" type="text" name="passwordCheck" 
            onChange={(inputValue) => setPasswordCheck(inputValue)}/>
        </div>

        <div className="w-4/5 mx-auto">
            <SubmitBtn submit="註冊 Sign Up" onSubmit={handleSignUp}/>
        </div>

        <div className="w-4/5 mx-auto mt-4  ">
          <p className="text-center link" onClick={() => go("/login")}>取消</p>
        </div>
    </AuthContainer>

  )
}

export default Register