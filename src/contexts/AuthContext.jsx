import { login, signUp } from "../apis/auth"
import { createContext, useState, useContext, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useLocation } from "react-router-dom"

const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  signUp: null,
  login: null,
  logout: null
}

const AuthContext = createContext(defaultAuthContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({children}) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ payload, setPayload ] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    // 驗證是否有拿到token
    async function checkToken(){
      const authToken = localStorage.getItem("authToken")
      if(!authToken){
        setIsAuthenticated(false)
        setPayload(null)
        return
      }
      setIsAuthenticated(true)
      const tempPayload = jwt_decode(authToken)
      setPayload(tempPayload)
    }
    checkToken()
  }, [pathname])

  return(
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser: payload ,
      signUp: async (userInput) => {
        const { status, message } = await signUp({
          name: userInput.name,
          email: userInput.email,
          password: userInput.password
        })
        
        if(status === "success") {
          return { success: true }
        }
        return { success: false, message}
      },
      login: async (input) => {
        const { success, data, message } = await login({
          email: input.email,
          password: input.password
        })
        if(!success){
          return { message }
        }
        const tempPayload = jwt_decode(data.token)
        if(!tempPayload){
          setPayload(null)
          setIsAuthenticated(false)
          return { success: false} 
        }
        setPayload(tempPayload)
        setIsAuthenticated(true)
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("userId", tempPayload.id)
        return { success: true }
      },
      logout: () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        setPayload(null)
        setIsAuthenticated(false)
      }
      }}>
      {children}
    </AuthContext.Provider>
  )
}