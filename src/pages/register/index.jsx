import {
  LogoTitle,
  InputCard,
  SubmitBtn,
  AuthContainer,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Register = () => {
  const go = useNavigate();
  const { signUp, isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignUp() {
    setIsSubmitting(true);
    // 檢查輸入
    if (
      name.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      passwordCheck.length === 0 ||
      password.length === 0
    ) {
      setShowErrorMsg(true);
      setErrorMsg("欄位不可空白!");
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    // 密碼輸入不一致
    if (password.trim() !== passwordCheck.trim()) {
      setShowErrorMsg(true);
      setErrorMsg("密碼輸入不一致!");
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    // 長度超出上限
    if (name.trim().length > 15) {
      setShowErrorMsg(true);
      setErrorMsg("暱稱輸入超過上限15");
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    if (password.trim().length > 15 || passwordCheck.trim().length > 15) {
      setShowErrorMsg(true);
      setErrorMsg("密碼輸入超過上限15");
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    const { success, message } = await signUp({ name, email, password });
    if (success) {
      setIsSubmitting(false);
      Swal.fire({
        position: "top",
        title: "註冊成功！請重新登入",
        icon: "success",
        showConfirmButton: true,
        confirmButtonColor: "green",
      });
      go("/login");
      return;
    }
    setShowErrorMsg(true);
    setErrorMsg(message.data.message);
    setIsSubmitting(false);
  }

  // 離開頁面清除
  useEffect(() => {
    return () => {
      setErrorMsg("");
      setShowErrorMsg(false);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      go("/main");
    }
  }, [go, isAuthenticated]);

  return (
    <AuthContainer>
      <LogoTitle title="建立屬於你的帳號" />
      {showErrorMsg && (
        <h4 className="text-lg text-red-500 text-center font-bold ">
          &#9883; {errorMsg}!
        </h4>
      )}
      <div className="w-full ">
        <InputCard
          label="名稱 Name"
          placeholder="請輸入你Line群組裡的名稱"
          type="text"
          name="name"
          onChange={(inputValue) => setName(inputValue)}
          disabled={isSubmitting ? true : false}
        />
        <InputCard
          label="信箱 Email"
          placeholder="請輸入你的信箱"
          type="email"
          name="email"
          onChange={(inputValue) => setEmail(inputValue)}
          disabled={isSubmitting ? true : false}
        />
        <InputCard
          label="密碼 Password"
          placeholder="請輸入你的密碼"
          type="password"
          name="password"
          onChange={(inputValue) => setPassword(inputValue)}
          disabled={isSubmitting ? true : false}
        />
        <InputCard
          label="再次確認密碼 Confirm password"
          placeholder="請再次輸入你的密碼"
          type="password"
          name="passwordCheck"
          onChange={(inputValue) => setPasswordCheck(inputValue)}
          disabled={isSubmitting ? true : false}
        />
      </div>

      <div className="w-4/5 mx-auto relative">
        <SubmitBtn submit="註冊 Sign Up" onSubmit={handleSignUp} />
        {isSubmitting && (
          <svg
            className="absolute right-5 top-1/4 animate-spin h-5 w-5 border-slate-500 border-t-slate-200 rounded-full border-2"
            viewBox="0 0 24 24"
          ></svg>
        )}
      </div>

      <div className="w-4/5 mx-auto mt-4  ">
        <p className="text-center link" onClick={() => go("/login")}>
          取消
        </p>
      </div>
    </AuthContainer>
  );
};

export default Register;
