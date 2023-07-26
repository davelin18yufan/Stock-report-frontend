import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { User, Post, Report, ApiResponse } from "types/user"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User", "Post", "Report"],
  endpoints: (builder) => ({
    editUser: builder.mutation<ApiResponse<User>, Partial<Post>>({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    getUserInfo: builder.query<ApiResponse<User>, number>({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getUserPosts: builder.query<ApiResponse<Post[]>, number>({
      query: (id) => `/user/${id}/posts`,
      providesTags: (result) =>
        result
          ? 
            [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : 
            [{ type: "Post", id: "LIST" }],
    }),
    getUserReports: builder.query<ApiResponse<Report[]>, number>({
      query: (id) => `/user/${id}/Reports`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Report" as const,
                id,
              })),
              { type: "Report", id: "LIST" },
            ]
          : [{ type: "Report", id: "LIST" }],
    }),
  }),
})

export const {
  useEditUserMutation,
  useGetUserInfoQuery,
  useGetUserPostsQuery,
  useGetUserReportsQuery,
} = userApi
