import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
export default function DetailRoute() {
    const element = useRoutes([

        {
            path:'/detail',
            element:<Login></Login>
            
        }
      ]
    )
  return (
    element
  )
}
