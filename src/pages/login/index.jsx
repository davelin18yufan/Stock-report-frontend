import {
  LogoTitle,
  InputCard,
  SubmitBtn,
  AuthContainer,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const go = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  async function handleLogin() {
    setIsSubmitting(true);
    if (email.length === 0 || password.length === 0) {
      Swal.fire({
        position: "top",
        title: "欄位不可空白",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "gray",
      });
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    const { success, message } = await login({ email, password });
    if (success) {
      setIsSubmitting(false);
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      return;
    } else {
      setIsSubmitting(false);
      const data =
        message?.status === 401 ? "密碼或信箱錯誤！" : message?.data.message;
      Swal.fire({
        position: "top",
        title: data || "發生錯誤",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "gray",
      });
    }
  }

  // 檢查是否要重新登入
  useEffect(() => {
    if (isAuthenticated) {
      isAdmin ? go("/admin/list") : go("/main");
    }
  }, [go, isAuthenticated, isAdmin]);

  return (
    <AuthContainer>
      <LogoTitle title={isAdmin ? "登入管理者後台" : "登入 Stock Report"} />

      <div className="w-full ">
        <InputCard
          label="帳號 Account"
          placeholder="請輸入你的信箱"
          type="text"
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
      </div>

      <div className="w-4/5 mx-auto relative">
        <SubmitBtn submit="登入 Login" onSubmit={handleLogin} />
        {isSubmitting && (
          <svg
            className="absolute right-5 top-1/4 animate-spin h-5 w-5 border-slate-500 border-t-slate-200 rounded-full border-2"
            viewBox="0 0 24 24"
          ></svg>
        )}
      </div>
      {isAdmin ? (
        <div className="w-4/5 text-end mt-4 mx-auto">
          <p className="link" onClick={() => setIsAdmin(false)}>
            回前台登入
          </p>
        </div>
      ) : (
        <div className="w-4/5 mx-auto mt-4 flex ">
          <p className="flex-1 text-end link" onClick={() => go("/register")}>
            註冊
          </p>
          <span className="block px-[20px]">&#8729;</span>
          <p className="link" onClick={() => setIsAdmin(true)}>
            後台登入
          </p>
        </div>
      )}
    </AuthContainer>
  );
};

export default Login;
