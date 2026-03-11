import { createContext, useContext, useState } from 'react'
import type { LoginRequest } from '../DTOs/login/login'

interface LoginContextType {
  login: LoginRequest | undefined;
  setLogin: React.Dispatch<React.SetStateAction<LoginRequest | undefined>>;
}

const LoginContext = createContext<LoginContextType | null>(null)

interface LoginProviderProps {
  children: React.ReactNode
}

export function LoginProvider({ children }: LoginProviderProps) {
  const [login, setLogin] = useState<LoginRequest>()

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  )
}

export function useLogin() {
  const context = useContext(LoginContext)
  if (!context) throw new Error('useLogin must be used within an LoginProvider')
  return context
}