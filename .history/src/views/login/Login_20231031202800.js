import React from 'react'
import './login.css'
import axios from 'axios'
import withRoute from '../../components/sandbox/withRoute.js'
import { connect} from 'react-redux'
import LoginForm from './LoginForm';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'

 function Login(props) {

  return (
    <LoginForm loginActions={props.loginActions}  getCategories={props.getCategories}></LoginForm>
  )
}
const mapDispatchToprops ={

    loginActions (value,roles){
  
      return  (dispatch)=> {
         return axios.post('/api/users',value)
         .then(
          (res)=>{
          
            const token = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            const jwt = jwtDecode(token);
      
           
            dispatch({
              type:"set_current_roleId_username_region",
              payload:{roleId:jwt.roleId,username:jwt.username,region:jwt.region,role:jwt.role}
            },
            dispatch({
              type:"change_roles",
              payload:roles
            }),
    
            
              //action
            )
          }
        )
      }

  },
  getCategories (){
    return  (dispatch)=> {
       return axios.get('/api/categories')
        .then((res)=>{
          console.log('get_categories','=========',res)
          dispatch({
            type:'get_categories'
            ,payload:res.data
          })
        })
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