import { MainContainer } from "../../components/MainContainer"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import ScrollToTopBtn from "../../components/ScrollToTopBtn"
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SearchBar = ({onSearch, value, setValue}) => {
  return(
    <div className="w-full p-2 flex mx-auto border-b-4 border-slate-400/25 ">
      <Button variant="contained" color="inherit" onClick={() => setValue("")}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
      </Button>
      <h3 className="text-lg ml-4 my-auto sm:text-xl dark:text-neutral-300">搜尋股票以查看報告</h3>
      <label htmlFor="stock-search" className="ml-3 my-auto w-1/3 sm:w-2/5 lg:ml-8 ">
        <input id="stock-search" type="text" placeholder="輸入代號或股名" className=" p-2 border-2 rounded-md focus:border-blue-500"  value={value} onChange={onSearch}></input>
      </label>
    </div>
  )
}

const MainSector = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const data = ['Apple', 'Banana', 'Cherry', 'Durian', '1234 尼德科超重','2330 台積電'] //dummy data
  const filteredItem = data.filter(item => item.toLowerCase().trim().includes(searchTerm.toLowerCase()))
  const go = useNavigate()

  function handleSearch(e){
    setSearchTerm(e.target.value)
  }
  return(
    <div className="w-full h-full ">
      <SearchBar onSearch={handleSearch} value={searchTerm} setValue={setSearchTerm}/>
      <ul className="w-full p-2 flex flex-wrap overflow-y-auto">
        {filteredItem.map((item, index) => 
          <li className="w-[110px] m-2 truncate outline outline-2 outline-offset-2 outline-cyan-700/70 rounded-sm text-slate-500 bg-card dark:text-amber-400 dark:outline-cyan-500/50 dark:bg-slate-600" key={index} onClick={() => go("1")}>{item}</li>
        )}
      </ul>
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