import { useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { auth } from '../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../routes/ProtectedRoute';

function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <>
      </>
    )
  }

  return (
    <Routes>

      <Route path='/' element={<AuthPage/>}/>
      <Route path='/home' element={
        <ProtectedRoute user={user}>
          <HomePage/>
        </ProtectedRoute>
      }/>
      <Route path='/:username' element={<ProfilePage/>}/>
    </Routes>
  )
}

export default App
