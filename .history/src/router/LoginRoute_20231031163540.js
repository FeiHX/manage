import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
import News from '../views/news/News'
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
        element:<Deta
        
    }
      ]
    )
  return (
    element
  )
}
