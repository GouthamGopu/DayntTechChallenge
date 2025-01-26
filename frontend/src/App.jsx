import React from 'react'
import './App.css'
import Login from './components/login/login'
import Register from './components/register/Register'
import Dashboard from './components/dashboard/Dashboard'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const App = () => {


  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
  ])
  
  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App
