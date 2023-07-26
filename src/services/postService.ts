import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Post, ApiResponse, PostPayload } from "types/user"

export const postApi = createApi({
  reducerPath: "postApi",
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
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse<Post[]>, void>({
      query: () => "/post",
      providesTags: (result) =>
        result
          ? // successful query
            [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Post", id: "LIST" }],
    }),
    getPost: builder.query<ApiResponse<Post>, number>({
      query: (id) => `/post/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    posting: builder.mutation<ApiResponse<Post>, PostPayload<File>>({
      query: (newPost) => ({
        url: "/post",
        method: "POST",
        body: newPost,
        formData: true,
      }),
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deletePost: builder.mutation<ApiResponse<Post>, number>({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    favoritePost: builder.mutation<ApiResponse<Post>, number>({
      query: (id) => ({
        url: `/post/favorite/${id}`,
        method: "POST"
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }]
    }),
    deleteFavoritePost: builder.mutation<ApiResponse<Post>, number>({
      query: (id) => ({
        url: `/post/favorite/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id}]
    })
  }),
})

export const {
  useGetPostsQuery,
  usePostingMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useFavoritePostMutation,
  useDeleteFavoritePostMutation
} = postApi
