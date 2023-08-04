import React, { useState, useEffect } from "react"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 監聽頁面滾動事件，檢查是否顯示按鈕
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // 處理回到頁首的函式
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div>
      {isVisible && (
        <button
          className="w-[40px] h-[40px] fixed right-2 bottom-4 rounded-full bg-dark-green dark:bg-slate-400"
          onClick={scrollToTop}
        >
          &#8593;
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton
