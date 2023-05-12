import {LogoTitle, InputCard, SubmitBtn, AuthContainer} from "../../components/AuthInput"
import { useNavigate  } from "react-router-dom"


const Register = () => {
  const go = useNavigate()
  return (
    <AuthContainer>
        <LogoTitle title="建立屬於你的帳號"/>

        <div className="w-full ">
          <InputCard label="名稱 Name" placeholder="請輸入你Line群組裡的名稱" type="text" name="name"/>
          <InputCard label="信箱 Email" placeholder="請輸入你的信箱" type="text" name="email"/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password"/>
          <InputCard label="再次確認密碼 Confirm password" placeholder="請再次輸入你的密碼" type="text" name="passwordCheck"/>
        </div>

        <div className="w-4/5 mx-auto">
            <SubmitBtn submit="註冊 Sign Up"/>
        </div>

        <div className="w-4/5 mx-auto mt-4  ">
          <p className="text-center link" onClick={() => go("/login")}>取消</p>
        </div>
    </AuthContainer>

  )
}

export default Register