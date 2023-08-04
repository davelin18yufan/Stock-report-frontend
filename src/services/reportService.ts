import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Report, ApiResponse, ReportPayload } from "types/user";

export const reportApi = createApi({
  reducerPath: "ReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Report"],
  endpoints: (builder) => ({
    getReports: builder.query<ApiResponse<Report[]>, void>({
      query: () => "/report",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Report" as const, id })),
              { type: "Report", id: "LIST" },
            ]
          : [{ type: "Report", id: "LIST" }],
    }),
    getReport: builder.query<ApiResponse<Report>, number>({
      query: (id) => `/report/${id}`,
      providesTags: (result, error, id) => [{ type: "Report", id }],
    }),
    postReport: builder.mutation<ApiResponse<Report>, ReportPayload>({
      query: (newReport) => ({
        url: "/report",
        method: "POST",
        body: newReport,
      }),
      invalidatesTags: [{ type: "Report", id: "LIST" }],
    }),
    deleteReport: builder.mutation<ApiResponse<Report>, number>({
      query: (id) => ({
        url: `/report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Report", id }],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportQuery,
  usePostReportMutation,
  useDeleteReportMutation,
} = reportApi;
