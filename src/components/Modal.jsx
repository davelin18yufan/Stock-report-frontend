import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useRef, useState, memo } from "react"
import { setCurrentTab } from "slices/mainSlice"
import { useAppDispatch } from "hooks/store"
import { usePostingMutation } from "services/postService"
import { usePostReportMutation } from "services/reportService"

function Modal({ open, setOpen, modal }) {
  // input
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  const [stock, setStock] = useState(null)
  const [from, setFrom] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [fileSrc, setFileSrc] = useState(null)
  const [previewURL, setPreviewURL] = useState("")
  // flow control
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  //initialization
  const fileInputRef = useRef(null)
  const dispatch = useAppDispatch()
  const [
    createPost,
    { isLoading: isPostCreating, isError: isPostingError, error: postError },
  ] = usePostingMutation()
  const [
    createReport,
    { isLoading: isReportCreating, isError: isReportError, error: reportError },
  ] = usePostReportMutation()

  const handleClose = () => {
    setOpen(false)
    setShowErrorMsg(false)
    setErrorMsg("")
    // 清除輸入匡
    if (fileSrc) {
      fileInputRef.current.value = ""
      setFileSrc(null)
    }
  }

  function handleUploadFile(e) {
    const selectedImg = e.target.files[0]
    // 轉成網址
    const imgURL = URL.createObjectURL(selectedImg)
    setPreviewURL(imgURL)
    setFileSrc(selectedImg)
  }

  const handleClear = (e) => {
    e.preventDefault()
    // 清除輸入匡
    setPreviewURL(null)
    setFileSrc(null)
    fileInputRef.current.value = ""
  }

  function handlePostChange(e) {
    if (e.currentTarget) {
      setPost(e.target.value)
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleStockChange(e) {
    setStock(e.target.value)
  }

  function handleFromChange(e) {
    setFrom(e.target.value)
  }

  function handlePublishDateChange(e) {
    setPublishDate(e.target.value)
  }

  async function handlePostSubmit() {
    if (title.trim().length === 0 || post.trim().length === 0) {
      setShowErrorMsg(true)
      setErrorMsg("欄位不可空白!")
      return
    }

    if (title.length > 30 || post.length > 800) {
      setShowErrorMsg(true)
      setErrorMsg("字數超過上限!")
      return
    }
    // 使用 formData格式送出
    const formData = new FormData()
    formData.append("title", title)
    formData.append("post", post)
    formData.append("image", fileSrc)
    const { data } = await createPost(formData)

    if (data) {
      // 成功關掉視窗
      //一段時間過後自己關掉
      setOpen(false)
      setShowErrorMsg(false)
      setErrorMsg("")
      fileInputRef.current.value = ""
      dispatch(setCurrentTab("post"))
    }
  }

  async function handleReportSubmit() {
    // error check
    if (title.length === 0 || post.length === 0) {
      setShowErrorMsg(true)
      setErrorMsg("標題或是內容空白！")
      return
    }

    if (title.length > 100 || post.length > 3000) {
      setShowErrorMsg(true)
      setErrorMsg("字數超過上限!")
      return
    }

    if (publishDate.length !== 8) {
      setShowErrorMsg(true)
      setErrorMsg("出版日期格式錯誤!")
      return
    }

    // fetch
    const { data } = await createReport({
      title,
      from,
      publishDate: publishDate.toString(),
      stock,
      report: post,
    })
    if (data) {
      setOpen(false)
      setShowErrorMsg(false)
      setErrorMsg("")
      dispatch(setCurrentTab("report"))
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {modal === "post" && (
          <>
            <DialogTitle align="center">發布新貼文</DialogTitle>
            <DialogContent>
              <DialogContentText align="center">
                分享是種提升自己的方法
              </DialogContentText>
              {/* 前端檢查錯誤 */}
              {showErrorMsg ? (
                <DialogContentText color="error">{errorMsg}</DialogContentText>
              ) : null}
              {/* 伺服器端檢查錯誤 */}
              {isPostingError ? (
                <DialogContentText color="error">
                  {postError.data.message}
                </DialogContentText>
              ) : null}
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="標題"
                type="text"
                fullWidth
                variant="standard"
                placeholder="請寫出你的標題"
                required
                helperText="字數上限30"
                onChange={handleTitleChange}
                disabled={isPostCreating ? true : false}
              />
              <TextField
                autoFocus
                margin="dense"
                id="post"
                label="發文"
                type="text"
                fullWidth
                variant="filled"
                placeholder="請說出你的想法"
                rows="5"
                multiline
                required
                helperText="字數上限700"
                onChange={handlePostChange}
                disabled={isPostCreating ? true : false}
              />
              <TextField
                autoFocus
                margin="dense"
                id="image"
                type="file"
                fullWidth
                variant="standard"
                label={fileSrc ? "尚未上傳" : "選擇檔案"}
                onChange={handleUploadFile}
                helperText="可上傳一張照片"
                inputRef={fileInputRef}
                disabled={isPostCreating ? true : false}
              />
              {fileSrc ? (
                <div className="relative">
                  <img
                    className="w-full h-full"
                    src={previewURL}
                    alt="uploading"
                  />
                  <button
                    className="text-sky-600 rounded-lg bg-gray-300 w-full mt-2 py-0.5 cursor-pointer hover:bg-gray-400"
                    onClick={handleClear}
                  >
                    清除
                  </button>
                </div>
              ) : null}
            </DialogContent>
          </>
        )}
        {modal === "report" && (
          <>
            <DialogTitle align="center">上傳新報告</DialogTitle>
            <DialogContent>
              <DialogContentText align="center">閱讀掘金</DialogContentText>
              {/* 前端檢查 */}
              {showErrorMsg ? (
                <DialogContentText color="error">{errorMsg}</DialogContentText>
              ) : null}
              {/* 伺服器端檢查 */}
              {isReportError ? (
                <DialogContentText color="error">
                  {reportError.data.message}
                </DialogContentText>
              ) : null}
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="標題"
                type="text"
                fullWidth
                variant="standard"
                placeholder="請寫出標題"
                required
                helperText="字數上限50"
                disabled={isReportCreating ? true : false}
                onChange={handleTitleChange}
              />
              <TextField
                margin="normal"
                id="from"
                label="出處"
                type="text"
                fullWidth
                variant="standard"
                placeholder="報告出處"
                disabled={isReportCreating ? true : false}
                onChange={handleFromChange}
              />
              <TextField
                margin="normal"
                id="publishDate"
                label="撰寫日期"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="撰寫日期"
                helperText="格式：19110101"
                disabled={isReportCreating ? true : false}
                onChange={handlePublishDateChange}
              />
              <TextField
                margin="normal"
                id="stock"
                label="股票代號"
                type="number"
                fullWidth
                variant="outlined"
                placeholder="股票代號"
                disabled={isReportCreating ? true : false}
                onChange={handleStockChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="report"
                label="報告內容"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="請張貼報告內容"
                rows="5"
                multiline
                required
                disabled={isReportCreating ? true : false}
                onChange={handlePostChange}
              />
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={isPostCreating || isReportCreating ? true : false}
          >
            取消
          </Button>
          {modal === "post" ? (
            <Button onClick={handlePostSubmit}>
              {isPostCreating ? "送出中.." : "發佈"}
            </Button>
          ) : (
            <Button onClick={handleReportSubmit}>
              {isReportCreating ? "上傳中.." : "上傳"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default memo(Modal)
