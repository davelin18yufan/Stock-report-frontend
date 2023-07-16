import {
  ReportCard,
  Side,
} from "../../../../components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleStock } from "../../../../apis"
import { useMainContext } from "contexts/MainContext"

const MainSector = () => {
  const [stock, setStock] = useState([])
  const go = useNavigate()
  const symbol = useParams().symbol
  const { setCurrentTab } = useMainContext()

  useEffect(() => {
    async function getSingleStockAsync() {
      try {
        if (symbol === undefined) return
        const { success, data } = await getSingleStock(symbol)
        if (success) {
          setStock(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setCurrentTab("report")
    getSingleStockAsync()
  }, [symbol, setCurrentTab])
  return (
    <main className="border-x-2 border-gray-500 basis-3/5 grow w-full">
      <div className="">
        <div className="bg-light-gray px-4 py-2 dark:bg-slate-700 dark:text-neutral-400">
          <div
            className="w-fit cursor-pointer hover:opacity-70 "
            onClick={() => go("/stock")}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            <span className="ml-2">回到搜尋頁面</span>
          </div>
        </div>
        <div className=" h-screen overflow-auto scrollbar-y">
          {stock[0]?.Reports?.id ? (
            stock.map((item) => (
              <ReportCard report={item.Reports} key={item.Reports.id} />
            ))
          ) : (
            <p className="mt-6 animate-bounce w-full text-center dark:text-neutral-500">
              目前暫無報告~
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

const SingleStockPage = () => {
  return (
    <div className="lg:flex dark:bg-slate-800 dark:text-neutral-300 grow">
      <MainSector />
      <Side currentTab="report" />
    </div>
  )
}

export default SingleStockPage
