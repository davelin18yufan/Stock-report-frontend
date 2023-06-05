import axios from "axios"

//const baseUrl = "http://35.236.159.81:3000/api"
const baseUrl = "http://localhost:5000/api"


const axiosInstance = axios.create({ baseUrl })
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
  }
)

export async function getStocks() {
  try {
    const res = await axiosInstance.get(`${baseUrl}/stock`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get stocks failed", err)
  }
}

export async function getSingleStock(symbol){
  try{
    const res = await axiosInstance.get(`${baseUrl}/stock/${symbol}`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.data }
  }catch(err){
    console.error("get single stock failed", err)
  }
}