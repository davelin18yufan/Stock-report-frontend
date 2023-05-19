import {LogoTitle, InputCard, SubmitBtn, AuthContainer} from "../../components/AuthInput"
import { useNavigate  } from "react-router-dom"

const AdminLogin = () => {
  const go = useNavigate()

  return (
     <AuthContainer>
        <LogoTitle title="登入管理者後台"/>
        
        <div className="w-full ">
          <InputCard label="帳號 Account" placeholder="請輸入你的信箱" type="text" name="email"/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password"/>
        </div>

        <div className="w-4/5 mx-auto">
          <SubmitBtn submit="後台登入"/>
        </div>

        <div className="w-4/5 text-end mt-4 mx-auto">
          <p className="link" onClick={() => go("/login")}>回前台登入</p>
        </div>
    </AuthContainer>
  )
}

export default AdminLogin