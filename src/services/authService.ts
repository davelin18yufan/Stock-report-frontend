import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginResponse, UserRequest, ApiResponse } from "types/user"

export const authApi = createApi({
  reducerPath: "authApi",
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
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, UserRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    signUp: builder.mutation<ApiResponse<LoginResponse>, UserRequest>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
})

export const { useLoginMutation, useSignUpMutation } = authApi
