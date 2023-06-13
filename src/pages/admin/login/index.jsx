import { LogoTitle, InputCard, SubmitBtn, AuthContainer } from "../../../components"
import { useNavigate  } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import Swal from "sweetalert2"

const AdminLogin = () => {
  const go = useNavigate()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const { login, isAuthenticated } = useAuth()
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  async function handleLogin(){
    setIsSubmitting(true)
    if(email.length === 0 || password.length === 0){
      Swal.fire({
        position: 'top',
        title: "欄位不可空白",
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: "gray"
      })
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
      return
    }
    const { success, message } = await login({email, password})
  
    if(success){
      setIsSubmitting(false)
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
      return
    }else{
      setIsSubmitting(false)
      const data = message?.status === 401 ? "密碼或信箱錯誤！" : message?.data.message  
      Swal.fire({
        position: 'top',
        title: data || "發生錯誤",
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: "gray"
      })
    }
  }

  useEffect(() => {
    if(isAuthenticated){
      go("/admin/users")
    }
  }, [go, isAuthenticated])

  return (
     <AuthContainer>
        <LogoTitle title="登入管理者後台"/>
        
        <div className="w-full ">
          <InputCard 
            label="帳號 Account" 
            placeholder="請輸入你的信箱" 
            type="text" 
            name="email" 
            onChange={(inputValue) => setEmail(inputValue)} 
            disabled={isSubmitting ? true : false}/>
          <InputCard 
            label="密碼 Password" 
            placeholder="請輸入你的密碼" 
            type="password" 
            name="password" 
            onChange={(inputValue) => setPassword(inputValue)} 
            disabled={isSubmitting ? true : false}/>
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