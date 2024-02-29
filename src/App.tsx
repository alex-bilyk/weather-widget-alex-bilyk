import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './context/AuthContext'

import {
  Home,
  SignUp,
} from './pages'

import './App.css'
import './assets/scss/main.scss'

function App() {
  const { isLoggedIn } = useAuth()

  let redirectRoute = <Navigate to={isLoggedIn ? '/' : '/signup'} />

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={!isLoggedIn ? <SignUp /> : redirectRoute} />
        <Route path="/" element={isLoggedIn ? <Home /> : redirectRoute} />
        <Route path="*" element={redirectRoute} />
      </Routes>
    </Router>
  )
}

export default App
