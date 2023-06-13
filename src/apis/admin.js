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

export async function getAllUsersAdmin(){
  try{
    const res = await axiosInstance.get(`${baseUrl}/admin/users`)
    if (res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get all users failed", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function getAllPostsAdmin(){
  try{
    const res = await axiosInstance.get(`${baseUrl}/admin/post`)
    if (res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get all posts failed", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function getAllReportsAdmin(){
  try{
    const res = await axiosInstance.get(`${baseUrl}/admin/report`)
    if (res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get all reports failed", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function deletePostAdmin(postId){
  try{
    const res = await axiosInstance.delete(`${baseUrl}/admin/post/${postId}`)
    if (res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("delete post failed", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function deleteReportAdmin(reportId){
  try{
    const res = await axiosInstance.delete(`${baseUrl}/admin/report/${reportId}`)
    if (res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("delete report failed", err)
    return { success: false, message: err.response.data.message}
  }
}

