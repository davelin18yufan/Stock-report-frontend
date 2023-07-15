import { axiosInstance, baseURL } from "./index"
import { Stock } from "types/user"

export async function getStocks() {
  try {
    const res = await axiosInstance.get(`${baseURL}/stock`)
    if (res.status === "success") {
      return { success: true, data: res.data as Stock[]}
    }
    return { success: false }
  } catch (err) {
    console.error("get stocks failed", err as string)
  }
}

export async function getSingleStock(symbol: number) {
  try {
    const res = await axiosInstance.get(`${baseURL}/stock/${symbol}`)
    if (res.status === "success") {
      return { success: true, data: res.data as Stock }
    }
    return { success: false }
  } catch (err) {
    console.error("get single stock failed", err as string)
  }
}
