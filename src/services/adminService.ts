import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Post, Report, ApiResponse } from "types/user";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "Report", "User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getAllPosts: builder.query<ApiResponse<Post[]>, void>({
      query: () => "post",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getAllReports: builder.query<ApiResponse<Report[]>, void>({
      query: () => "report",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Report" as const, id })),
              { type: "Report", id: "LIST" },
            ]
          : [{ type: "Report", id: "LIST" }],
    }),
    deletePost: builder.mutation<ApiResponse<Post>, number>({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    deleteReport: builder.mutation<ApiResponse<Report>, number>({
      query: (id) => ({
        url: `report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Report", id }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetAllReportsQuery,
  useGetAllUsersQuery,
  useDeletePostMutation,
  useDeleteReportMutation,
} = adminApi;
