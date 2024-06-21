import { useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { auth } from '../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../routes/ProtectedRoute';

function App() {
  const [authUser] = useAuthState(auth);
  console.log(authUser);

  return (
    <Routes>

      <Route path='/' element={<AuthPage/>}/>
      <Route path='home' element={
        <ProtectedRoute user={authUser}>
          <HomePage/>
        </ProtectedRoute>
      }/>
      
    </Routes>
  )
}

export default App
