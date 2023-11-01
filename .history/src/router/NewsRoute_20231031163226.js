import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
export default function NewsRoute() {
    const element = useRoutes([

        {
            path:'/news',
            element:<Login></Login>
            
        }
      ]
    )
  return (
    element
  )
}
