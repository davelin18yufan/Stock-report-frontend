import { ReportCard, Side, Loading } from "components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "hooks/store"
import { setCurrentTab } from "slices/mainSlice"
import { useGetStockQuery } from "services/stockSlices"

const MainSector = () => {
  const go = useNavigate()
  const symbol = Number(useParams().symbol)
  const dispatch = useAppDispatch()
  dispatch(setCurrentTab("report"))

  const { data, isLoading } = useGetStockQuery(symbol)
  const stock = data?.data

  return (
    <main className="border-x-2 border-gray-500 basis-3/5 grow w-full">
      <div className="">
        <div className="bg-light-gray px-4 py-2 dark:bg-slate-700 dark:text-neutral-400">
          <div
            className="w-fit cursor-pointer hover:opacity-70 "
            onClick={() => go("/main/stock")}
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            <span className="ml-2">回到搜尋頁面</span>
          </div>
        </div>
        <div className=" h-screen overflow-auto scrollbar-y">
          {isLoading ? (
            <Loading />
          ) : stock[0]?.Reports.id ? (
            stock?.map((item) => (
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
      <Side />
    </div>
  )
}

export default SingleStockPage
