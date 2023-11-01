import React,{useState} from 'react'
import { Form,Button,Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css'


import withRoute from '../../components/sandbox/withRoute.js'




 function LoginForm(props) {
    
    const [error,setError] = useState({});
    const roles = [
      {
        "id": 1,
        "roleName": "超级管理员",
        "roleType": 1,
        "rights": [
          "/user-manage/update",
          "/right-manage",
          "/right-manage/role/list",
          "/right-manage/right/list",
          "/right-manage/role/update",
          "/right-manage/role/delete",
          "/right-manage/right/update",
          "/right-manage/right/delete",
          "/news-manage",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/publish-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset",
          "/user-manage",
          "/user-manage/list",
          "/user-manage/add",
          "/user-manage/delete",
          "/home"
        ]
      },
      {
        "id": 2,
        "roleName": "区域管理员",
        "roleType": 2,
        "rights": [
          "/user-manage",
          "/user-manage/add",
          "/user-manage/delete",
          "/user-manage/update",
          "/user-manage/list",
          "/news-manage",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/home",
          "/publish-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset"
        ]
      },
      {
        "id": 3,
        "roleName": "区域编辑",
        "roleType": 3,
        "rights": [
          "/home",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/audit-manage",
          "/audit-manage/list",
          "/publish-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset",
          "/news-manage"
        ]
      }
    ]
    const onFinish = (value)=> {
      
        props.loginActions(value,roles)
        
        // .then(
        //     ()=>{console.log(22);}
        // )
        .then(
            (r)=>{props.history.push('/home')},
            (s)=>{setError({error:'用户名或者密码错误'})}
            )
        // console.log(value);
        props.getUserList && props.getUserList();

        props.getCategories()
    }

  return (
    <div style={{background:'rgb(35,39,65)',height:'100%',overflow:'hidden'}}>
        {/* //<Particles height={document.documentElement.clientHeight} ></Particles> */}
        
        <div className='formContainer'>
        <div className='logintitle'>全球新闻发布管理系统</div>
        {error && <div className='logintitle'>{error.error}</div>}
        <Form
           name="normal_login"
            className="login-form"
            onFinish={onFinish}
            >
              <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
             </Form.Item>
             <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                  <Input
                         prefix={<LockOutlined className="site-form-item-icon" />}
                         type="password"
                         placeholder="Password"
                         />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
               登录
              </Button>
                Or <a href="">register now!</a>
            </Form.Item>
         </Form>
        </div>
    </div>
  )
}

export default withRoute(LoginForm)