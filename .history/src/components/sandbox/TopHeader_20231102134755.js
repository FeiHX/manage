import React from 'react'
import { Layout ,Dropdown} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import withRoute from './withRoute';

import IndexRouter from '../../router/IndexRouter';
import {connect} from 'react-redux'
import {  notification } from 'antd';

const { Header } = Layout;
const socket = new WebSocket('ws://localhost:8080');

  // 监听WebSocket消息

function TopHeader(props) {
  const [api, contextHolder] = notification.useNotification();
  socket.addEventListener('message', (event) => {
    const news = event.data;
    // document.getElementById('newsTitle').innerText = news;
    openNotification(news)
});
const openNotification = (news) => {
  api.open({
    message: news,
    description:
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
    duration: 2,
  });
};
  


  
  const changeCollapsed = () => {

   props.changeCollapsed();
  }
  const items = [
    {
      key: '1',
      label: <div>{
        props.username
        }</div>,
    },
    {
      key: '2',
      danger: true,
      label: '退出',
      onClick:(e)=>{
           localStorage.removeItem('jwtToken')
           
     
           return <IndexRouter></IndexRouter>
         }
    
    },
  ];
  return (
    <Header
          style={{
            padding: '0,16px',
            backgroundColor:'white',
            
          }}
        >
          
          {
            props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={changeCollapsed}></MenuFoldOutlined>
          }

          {/* websocket 服务器通知客户端，临时突发新闻弹窗 */}
          {contextHolder}
                    
          <div style={{float:'right'}}>
            <span >欢迎<span style={{color:'#1890ff'}}>{
            props.username
            }</span>回来</span>
            <Dropdown
              menu={{
              items,
              }}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          

                    
          </div>
          
        </Header>
  )
}




const mapStateToProps = ({CollApsedReducer:{isCollapsed},setCurrentUserReducer:{username}}) => {
  
  return {
    isCollapsed,username
  }
}

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type:"change_collapsed",
      
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRoute((TopHeader)))
//把一个对象，其属性是子组件要(取消)订阅的变量，映射到子组件的props上，子组件可以通过props.属性名使用变量，
//而connect帮助子组件对这个属性进行(取消)订阅,getState操作

//把一个返回action对象的方法映射到子组件的props上，子组件通过 props.方法名 调用，
//connect用这个方法返回的action对象，帮子组件进行dispatch操作

//connect()()高阶组件组件把mapStateToProps的属性和mapDispatchToProps的方法，
//通过父传子的方法传给包裹的子组件，子组件内通过props.属性和props.方法()访问
//并且帮助子组件订阅和取消订阅以及 getState  mapStateToProps里的属性
//并且帮助子组件dispatch mapDispatchToProps的方法 返回的action对象

//手写简易的connect高阶组件,只是实现传给子组件一些属性(callback方法返回的对象属性)和方法(obj对象中的方法)
// let kewinConnect = (callback,obj) => {
//   let value = callback();
//   return (MyComponent) => {
//       return (props) => {
//           return  <div style={{color:'red'}}>
//                       <MyComponent {...value} {...obj} {...props} ></MyComponent>
//                   </div>
//       }
//   }
// }