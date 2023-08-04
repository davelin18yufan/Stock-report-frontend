import { LogoTitle, InputCard, SubmitBtn, AuthContainer } from "components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSignUpMutation } from "services/authService";
import { useAuth } from "hooks/useAuth";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  passwordCheck: "",
};

const Register = () => {
  const go = useNavigate();
  const { user: currentUser } = useAuth();
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formState, setFormState] = useState(initialFormState);
  const [signUp, { isLoading }] = useSignUpMutation();

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignUp() {
    const { name, password, email, passwordCheck } = formState;
    // 前端檢查輸入
    if (
      name.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      passwordCheck.length === 0
    ) {
      setShowErrorMsg(true);
      setErrorMsg("欄位不可空白!");
      return;
    }
    // 密碼輸入不一致
    if (password.trim() !== passwordCheck.trim()) {
      setShowErrorMsg(true);
      setErrorMsg("密碼輸入不一致!");
      return;
    }
    // 長度超出上限
    if (name.trim().length > 15) {
      setShowErrorMsg(true);
      setErrorMsg("暱稱輸入超過上限15");
      return;
    }
    if (password.trim().length > 15 || passwordCheck.trim().length > 15) {
      setShowErrorMsg(true);
      setErrorMsg("密碼輸入超過上限15");
      return;
    }

    signUp(formState)
      .unwrap()
      .then((res) => {
        Swal.fire({
          position: "top",
          title: "註冊成功！請重新登入",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "green",
        });
        return go("/login");
      })
      .catch((error) => {
        setShowErrorMsg(true);
        setErrorMsg(error.message);
      });
  }

  // 離開頁面清除
  useEffect(() => {
    return () => {
      setErrorMsg("");
      setShowErrorMsg(false);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      go("/main");
    }
  }, [go, currentUser]);

  return (
    <AuthContainer>
      <LogoTitle title="建立屬於你的帳號" />
      {/* error */}
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
          onChange={handleChange}
          disabled={isLoading ? true : false}
        />
        <InputCard
          label="信箱 Email"
          placeholder="請輸入你的信箱"
          type="email"
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
        <InputCard
          label="再次確認密碼 Confirm password"
          placeholder="請再次輸入你的密碼"
          type="password"
          name="passwordCheck"
          onChange={handleChange}
          disabled={isLoading ? true : false}
        />
      </div>

      <div className="w-4/5 mx-auto relative">
        <SubmitBtn submit="註冊 Sign Up" onSubmit={handleSignUp} />
        {isLoading && (
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
