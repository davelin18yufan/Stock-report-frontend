import {LogoTitle, InputCard, SubmitBtn, AuthContainer} from "../../components/AuthInput"
import { useNavigate  } from "react-router-dom"

const Login = () => {
  const go = useNavigate()
  return (
    <AuthContainer>
        <LogoTitle title="登入 Stock Report"/>
        
        <div className="w-full ">
          <InputCard label="帳號 Account" placeholder="請輸入你的信箱" type="text" name="email"/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password"/>
        </div>

        <div className="w-4/5 mx-auto">
          <SubmitBtn submit="登入 Login"/>
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