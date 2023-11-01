import React from 'react'
import {useRoutes} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Redirect from './Redirect'
export default function IndexRouter() {
    const element = useRoutes([

        {
            path:'/',
            element:<AuthComponent><NewsSandBox></NewsSandBox></AuthComponent>
            
        }
      ]
    )
    function AuthComponent({children}) {
        const isLogin = localStorage.getItem('jwtToken')
       
        return isLogin?children:<Redirect to='/login'></Redirect>
    }

  return (
    element
  )
}
