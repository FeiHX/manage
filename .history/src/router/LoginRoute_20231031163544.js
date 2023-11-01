import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
import News from '../views/news/News'
import Detail from '../views/news/Detail'
export default function LoginRoute() {
    const element = useRoutes([

        {
            path:'/login',
            element:<Login></Login>
            
        },
        {
          path:'/news',
          element:<News></News>
          
      },
      {
        path:'/detail',
        element:<Detail></Detail>
        
    }
      ]
    )
  return (
    element
  )
}
