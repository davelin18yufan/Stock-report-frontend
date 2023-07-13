import {axiosInstance, baseURL} from "./index"
import { PayloadProp, LoginResponse } from "types/user"

export async function login(payload: PayloadProp){
  try{
    const { email, password} = payload
    const res = await axiosInstance.post(`${baseURL}/login`, {
      email,
      password
    })
    
    const { token } = res.data
    if(token){
      return {
        success: true,
        data: res.data as LoginResponse
      }
    }else {
      return {
        success: false,
      }
    }
    
  }catch(err){
    console.error("login failed", err)
    return { success: false, message: err as string}
  } 
}

export async function signUp(payload: PayloadProp){
  try{
    const {name, email, password } = payload
    const res = await axiosInstance.post(`${baseURL}/signup`, {
      name, email, password
    })
    const { token } = res.data
    if(token){
      return {
        success: true,
        data: res.data as LoginResponse
      }
    }else{
      return res
    }
  }catch(err){
    console.error("signUp failed", err)
    return { success: false, message: err as string}
  }
}

