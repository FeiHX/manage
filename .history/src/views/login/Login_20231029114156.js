import React from 'react'
import { Form,Button,Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css'
//import Particles from 'react-particles-js'
import axios from 'axios'
import withRoute from '../../components/sandbox/withRoute.js'
import { connect} from 'react-redux'
import LoginForm from './LoginForm';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'

// const express = require('express')
// //const router = express.Router()
// //const auth = require('../../middleware/auth')
// const jwt = require('jsonwebtoken')
// //const User = require('../../models/User')
// const { body, validationResult } = require('express-validator')
// const config = require('config')
// const bcrypt = require('bcryptjs')



  //const jwt = require('jsonwebtoken');
// function generateToken(usename,password) {
//   const token = jwt.sign({
//     usename,
//     password
//   },'@#$%',24*60*60)
//   return token
// }
 function Login(props) {

  return (
    <LoginForm loginActions={props.loginActions} ></LoginForm>
  )
}
const mapDispatchToprops ={
 
 

    loginActions (value,roles){
      console.log(value);
      return  (dispatch)=> {
         return axios.post('/api/users',value)
         .then(
          (res)=>{
            // console.log(res.data);
            const token = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            const jwt = jwtDecode(token);
            // console.log(jwt,1111,dispatch);
           
            dispatch({
              type:"set_current_roleId_username_region",
              payload:{roleId:jwt.roleId,username:jwt.username,region:jwt.region,role:jwt.role}
            },
            dispatch({
              type:"change_roles",
              payload:roles
            })
            dispatch({
              type:get_
            })
            
              //action
            )
          }
        )
      }

  },
  


}
 
export default withRoute(connect(null,mapDispatchToprops)(Login))
// const mapDispatchToprops ={
  
//   loginActions (value){
//     return  (dispatch)=> {
//        return axios.post('/api/users',value)
//        .then(
//         (res)=>{
//           console.log(res.data);
//           const token = res.data;
//           localStorage.setItem('jwtToken',token);
//           setAuthorizationToken(token);
//           const jwt = jwtDecode(token);
//           console.log(jwt,1111,dispatch);
//           dispatch(() => {
//             console.log(jwt.roleId,999);
//             return {
//               type:"change_roleId",
//               payload:jwt.roleId,
//             }//action
//           })
//         }
//       )
//     }


//     // axios.post('/api/users',value)
//     // // console.log(value);
//     // return{
//     //   type:111
//     // }
//   }

// }