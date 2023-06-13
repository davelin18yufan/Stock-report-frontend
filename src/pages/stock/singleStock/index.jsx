import { MainContainer, Footer, Header, Navbar, ScrollToTopBtn, ReportCard } from "../../../components"
import { Side } from "../../main/component"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleStock } from "../../../apis"


const MainSector = () => {
  const [ stock, setStock ] = useState([])
  const go = useNavigate()
  const symbol = useParams().symbol

  useEffect(() => {
    async function getSingleStockAsync(){
      try{
        const { success, data } = await getSingleStock(symbol)
        if(success){
          setStock(data)
        }
      }catch(err){
        console.log(err)
      }
    }
    getSingleStockAsync()
  }, [symbol])
  return (
    <main className="border-x-2 border-gray-500 basis-3/5">
      <div className="w-full h-screen ">
        <div className="w-full overflow-y-auto scrollbar-y bg-light-gray px-4 py-2 dark:bg-slate-700 dark:text-neutral-400">
          <div className="w-fit cursor-pointer hover:opacity-70 " onClick={() => go("/stock")}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            <span className="ml-2">回到搜尋頁面</span>
          </div>
        </div>
        {
          stock[0]?.Reports?.id ?
            stock.map(item => 
              <ReportCard report={item.Reports} userName={item.Reports.User.name} stockName={item.name} key={item.Reports.id}/>
            )
            :
            <p className="mt-6 animate-bounce w-full text-center dark:text-neutral-500">目前暫無報告~</p>
        }
      </div>
    </main>
  )
}

const SingleStockPage = () => {
  return (
    <MainContainer>
      <Header />
      <div className="h-full flex flex-col sm:flex-row ">
        <Navbar />
        <div className="lg:flex dark:bg-slate-800 dark:text-neutral-300 grow">
          <MainSector />
          <Side currentTab="report"/>
        </div>
      </div>
      <Footer />
      <ScrollToTopBtn />
    </MainContainer>
  )
}

export default SingleStockPage