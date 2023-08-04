import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Stock, ApiResponse } from "types/user";

export const stockApi = createApi({
  reducerPath: "stockApi",
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
  tagTypes: ["Stock"],
  endpoints: (builder) => ({
    getAllStocks: builder.query<ApiResponse<Stock[]>, void>({
      query: () => "/stock",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Stock" as const, id })),
              { type: "Stock", id: "LIST" },
            ]
          : [{ type: "Stock", id: "LIST" }],
    }),
    getStock: builder.query<ApiResponse<Stock[]>, number>({
      query: (symbol) => `/stock/${symbol}`,
      providesTags: (result, err, symbol) => [{ type: "Stock", id: symbol }],
    }),
  }),
});

export const { useGetStockQuery, useGetAllStocksQuery } = stockApi;
