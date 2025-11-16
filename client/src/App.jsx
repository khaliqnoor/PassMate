import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { useUser } from '@clerk/clerk-react'
import Login from './pages/Login'

function App() {
  const { isSignedIn } = useUser()

  return (
    <>
      <Routes>
        <Route 
          path='/' 
          element={isSignedIn ? <Home /> : <Navigate to="/login" replace />} 
        />

        <Route 
          path='/login' 
          element={isSignedIn ? <Navigate to="/" replace /> : <Login />} 
        />
      </Routes>
    </>
  )
}

export default App
