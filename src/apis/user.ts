import { axiosInstance, baseURL } from "./index";
import { PayloadProp, User, Post, Report } from "types/user";

export async function editUser(userId: number, payload: PayloadProp) {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axiosInstance.put(
      `${baseURL}/user/${userId}`,
      payload,
      config,
    );

    if (res.status === "success") {
      return { success: true, data: res.data as User };
    }
    return { success: false };
  } catch (err) {
    console.error("edit user error", err);
    return { success: false, message: err as string };
  }
}

export async function getUserInfo(userId: number) {
  try {
    const res = await axiosInstance.get(`${baseURL}/user/${userId}`);
    if (res.status === "success") {
      return { success: true, data: res.data as User };
    }
    return { success: false };
  } catch (err) {
    console.error("get user info failed", err);
    return { success: false, message: err as string };
  }
}

export async function getUserPosts(userId: number) {
  try {
    const res = await axiosInstance.get(`${baseURL}/user/${userId}/posts`);
    if (res.status === "success") {
      return { success: true, data: res.data as Post[] };
    }
    return { success: false };
  } catch (err) {
    console.error("get user posts failed", err);
    return { success: false, message: err as string };
  }
}

export async function getUserReports(userId: number) {
  try {
    const res = await axiosInstance.get(`${baseURL}/user/${userId}/reports`);
    if (res.status === "success") {
      return { success: true, data: res.data as Report[] };
    }
    return { success: false };
  } catch (err) {
    console.error("get user reports failed", err);
    return { success: false, message: err as string };
  }
}
