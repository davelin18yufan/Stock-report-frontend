import { AdminPost, AdminUser, AdminReport } from "types/admin"
import { axiosInstance, baseURL} from "./index"

export async function getAllUsersAdmin(){
  try{
    const res = await axiosInstance.get(`${baseURL}/admin/users`)
    if (res.data){
      return { success: true, data: res.data as AdminUser[]}
    }
  }catch(err){
    console.error("get all users failed", err)
    return { success: false, message: err as string}
    
  }
}

export async function getAllPostsAdmin(){
  try{
    const res = await axiosInstance.get(`${baseURL}/admin/post`)
    if (res.data){
      return { success: true, data: res.data as AdminPost[]}
    }
  }catch(err){
    console.error("get all posts failed", err)
    return { success: false, message: err as string}
  }
}

export async function getAllReportsAdmin(){
  try{
    const res = await axiosInstance.get(`${baseURL}/admin/report`)
    
    if (res.data){
      return { success: true, data: res.data as AdminReport[]}
    }
  }catch(err){
    console.error("get all reports failed", err)
    return { success: false, message: err as string}
  }
}

export async function deletePostAdmin(postId:number){
  try{
    const res = await axiosInstance.delete(`${baseURL}/admin/post/${postId}`)
    if (res.status){
      return { success: true }
    }
  }catch(err){
    console.error("delete post failed", err)
    return { success: false, message: err as string}
  }
}

export async function deleteReportAdmin(reportId:number){
  try{
    const res = await axiosInstance.delete(`${baseURL}/admin/report/${reportId}`)
    if (res.status){
      return { success: true }
    }
  }catch(err){
    console.error("delete report failed", err)
    return { success: false, message: err as string}
  }
}

