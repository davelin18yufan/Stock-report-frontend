import { login, signUp } from "apis"
import { createContext, useState, useContext, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"
import { User, PayloadProp, LoginResponse, ChildrenProp } from "types/user"

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  signUp: null,
  login: null,
  logout: null,
}

type ApiResponse = {
  success: boolean
  data?: LoginResponse
  message?: string
}

type DefaultContext = {
  isAuthenticated: boolean
  currentUser: User | null
  signUp: ((userInput: PayloadProp) => Promise<ApiResponse>) | null
  login: ((input: PayloadProp) => Promise<ApiResponse>) | null
  logout: (() => void) | null
}

const AuthContext = createContext<DefaultContext>(defaultAuthContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }: ChildrenProp) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState<User | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    // 驗證是否有拿到token
    async function checkToken() {
      const authToken = localStorage.getItem("authToken")
      if (!authToken) {
        setIsAuthenticated(false)
        setPayload(null)
        return
      }
      setIsAuthenticated(true)
      const tempPayload = jwt_decode<User>(authToken)
      setPayload(tempPayload)
    }
    checkToken()
  }, [pathname])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload,
        signUp: async (userInput: PayloadProp) => {
          const res = await signUp({
            name: userInput.name,
            email: userInput.email,
            password: userInput.password,
          })

          const { success, message } = res as ApiResponse
          if (success) {
            return { success }
          }
          return { success, message }
        },
        login: async (input: PayloadProp) => {
          const { success, data, message } = await login({
            email: input.email,
            password: input.password,
          })

          if (!success || data === undefined) {
            return { success, message }
          }
          const tempPayload = jwt_decode<User>(data.token)
          if (!tempPayload) {
            setPayload(null)
            setIsAuthenticated(false)
            return { success: false, message: "驗證失敗" }
          }
          setPayload(tempPayload)
          setIsAuthenticated(true)
          localStorage.setItem("authToken", data.token)
          localStorage.setItem("userId", tempPayload.id.toString())
          return { success: true }
        },
        logout: () => {
          localStorage.removeItem("authToken")
          localStorage.removeItem("userId")
          setPayload(null)
          setIsAuthenticated(false)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
