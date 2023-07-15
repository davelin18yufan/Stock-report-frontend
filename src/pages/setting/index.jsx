import {
  InputCard,
  SubmitBtn,
  Footer,
  Header,
  Navbar,
  MainContainer,
} from "../../components";
import { useState, useRef, useEffect } from "react";
import { editUser } from "../../apis";
import { useAuth } from "../../contexts/AuthContext";

const PreviewAvatar = ({ previewURL, setFileSrc, fileInputRef, size }) => {
  return (
    <div>
      <img
        className={`w-${size} h-${size} rounded-full mx-auto object-cover`}
        src={previewURL}
        alt="uploading"
      />
      <button
        className="text-sky-600 rounded-lg bg-gray-300 w-full mt-2 py-0.5 cursor-pointer hover:bg-gray-400"
        onClick={() => {
          setFileSrc(null);
          fileInputRef.current.value = "";
        }}
      >
        清除
      </button>
    </div>
  );
};

const Setting = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [fileSrc, setFileSrc] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  //flow control
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  const handleUpload = (e) => {
    const selectedImg = e.target.files[0];
    const imgURL = URL.createObjectURL(selectedImg);
    setFileSrc(selectedImg);
    setPreviewURL(imgURL);
  };

  async function handleSubmit() {
    setIsSubmitting(true);

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

    try {
      const { success, message } = await editUser(userId, {
        name,
        email,
        password,
        passwordCheck,
        avatar: fileSrc,
      });
      setIsSubmitting(false);
      if (success) {
        setShowSuccessMsg(true);
        setShowErrorMsg(false);
        setErrorMsg("修改成功！");
        fileInputRef.current.value = "";
        return;
      }
      setShowErrorMsg(true);
      setShowSuccessMsg(false);
      setErrorMsg(message);
    } catch (err) {
      console.log(err);
      throw err; //丟給上層接收
    }
  }

  // 離開頁面清除
  useEffect(() => {
    return () => {
      setErrorMsg("");
      setShowErrorMsg(false);
      setShowSuccessMsg(false);
    };
  }, []);

  return (
    <MainContainer>
      <Header />
      <div className="flex flex-col sm:flex-row dark:bg-slate-800">
        <Navbar />
        <div className="lg:ml-10 lg:w-1/2 ">
          <h2 className="text-center font-bold text-xl mt-2 dark:text-white">
            個人資料設定
          </h2>
          <div className="py-4">
            {showErrorMsg ? (
              <p className="text-center text-red-500">&#9785; {errorMsg}</p>
            ) : null}
            {showSuccessMsg ? (
              <p className="text-center text-yellow-500">&#9787; {errorMsg}</p>
            ) : null}
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
            <InputCard
              label="再次確認密碼 Confirm password"
              placeholder="請再次輸入你的密碼"
              type="password"
              name="passwordCheck"
              onChange={(inputValue) => setPasswordCheck(inputValue)}
              disabled={isSubmitting ? true : false}
            />
            <div className="mb-2">
              <div className="w-4/5 bg-[#F5F8FA] my-4 px-2.5 mx-auto dark:bg-gray-700">
                <label
                  className="block pb-0.5 text-dark-green dark:text-neutral-300"
                  htmlFor="avatar"
                >
                  大頭照Avatar
                </label>
                <input
                  placeholder="選擇你的照片"
                  type="file"
                  name="avatar"
                  onChange={handleUpload}
                  className="inputDefault"
                  ref={fileInputRef}
                  disabled={isSubmitting ? true : false}
                />
              </div>
              {/*手機螢幕 */}
              <div className="relative w-4/5 mx-auto sm:hidden">
                {fileSrc ? (
                  <PreviewAvatar
                    previewURL={previewURL}
                    setFileSrc={setFileSrc}
                    fileInputRef={fileInputRef}
                    size={24}
                  />
                ) : null}
              </div>
            </div>
            <div className="w-4/5 mx-auto relative">
              <SubmitBtn submit="確認更改" onSubmit={handleSubmit} />
              {isSubmitting && (
                <svg
                  className="absolute right-1/3 top-1/4 animate-spin h-5 w-5 border-slate-500 border-t-slate-200 rounded-full border-2"
                  viewBox="0 0 24 24"
                ></svg>
              )}
            </div>
          </div>
        </div>
        {/* 中大螢幕 */}
        <div className="relative mx-auto hidden sm:block mt-12 lg:pr-12">
          {fileSrc ? (
            <>
              <PreviewAvatar
                previewURL={previewURL}
                setFileSrc={setFileSrc}
                fileInputRef={fileInputRef}
                size={40}
              />
              <lottie-player
                autoplay
                loop
                mode="normal"
                src="https://assets3.lottiefiles.com/packages/lf20_wkaoqtgc.json"
                style={{ width: "250px", height: "300px" }}
              ></lottie-player>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </MainContainer>
  );
};

export default Setting;
