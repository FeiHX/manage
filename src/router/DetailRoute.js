import React from 'react'
import { useRoutes } from 'react-router-dom'
// import Login from '../views/login/Login'
import Detail from '../views/news/Detail'
export default function DetailRoute() {
    const element = useRoutes([

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
