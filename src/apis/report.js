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

export async function getReports() {
  try{
    const res = await axiosInstance.get(`${baseUrl}/report`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return {success: false, message: res.data.message}
  }catch(err){
    console.error("get reports failed", err)
  }
}

export async function getSingleReport(reportId){
  try{
    const res = await axiosInstance.get(`${baseUrl}/report/${reportId}`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return {success: false, message: res.data.message}
  }catch(err){
    console.error("get single report failed", err)
  }
}

export async function postReport(payload){
  try{
    const res = await axiosInstance.post(`${baseUrl}/report`, payload)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return {success: false, message: res.data.message}
  }catch(err){
    console.error("post report failed", err)
  }
}