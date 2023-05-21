import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { MainContainer } from "../../components/MainContainer"
import { InputCard, SubmitBtn } from "../../components/AuthInput"

const Setting = () => {
  return (
    <MainContainer>
      <Header  />
      <div className="h-full flex flex-col sm:flex-row dark:bg-slate-800">
        <Navbar />
        <div className="sm:w-1/2 py-4 ">
          <h2 className="text-center font-bold text-xl dark:text-white">個人資料設定</h2>
          <InputCard label="名稱 Name" placeholder="請輸入你Line群組裡的名稱" type="text" name="name" />
          <InputCard label="信箱 Email" placeholder="請輸入你的信箱" type="text" name="email"/>
          <InputCard label="密碼 Password" placeholder="請輸入你的密碼" type="text" name="password"/>
          <InputCard label="再次確認密碼 Confirm password" placeholder="請再次輸入你的密碼" type="text" name="passwordCheck"/>
          <div className="w-4/5 mx-auto">
            <SubmitBtn submit="確認更改"/>
          </div>
        </div>
      </div>
      <Footer />
    </MainContainer>
  )
}

export default Setting