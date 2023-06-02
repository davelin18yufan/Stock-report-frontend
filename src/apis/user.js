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

export async function editUser(userId, payload){
  try{
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
    const res = await axiosInstance.put(`${baseUrl}/user/${userId}`, payload, config)
    
    if(res.data.status === "success"){
      return { success: true, data: res.data.data }
    }
    return { success: false, message: res.data.message }

  }catch(err){
    console.error("edit user error", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function getUserInfo(userId){
  try{
    const res = await axiosInstance.get(`${baseUrl}/user/${userId}`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get user info failed", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function getUserPosts(userId){
  try{
    const res = await axiosInstance.get(`${baseUrl}/user/${userId}/posts`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get user posts failed", err)
    return { success: false, message: err.response.data.message}
  }
}

export async function getUserReports(userId){
  try{
    const res = await axiosInstance.get(`${baseUrl}/user/${userId}/reports`)
    if(res.data.status === "success"){
      return { success: true, data: res.data.data}
    }
    return { success: false, message: res.data.message }
  }catch(err){
    console.error("get user reports failed", err)
    return { success: false, message: err.response.data.message}
  }
}