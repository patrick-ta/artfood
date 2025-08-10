import { useState } from 'react'
import { createBrowserRouter, Navigate, Routes, Route, RouterProvider } from 'react-router-dom'
import { auth } from '../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage';
import UploadPage from '../pages/UploadPage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../routes/ProtectedRoute';
import PostPage from '../pages/PostPage';


function App() {
  const [user, loading, error] = useAuthState(auth);

  const router = createBrowserRouter([
    {path: '/', element: <AuthPage/>},
    {path: '/home', element: 
      <ProtectedRoute user={user}>
        <HomePage/>
      </ProtectedRoute>},
    {path: '/upload', element:
      <ProtectedRoute user={user}>
        <UploadPage/>
      </ProtectedRoute>},
    {path: '/:username', element: <ProfilePage/>},
    {path: '/post/:postId', element: <PostPage/>},
  ]);

  if (loading) {
    return (
      <>
      </>
    )
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App
