const Loading:React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen mx-auto">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-green"></div>
    </div>
  )
}

export default Loading