import { LogoTitle, InputCard, SubmitBtn, AuthContainer } from "components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { useLoginMutation } from "services/authService";
import { useAppDispatch } from "hooks/store";
import Swal from "sweetalert2";
import { setCredential } from "slices/authSlice";

const Login = () => {
  const go = useNavigate();
  const { user: currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin() {
    if (formState.email.length === 0 || formState.password.length === 0) {
      setShowErrorMsg(true);
      setErrorMsg("欄位不可空白!");
      return;
    }

    login(formState)
      .unwrap()
      .then((res) => {
        Swal.fire({
          position: "top",
          title: "登入成功！",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        dispatch(setCredential(res.data));
      })
      .catch((error) => {
        setShowErrorMsg(true);
        setErrorMsg(
          error === "Unauthorized" ? "信箱或密碼錯誤" : error.message,
        );
      });
  }

  // 檢查是否要重新登入
  useEffect(() => {
    if (currentUser) {
      return isAdmin ? go("/admin/list") : go("/main");
    }
  }, [go, currentUser, isAdmin]);

  return (
    <AuthContainer>
      <LogoTitle title={isAdmin ? "登入管理者後台" : "登入 Stock Report"} />
      {/* error */}
      {showErrorMsg && (
        <h4 className="text-lg text-red-500 text-center font-bold ">
          &#9883; {errorMsg}!
        </h4>
      )}
      <div className="w-full ">
        <InputCard
          label="帳號 Account"
          placeholder="請輸入你的信箱"
          type="text"
          name="email"
          onChange={handleChange}
          disabled={isLoading ? true : false}
        />
        <InputCard
          label="密碼 Password"
          placeholder="請輸入你的密碼"
          type="password"
          name="password"
          onChange={handleChange}
          disabled={isLoading ? true : false}
        />
      </div>

      <div className="w-4/5 mx-auto relative">
        <SubmitBtn submit="登入 Login" onSubmit={handleLogin} />
        {isLoading && (
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
