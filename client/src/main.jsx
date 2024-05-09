import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'


import App from './App.jsx'
import Home from './pages/Home'
import About from './pages/About.jsx'
import Games from './pages/Games'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SingleThread from './pages/SingleThread'
import Profile from './pages/Profile'
import Error from './pages/Error'

import './assets/styles/Johnstyle.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Games/>
      },
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      }, 
      {
        path: '/signup',
        element: <Signup/>
      }, 
      {
        path: '/me',
        element: <Profile/>
      }, 
      {
        path: '/profiles/:username',
        element: <Profile/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/threads/:threadId',
        element: <SingleThread/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
