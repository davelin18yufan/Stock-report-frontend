import { axiosInstance, baseURL } from "./index";
import { Report, ReportPayload } from "types/user";

export async function getReports() {
  try {
    const res = await axiosInstance.get(`${baseURL}/report`);
    if (res.status === "success") {
      return { success: true, data: res.data as Report[] };
    }
    return { success: false };
  } catch (err) {
    console.error("get reports failed", err);
    return { success: false, message: err as string };
  }
}

export async function getSingleReport(reportId: number) {
  try {
    const res = await axiosInstance.get(`${baseURL}/report/${reportId}`);
    if (res.status === "success") {
      return { success: true, data: res.data as Report };
    }
    return { success: false };
  } catch (err) {
    console.error("get single report failed", err);
    return { success: false, message: err as string };
  }
}

export async function postReport(payload: ReportPayload) {
  try {
    const res = await axiosInstance.post(`${baseURL}/report`, payload);
    if (res.status === "success") {
      return { success: true, data: res.data as Report };
    }
    return { success: false };
  } catch (err) {
    console.error("post report failed", err);
    return { success: false, message: err as string };
  }
}

export async function deleteReport(reportId: number) {
  try {
    const res = await axiosInstance.delete(`${baseURL}/report/${reportId}`);
    if (res.status === "success") {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("delete report failed", err);
    return { success: false, message: err as string };
  }
}
