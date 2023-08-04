import { InputCard, SubmitBtn } from "components"
import { useState, useRef, useEffect } from "react"
import { useEditUserMutation } from "services/userService"

const initialFormState = {
  name: "",
  email: "",
  password: "",
  passwordCheck: "",
}

const PreviewAvatar = ({
  previewURL,
  onClear,
  size,
}: {
  previewURL: string
  size: number
  onClear: () => void
}) => {
  return (
    <div>
      <img
        className={`w-${size} h-${size} rounded-full mx-auto object-cover`}
        src={previewURL}
        alt="uploading"
      />
      <button
        className="text-sky-600 rounded-lg bg-gray-300 w-full mt-2 py-0.5 cursor-pointer hover:bg-gray-400"
        onClick={onClear}
      >
        清除
      </button>
    </div>
  )
}

const Setting = () => {
  const [formState, setFormState] = useState(initialFormState)
  const [fileSrc, setFileSrc] = useState<string | Blob | File>("")
  const [previewURL, setPreviewURL] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const id = Number(localStorage.getItem("userId"))

  const [editUser, { isLoading }] = useEditUserMutation()

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedImg = e?.target?.files?.[0]
    if (selectedImg) {
      const imgURL = URL.createObjectURL(selectedImg)
      setFileSrc(selectedImg)
      setPreviewURL(imgURL)
    }
  }

  function fileClear() {
    setFileSrc("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit() {
    const { name, email, password, passwordCheck } = formState

    // 密碼輸入不一致
    if (password.trim() !== passwordCheck.trim()) {
      setShowErrorMsg(true)
      setErrorMsg("密碼輸入不一致!")
      return
    }
    // 長度超出上限
    if (name.trim().length > 15) {
      setShowErrorMsg(true)
      setErrorMsg("暱稱輸入超過上限15")
      return
    }

    if (password.trim().length > 15 || passwordCheck.trim().length > 15) {
      setShowErrorMsg(true)
      setErrorMsg("密碼輸入超過上限15")
      return
    }

    // 使用 formData格式送出
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("passwordCheck", passwordCheck)
    formData.append("avatar", fileSrc)

    editUser({ id, body: formData })
      .unwrap()
      .then(() => {
        setShowSuccessMsg(true)
        setShowErrorMsg(false)
        setErrorMsg("修改成功！")
        fileClear()
        return setTimeout(() => {
          setShowSuccessMsg(false)
        }, 3500)
      })
      .catch((error) => {
        setShowErrorMsg(true)
        setShowSuccessMsg(false)
        setErrorMsg(error?.data.message)
      })
      .finally(() => {
        return setTimeout(() => {
          setErrorMsg("")
          setShowErrorMsg(false)
          setShowSuccessMsg(false)
        }, 3500)
      })
  }

  // 離開頁面清除
  useEffect(() => {
    return () => {
      setErrorMsg("")
      setShowErrorMsg(false)
      setShowSuccessMsg(false)
      fileClear()
    }
  }, [])

  return (
    <>
      <div className="lg:ml-10 lg:w-1/2 ">
        <h2 className="text-center font-bold text-xl mt-2 dark:text-white">
          個人資料設定
        </h2>
        <div className="py-4 relative">
          {isLoading && (
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://lottie.host/f2cbb1f7-338b-48ca-a553-c6bee18975eb/fsTMxuEo6D.json"
              style={{
                width: "150px",
                height: "150px",
                position: "absolute",
                left: "40%",
                top: "10%",
              }}
            ></lottie-player>
          )}
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
            onChange={handleChange}
            disabled={isLoading ? true : false}
          />
          <InputCard
            label="信箱 Email"
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
          <InputCard
            label="再次確認密碼 Confirm password"
            placeholder="請再次輸入你的密碼"
            type="password"
            name="passwordCheck"
            onChange={handleChange}
            disabled={isLoading ? true : false}
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
                disabled={isLoading ? true : false}
              />
            </div>
            {/*手機螢幕 */}
            <div className="relative w-4/5 mx-auto sm:hidden">
              {fileSrc ? (
                <PreviewAvatar
                  previewURL={previewURL}
                  size={24}
                  onClear={fileClear}
                />
              ) : null}
            </div>
          </div>
          <div className="w-4/5 mx-auto relative">
            <SubmitBtn submit="確認更改" onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      {/* 中大螢幕 */}
      <div className="relative mx-auto hidden sm:block mt-12 lg:pr-12">
        {fileSrc ? (
          <>
            <PreviewAvatar
              previewURL={previewURL}
              size={40}
              onClear={fileClear}
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
    </>
  )
}

export default Setting
