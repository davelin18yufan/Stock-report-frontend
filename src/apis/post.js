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

export async function getPosts() {
  try {
    const res = await axiosInstance.get(`${baseUrl}/post`)  
    if(res.data.status === "success") {
      return { success: true, data: res.data.data }
    }else{
      return { success: false, message: res.data.message }
    }
  }catch(err) {
    console.error("getPosts failed", err)
  }
}

export async function getSinglePost(postId) {
  try {
    const res = await axiosInstance.get(`${baseUrl}/post/${postId}`)
    if(res.data.status === "success") {
      return { success: true, data: res.data.data}
    }else{
      return { success: false, message: res.data.message}
    }
  }catch(err) {
    console.error("get single post failed", err)
  }
}

export async function posting(payload) {
  try {
    const { title, post, image} = payload
    const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }
    const { data } = await axiosInstance.post(`${baseUrl}/post`, {
      title, post, image
    }, config)
    if(data.status === "success") {
      return { success: true, data: data.data }
    }else{
      return { success: false, message: data.message}
    }
  }catch(err) {
    console.error("post failed", err)
  }
}

export async function favoritePost(postId) {
  try {
    const {data} = await axiosInstance.post(`${baseUrl}/post/${postId}`)
    if(data.status === "success") {
      return { success: true }
    }else{
      return { success: false, message: data.message}
    }
  }catch(err){
    console.error("post favorite failed", err)
  }
}

export async function cancelFavoritePost(postId) {
  try {
    const [data] = await axiosInstance.delete(`${baseUrl}/post/${postId}`)
    if(data.status === "success") {
      return { success: true }
    }else{
      return { success: false, message: data.message}
    }
  }catch(err) {
    console.error("cancel favorite post failed", err)
  }
}