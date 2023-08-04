import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, Suspense, useRef, useState, LazyExoticComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllStocksQuery } from "services/stockSlices";
import { Stock } from "types/user";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = ({
  onSearch,
  value,
  setValue,
}: {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full p-2 flex mx-auto border-b-4 border-slate-400/25 ">
      <Button variant="contained" color="inherit" onClick={() => setValue("")}>
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </Button>
      <h3 className="text-lg ml-4 my-auto sm:text-xl dark:text-neutral-300">
        搜尋股票以查看報告
      </h3>
      <label
        htmlFor="stock-search"
        className="ml-3 my-auto w-1/3 sm:w-2/5 lg:ml-8 "
      >
        <input
          id="stock-search"
          type="text"
          placeholder="輸入代號或股名"
          value={value}
          className=" p-2 border-2 rounded-md focus:border-blue-500"
          onChange={onSearch}
        ></input>
      </label>
    </div>
  );
};

const StockItem = ({ stock }: { stock: Stock }) => {
  const go = useNavigate();
  return (
    <li
      className="w-[110px] h-[30px] m-2 truncate outline outline-2 outline-offset-2 outline-cyan-700/70 rounded-sm text-slate-500 bg-card dark:text-amber-400 dark:outline-cyan-500/50 dark:bg-slate-600"
      onClick={() => go(`${stock.symbol}`)}
    >
      {stock.symbol} {stock.name}
    </li>
  );
};

const StockList = ({ searchTerm }: { searchTerm: string }) => {
  const { data: stocks } = useGetAllStocksQuery();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const loadedStocks = stocks?.data as Stock[];

  const filteredItem = loadedStocks?.filter(
    (item) =>
      item.name.toLowerCase().trim().includes(searchTerm.toLowerCase()) ||
      item.symbol.toString().includes(searchTerm),
  );
  const visibleStocks = filteredItem?.slice(startIndex, endIndex);

  const handleScroll = () => {
    // 畫面最上方跟目前的距離
    const scrollTop = scrollRef.current?.scrollTop as number;
    // 畫面高度
    const clientHeight = scrollRef.current?.clientHeight as number;
    const start = Math.floor(scrollTop / 40); // 一個卡片高度40
    let end = start + Math.floor(clientHeight / 8) + 1;
    if (end > filteredItem?.length) {
      end = filteredItem?.length; // 確保 end 索引不超過數據範圍
    }
    setStartIndex(start);
    setEndIndex(end);
  };

  return (
    <div
      ref={containerRef}
      className="w-full p-2 h-screen overflow-y-auto scrollbar-y"
      onScroll={handleScroll}
    >
      <ul ref={scrollRef} className="flex flex-wrap h-full">
        {visibleStocks?.map((item, index) => (
          <StockItem stock={item} key={index} />
        ))}
      </ul>
    </div>
  );
};
// 有需要使用再來渲染
const LazyStockList: LazyExoticComponent<React.FC<{ searchTerm: string }>> =
  lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ default: StockList });
      }, 2000); // 模擬一個延遲載入的情況
    });
  });

const AllStocks = () => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="w-full h-screen overflow-y-auto relative">
      <SearchBar
        onSearch={handleSearch}
        value={searchTerm}
        setValue={setSearchTerm}
      />
      <Suspense
        fallback={
          <p className="animate-pulse text-amber-600 text-xl ml-4 mt-4">
            Loading...
          </p>
        }
      >
        <LazyStockList searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
};

export default AllStocks;
