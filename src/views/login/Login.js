import React from 'react'
import './login.css'
import axios from 'axios'
import withRoute from '../../components/sandbox/withRoute.js'
import {connect} from 'react-redux'
import LoginForm from './LoginForm';
import jwtDecode from 'jwt-decode'

function Login(props) {
    return (
        <LoginForm loginActions={props.loginActions}  getCategories={props.getCategories} 
            getrolelist={props.getrolelist} getrightlist={props.getrightlist} description={props.description}
            changeNoticeList={props.changeNoticeList}
        ></LoginForm>
    )
};
const mapDispatchToprops = {
    loginActions (value,description){
        return (dispatch) => {
            return axios.post(`${description[0]}`,value).then(
              (res)=>{
                  const token = res.data.token;
                  localStorage.setItem('jwToken',token);
                  localStorage.setItem('expiresIn',res.data.expiresIn);
                  const jwt = jwtDecode(token);
                  dispatch({
                      type:"change_currentuser",
                      payload:{roleId:jwt.roleId,username:jwt.username,region:jwt.region,role:jwt.role}
                  },
                  )
                }
            )
          }
      },
    getCategories () {
      return (dispatch) => {
          return axios.get('/api/categories').then((res)=>{
              dispatch({
                 type:'change_categories',
                 payload:res.data
              })
          })
        }
    },
    getrolelist () {
      return (dispatch) => {
          return axios.get('/api/rolelist').then((res)=>{
              let rolelist = [];
              for(let i = 0; i < 3; i++) {
                  let Irights = res.data[i].rights.split(',')
                  rolelist.push({...res.data[i],rights:Irights});
              }
              dispatch({
                type:'change_rolelist'
                ,payload:rolelist
              })
          })
        }
    },  
    getrightlist() {
      return (dispatch) => {
          return axios.all(['/api/rightlistchildren','/api/rightlist'].map((item)=>axios.get(item)))
          .then(res => {
              res[1].data.forEach(item=>{
                  item.children = [];
                  item.key=item.rightKey;
                  res[0].data.forEach(right => {
                      right.key = right.rightKey;
                      right.rightId == item.id && item.children.push(right)
                  })
               }) 
             dispatch({
                 type:'change_rightlist',
                 payload:res[1].data
              })
            })
        }
    },
    changeNoticeList (noticelist,ws) {
        return (dispatch) => {
            ws.close(1000, '客户端主动断开');  
            dispatch({
                type:'change_noticelist',
                payload:noticelist
            })
        }
    }, 
}
 
export default withRoute(connect(null, mapDispatchToprops)(Login))
