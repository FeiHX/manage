import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function withRoute(Component) {
  //props 接受原来在Component组件调用时，赋予它的属性、方法等，
  //延续到withRoute(Component)方法包装过的组件上
  return function(props){
      //v6实现v5的withRoute的简单代码，如 this.props.history.push(`/detail/${id}`)
      const push = useNavigate()
      const param = useParams()
      const location = useLocation()
      return <Component  {...props} history={{push,location,param}}></Component>
  }
}
