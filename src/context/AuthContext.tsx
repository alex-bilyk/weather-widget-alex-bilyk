import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  logIn: () => void
  logOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true'

    setIsLoggedIn(status)
  }, [])

  const logIn = () => {
    localStorage.setItem('isLoggedIn', 'true')

    setIsLoggedIn(true)
  }

  const logOut = () => {
    localStorage.removeItem('isLoggedIn')

    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
