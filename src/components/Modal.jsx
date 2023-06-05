import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef, useState } from 'react';
import { posting } from "../apis/post"
import { postReport } from "../apis/report"
import { useMainContext } from '../contexts/MainContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Modal({open, setOpen, modal}) {
  // input
  const [ title, setTitle ] = useState("")
  const [ post, setPost ] = useState("")
  const [ stock, setStock ] = useState(null)
  const [ from, setFrom ] = useState("")
  const [ publishDate, setPublishDate ] = useState("")
  const [ fileSrc, setFileSrc ] = useState(null)
  const [ previewURL, setPreviewURL ] = useState("")
  // flow control
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ showErrorMsg, setShowErrorMsg ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState("")
  const { setPosts, setReports, setCurrentTab } = useMainContext()
  const go = useNavigate()
  const { currentUser } = useAuth()
  const fileInputRef = useRef(null)
  const handleClose = () => {
    setOpen(false)
    setShowErrorMsg(false)
    setErrorMsg("")
    // 清除輸入匡
    if(fileSrc){
      fileInputRef.current.value= ""
      setFileSrc(null)
    }
  }

  const handleUploadFile = (e) => {
    const selectedImg = e.target.files[0]
    // 轉成網址
    const imgURL = URL.createObjectURL(selectedImg)
    setFileSrc(selectedImg)
    setPreviewURL(imgURL)
  }

  const handleClear = (e) => {
    e.preventDefault()
    // 清除輸入匡
    setPreviewURL(null)
    setFileSrc(null)
    fileInputRef.current.value= ""
  }

  function handlePostChange(e){
    setPost(e.target.value)
  }

  function handleTitleChange(e){
    setTitle(e.target.value)
  }

  function handleStockChange(e) {
    setStock(e.target.value)
  }

  function handleFromChange(e){
    setFrom(e.target.value)
  }

  function handlePublishDateChange(e){
    setPublishDate(e.target.value)
  }

  async function handlePostSubmit(){
    setIsSubmitting(true)
    if (title.trim().length === 0 || post.trim().length === 0) {
      setShowErrorMsg(true)
      setErrorMsg('欄位不可空白!')
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
      return
    }

    if (title.length > 30 || post.length > 800) {
      setShowErrorMsg(true)
      setErrorMsg('字數超過上限!')
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
      return
    }
    try {
      const res = await posting({ title, post, image: fileSrc})
      // 成功關掉視窗
      if(res.success){
        setIsSubmitting(false)

        setPosts((prevPosts) => {
          return [
            {
              id: res.data.id,
              title: res.data.title,
              post: res.data.post,
              image: res.data.image,
              updatedAt: res.data.updatedAt,
              createdAt: res.data.createdAt,
              User: {
                id: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar
              },
            },
            ...prevPosts
          ]
        })
        //一段時間過後自己關掉
        return setTimeout(() => {
          setOpen(false)
          setErrorMsg("")
          setShowErrorMsg(false)
          setIsSubmitting(false)
          fileInputRef.current.value= ""
          setCurrentTab("post")
        }, 1000)
      }
      setErrorMsg(res.message)
      setShowErrorMsg(true)
      setIsSubmitting(false)
      
    }catch(err){
      console.log(err)
    }
  }

  async function handleReportSubmit(){
    setIsSubmitting(true)
    // error check
    if( title.length === 0 || post.length === 0){
      setShowErrorMsg(true)
      setErrorMsg("標題或是內容空白！")
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
      return
    }

    if(title.length > 100 || post.length > 3000) {
      setShowErrorMsg(true)
      setErrorMsg('字數超過上限!')
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
      return
    }

    // fetch
    try{
      const { success, data, message } = await postReport({ 
        title,
        from,
        publishDate: publishDate.toString(),
        stock,
        report: post
      })
      if(success){
        setReports(prevReports => {
          return [
            {
              id: data.id,
              title: data.title,
              from: data.from,
              report: data.report,
              publish_date: data.publish_date,
              createdAt: data.createdAt,
              userId: currentUser.id,
              stockId: data.stockId,
              Stock: {
                name: data.stock_name,
                symbol: stock
              },
              User: {
                  id: currentUser.id,
                  name: currentUser.name
              }
            },
            ...prevReports
          ]
        })
        //清空
        return setTimeout(() => {
          setIsSubmitting(false)
          setOpen(false)
          setErrorMsg("")
          setShowErrorMsg(false)
          go("/main")
          setCurrentTab("report")
        }, 1000)
        
      }
      setErrorMsg(message)
      setShowErrorMsg(true)
      setIsSubmitting(false)
      
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {modal ==="post" &&
        <>
          <DialogTitle align="center">發布新貼文</DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              分享是種提升自己的方法
            </DialogContentText>
            { showErrorMsg ? <DialogContentText color="error" >{errorMsg}</DialogContentText> : null}
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
              disabled={isSubmitting ? true : false}
            />
            <TextField
              autoFocus
              margin="dense"
              id="post"
              label="發文"
              type="text"
              fullWidth
              variant='filled'
              placeholder="請說出你的想法"
              rows="5"
              multiline
              required
              helperText="字數上限700"
              onChange={handlePostChange}
              disabled={isSubmitting ? true : false}
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              type="file"
              fullWidth
              variant='standard'
              label={fileSrc ? "尚未上傳" : "選擇檔案"}
              onChange={handleUploadFile}
              helperText="可上傳一張照片"
              inputRef={fileInputRef}
              disabled={ isSubmitting ? true : false}
            />
            { 
              fileSrc ? 
                <div className="relative">
                  <img className="w-full h-full" src={previewURL} alt="uploading"/> 
                  <button className="text-sky-600 rounded-lg bg-gray-300 w-full mt-2 py-0.5 cursor-pointer hover:bg-gray-400" 
                    onClick={handleClear}>
                    清除
                  </button>
                </div>
                : null
            }
          </DialogContent>
        </>}
        {modal === "report" && 
        <>
          <DialogTitle align="center">上傳新報告</DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              閱讀掘金
            </DialogContentText>
            { showErrorMsg ? <DialogContentText color="error">{errorMsg}</DialogContentText> : null}
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
              disabled={isSubmitting ? true : false}
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
              disabled={isSubmitting ? true : false}
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
              disabled={isSubmitting ? true : false}
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
              disabled={isSubmitting ? true : false}
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
              disabled={isSubmitting ? true : false}
              onChange={handlePostChange}
            />
          </DialogContent>
        </>}
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting ? true : false}>取消</Button>
          {
            modal === "post" ? 
              <Button onClick={handlePostSubmit}>{ isSubmitting ? "送出中.." : "發佈" }</Button>
              :
              <Button onClick={handleReportSubmit}>{ isSubmitting ? "上傳中.." : "上傳" }</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}