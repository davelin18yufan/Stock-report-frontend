import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Modal({open, setOpen, modal}) {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {modal ==="post" &&
        <>
          <DialogTitle>發布新貼文</DialogTitle>
          <DialogContent>
            <DialogContentText>
              分享是種提升自己的方法
            </DialogContentText>
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
              helperText="字數上限20"
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
              helperText="字數上限140"
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              type="file"
              fullWidth
              variant='standard'
            />
          </DialogContent>
        </>}
        {modal === "report" && 
        <>
        <DialogTitle>上傳新報告</DialogTitle>
          <DialogContent>
            <DialogContentText>
              閱讀掘金
            </DialogContentText>
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
              helperText="字數上限20"
            />
            <TextField
              margin="normal"
              id="stock"
              label="股票代號"
              type="number"
              fullWidth
              variant="outlined"
              placeholder="股票代號"
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
            />
          </DialogContent>
        </>}
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose}>發佈</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}