import { useAppSelector } from "./store";
import { useMemo } from "react"

export const useAuth = () => {
  const user = useAppSelector(state => state.authReducer.user)
  
  return useMemo(() => ({user}), [user])
}