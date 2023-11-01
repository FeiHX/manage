import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
import News from '../views/news/News'
export default function NewsRoute() {
    const element = useRoutes([

        {
            path:'/news',
            element:<News></News>
            
        }
      ]
    )
  return (
    element
  )
}
