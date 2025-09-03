import { useState } from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Notfound from './components/Notfound/Notfound.jsx'
import Layout from './components/Layout/Layout.jsx'
import Profile from './components/Profile/Profile.jsx'
import PostDetails from './components/PostDetails/PostDetails.jsx'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes.jsx'
import ProtectedAuth from './components/protectedAuth/protectedAuth.jsx';
import Navbar from './components/Navbar/Navbar';

function App() {
  const routes = createBrowserRouter([{
    path : "/",element: <Layout/>,children: [
      {index: true, element : <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path: "profile/:id", element: <ProtectedRoutes><Profile/></ProtectedRoutes>},
      {path: "postDetails/:id", element: <ProtectedRoutes><PostDetails/></ProtectedRoutes>},
      {path: "login", element: <ProtectedAuth><Login/></ProtectedAuth>},
      {path: "register", element: <ProtectedAuth><Register/></ProtectedAuth>},
      {path: "*", element: <Notfound/>}
  
    ]
  }])
  return (

    <RouterProvider router={routes}></RouterProvider>

  )
}

export default App
