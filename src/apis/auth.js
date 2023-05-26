import axios from "axios"

//const baseUrl = "http://35.236.159.81:3000/api"
const baseUrl = "http://localhost:5000/api"

const axiosInstance = axios.create({ baseUrl })
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
    }
)

export async function login(payload){
  try{
    const { email, password} = payload
    const { data } = await axiosInstance.post(`${baseUrl}/login`, {
      email,
      password
    })
    const { token } = data

    if(token){
      return {
        success: true,
        ...data
      }
    }else {
      return {
        ...data
      }
    }
    
  }catch(err){
    console.error("login failed", err)
    return { success: false }
  } 
}

export async function signUp(payload){
  try{
    const {name, email, password } = payload
    const { data } = await axiosInstance.post(`${baseUrl}/signup`, {
      name, email, password
    })
    const { token } = data
    if(token){
      return {
        success: true,
        ...data
      }
    }else{
      return data
    }
  }catch(err){
    console.error("signUp failed", err)
    return {success: false}
  }
}

