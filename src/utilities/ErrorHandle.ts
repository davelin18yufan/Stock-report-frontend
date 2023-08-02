import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

export function checkErrorType(error: any): error is FetchBaseQueryError {
  return error?.status !== undefined && error?.data !== undefined
}


