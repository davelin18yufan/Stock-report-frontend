import { MainContainer } from "../../components/MainContainer"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import ScrollToTopBtn from "../../components/ScrollToTopBtn"
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getStocks } from "../../apis/stock"

export const SearchBar = ({onSearch, value, setValue}) => {
  return(
    <div className="w-full p-2 flex mx-auto border-b-4 border-slate-400/25 ">
      <Button variant="contained" color="inherit" onClick={() => setValue("")}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
      </Button>
      <h3 className="text-lg ml-4 my-auto sm:text-xl dark:text-neutral-300">搜尋股票以查看報告</h3>
      <label htmlFor="stock-search" className="ml-3 my-auto w-1/3 sm:w-2/5 lg:ml-8 ">
        <input 
          id="stock-search" 
          type="text" 
          placeholder="輸入代號或股名" 
          value={value} 
          className=" p-2 border-2 rounded-md focus:border-blue-500" 
          onChange={onSearch}>
        </input>
      </label>
    </div>
  )
}

const StockItem = ({stock}) => {
  const go = useNavigate()
  return(
    <li 
      className="w-[110px] h-[30px] m-2 truncate outline outline-2 outline-offset-2 outline-cyan-700/70 rounded-sm text-slate-500 bg-card dark:text-amber-400 dark:outline-cyan-500/50 dark:bg-slate-600" 
      onClick={() => go(`${stock.symbol}`)}>
      {stock.symbol} {stock.name}
    </li>
  )
}


const StockList = ({searchTerm}) => {
  const [ loadedStocks, setLoadedStocks ] = useState([])
  const [ startIndex, setStartIndex ] = useState(0)
  const [ endIndex, setEndIndex ] = useState(100)
  const containerRef = useRef(null)
  const scrollRef = useRef(null)

  const filteredItem = loadedStocks.filter(item => 
    item.name.toLowerCase().trim().includes(searchTerm.toLowerCase()) || item.symbol.toString().includes(searchTerm))
  const visibleStocks = filteredItem.slice(startIndex, endIndex)
  
  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const start = Math.floor(scrollTop / 40);
    let end = start + Math.floor(clientHeight / 8) + 1;
    if (end > filteredItem.length) {
      end = filteredItem.length; // 確保 end 索引不超過數據範圍
    }
    setStartIndex(start)
    setEndIndex(end)
    console.log(scrollTop, clientHeight)
  }

  useEffect(() => {
    async function getStocksAsync(){
      try{
        const {success, data} = await getStocks()
        if(success){
          setLoadedStocks(data)
        }  
      }catch(err){
        console.log(err)
      }
    }
    getStocksAsync()
  }, [])
  
  return (
    <div ref={containerRef} className="w-full p-2 h-screen overflow-y-auto scrollbar-y" onScroll={handleScroll}>
      <ul  ref={scrollRef} className="flex flex-wrap h-full" >
        {visibleStocks.map((item, index) => 
          <StockItem stock={item} searchTerm={searchTerm} key={index}/>
        )}
      </ul>
    </div>
  )
}
// 有需要使用再來渲染
const LazyStockList = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ default: StockList })
    }, 2000) // 模擬一個延遲載入的情況
  })
})

const MainSector = () => {
  const [ searchTerm, setSearchTerm ] = useState("")

  function handleSearch(e){
    setSearchTerm(e.target.value)
  }


  return(
    <div className="w-full h-screen overflow-y-auto relative">
      <SearchBar onSearch={handleSearch} value={searchTerm} setValue={setSearchTerm}/>
      <Suspense fallback={<p className="animate-pulse text-amber-600 text-xl ml-4 mt-4">Loading...</p>}>
        <LazyStockList searchTerm={searchTerm} />
      </Suspense>
    </div>
  )
}

const StockPage = () => {
  return(
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row  dark:bg-slate-800 ">
        <Navbar />
        <MainSector />
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
)
}

export default StockPage