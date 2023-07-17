import { axiosInstance, baseURL } from "./index";
import { Post, PostPayload } from "types/user";

export async function getPosts() {
  try {
    const res = await axiosInstance.get(`${baseURL}/post`);
    if (res.status === "success") {
      return { success: true, data: res.data as Post[] };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.error("getPosts failed", err);
    return { success: false, message: err as string };
  }
}

export async function getSinglePost(postId: number) {
  try {
    const res = await axiosInstance.get(`${baseURL}/post/${postId}`);
    if (res.status === "success") {
      return { success: true, data: res.data as Post };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.error("get single post failed", err);
    return { success: false, message: err as string };
  }
}

export async function posting(payload: PostPayload<string>) {
  try {
    const { title, post, image } = payload;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axiosInstance.post(
      `${baseURL}/post`,
      {
        title,
        post,
        image,
      },
      config,
    );
    const { data } = res;
    if (data.status === "success") {
      return { success: true, data: data.data as Post };
    }
    return { success: false };
  } catch (err) {
    console.error("post failed", err);
    return { success: false, message: err as string };
  }
}

export async function deletePost(postId: number) {
  try {
    const res = await axiosInstance.delete(`${baseURL}/post/${postId}`);

    if (res.status === "success") {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("delete post failed", err);
    return { success: false, message: err as string };
  }
}

export async function favoritePost(postId: number) {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/post/favorite/${postId}`,
    );
    if (res.status === "success") {
      return { success: true };
    } 
  } catch (err) {
    console.error("post favorite failed", err);
    return { success: false, message: err as string };
  }
}

export async function cancelFavoritePost(postId: number) {
  try {
    const res = await axiosInstance.delete(
      `${baseURL}/post/favorite/${postId}`,
    );
    if (res.status === "success") {
      return { success: true };
    } 
  } catch (err) {
    console.error("cancel favorite post failed", err);
    return { success: false, message: err as string };
  }
}
