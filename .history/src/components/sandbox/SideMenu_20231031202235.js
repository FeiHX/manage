import React,{ useState,} from 'react'
import { Layout, Menu } from 'antd';
import {

  UserOutlined,
  //VideoCameraOutlined,
  //SettingOutlined
} from '@ant-design/icons';
import './index.css'
import withRoute from './withRoute';
import axios from 'axios';
import SubMenu from 'antd/es/menu/SubMenu';
import { connect } from 'react-redux';

const {  Sider } = Layout;

// const menuList = [
//   {
//     key:'/home',
//     title:'首页',
//     icon:<UserOutlined/>,
//   },
//   {
//     key:'/use-manage',
//     title:'用户管理',
//     icon:<UserOutlined/>,
//     children:[
//       {
//       key:'/use-manage/list',
//       title:'用户列表',
//       icon:<UserOutlined/>,
//     }
//   ] 
//   },
//   {
//     key:'/right-manage',
//     title:'权限管理',
//     icon:<UserOutlined/>,
//     children:[
//       {
//       key:'/right-manage/role/list',
//       title:'角色列表',
//       icon:<UserOutlined/>,
//     },
//     {
//       key:'/right-manage/right/list',
//       title:'权限列表',
//       icon:<UserOutlined/>,
//     }
//   ] 
//   }


// ]

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }
 function SideMenu(props) {
  // console.log(props);
  const[menu,setMenu] = useState([])
  const sidemenuList = [
    {
    "id": 1,
    "title": "首页",
    "key": "/home",
    "pagepermission": 1,
    "grade": 1,
    "children": []
    },
    {
    "id": 2,
    "title": "用户管理",
    "key": "/user-manage",
    "pagepermission": 1,
    "grade": 1,
    "children": [
    {
    "id": 3,
    "title": "添加用户",
    "rightId": 2,
    "key": "/user-manage/add",
    "grade": 2
    },
    {
    "id": 4,
    "title": "删除用户",
    "rightId": 2,
    "key": "/user-manage/delete",
    "grade": 2
    },
    {
    "id": 5,
    "title": "修改用户",
    "rightId": 2,
    "key": "/user-manage/update",
    "grade": 2
    },
    {
    "id": 6,
    "title": "用户列表",
    "rightId": 2,
    "key": "/user-manage/list",
    "pagepermission": 1,
    "grade": 2
    }
    ]
    },
    {
    "id": 7,
    "title": "权限管理",
    "key": "/right-manage",
    "pagepermission": 1,
    "grade": 1,
    "children": [
    {
    "id": 8,
    "title": "角色列表",
    "rightId": 7,
    "key": "/right-manage/role/list",
    "pagepermission": 1,
    "grade": 2
    },
    {
    "id": 9,
    "title": "权限列表",
    "rightId": 7,
    "key": "/right-manage/right/list",
    "pagepermission": 1,
    "grade": 2
    },
    {
    "id": 10,
    "title": "修改角色",
    "rightId": 7,
    "key": "/right-manage/role/update",
    "grade": 2
    },
    {
    "id": 11,
    "title": "删除角色",
    "rightId": 7,
    "key": "/right-manage/role/delete",
    "grade": 2
    },
    {
    "id": 12,
    "title": "修改权限",
    "rightId": 7,
    "key": "/right-manage/right/update",
    "grade": 2
    },
    {
    "id": 13,
    "title": "删除权限",
    "rightId": 7,
    "key": "/right-manage/right/delete",
    "grade": 2
    }
    ]
    },
    {
    "id": 14,
    "title": "新闻管理",
    "key": "/news-manage",
    "pagepermission": 1,
    "grade": 1,
    "children": [
    {
    "id": 15,
    "title": "新闻列表",
    "rightId": 14,
    "key": "/news-manage/list",
    "grade": 2
    },
    {
    "id": 16,
    "title": "撰写新闻",
    "rightId": 14,
    "key": "/news-manage/add",
    "grade": 2,
    "pagepermission": 1
    },
    {
    "id": 17,
    "title": "新闻更新",
    "rightId": 14,
    "key": "/news-manage/update/:id",
    "grade": 2,
    "routepermisson": 1
    },
    {
    "id": 18,
    "title": "新闻预览",
    "rightId": 14,
    "key": "/news-manage/preview/:id",
    "grade": 2,
    "routepermisson": 1
    },
    {
    "id": 19,
    "title": "草稿箱",
    "rightId": 14,
    "key": "/news-manage/draft",
    "pagepermission": 1,
    "grade": 2
    },
    {
    "id": 20,
    "title": "新闻分类",
    "rightId": 14,
    "key": "/news-manage/category",
    "pagepermission": 1,
    "grade": 2
    }
    ]
    },
    {
    "id": 21,
    "title": "审核管理",
    "key": "/audit-manage",
    "pagepermission": 1,
    "grade": 1,
    "children": [
    {
    "id": 22,
    "title": "审核新闻",
    "rightId": 21,
    "key": "/audit-manage/audit",
    "pagepermission": 1,
    "grade": 2
    },
    {
    "id": 23,
    "title": "审核列表",
    "rightId": 21,
    "key": "/audit-manage/list",
    "pagepermission": 1,
    "grade": 2
    }
    ]
    },
    {
    "id": 24,
    "title": "发布管理",
    "key": "/publish-manage",
    "pagepermission": 1,
    "grade": 1,
    "children": [
    {
    "id": 25,
    "title": "待发布",
    "rightId": 24,
    "key": "/publish-manage/unpublished",
    "pagepermission": 1,
    "grade": 2
    },
    {
    "id": 26,
    "title": "已发布",
    "rightId": 24,
    "key": "/publish-manage/published",
    "pagepermission": 1,
    "grade": 2
    },
    {
    "id": 27,
    "title": "已下线",
    "rightId": 24,
    "key": "/publish-manage/sunset",
    "pagepermission": 1,
    "grade": 2
    }
    ]
    }
    ]
    const LocalRouterMap = [
      '/home',
      '/user-manage/list',
      '/right-manage/role/list',
      '/right-manage/right/list',
      "/news-manage/add",
      "/news-manage/draft",
      "/news-manage/category",
      "/audit-manage/audit",
      "/audit-manage/list",
      "/publish-manage/unpublished",
      "/publish-manage/published",
      "/publish-manage/sunset",
    ]
  //  //2396 1415改=========
  // useEffect(()=>{
  //   axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
  //     // console.log(res.data)
  //      //setMenu(res.data.filter(item=>item.pagepermisson===1))
  //     // console.log(res.data.filter(item=>item.pagepermisson===1))
  //     setMenu(res.data)
  //     })
  // },[])
  //  //2396 1415改=========
//checkPagePermission确认当前登录用户是否拥有某项配置的展示权限
    // /230905 1613改/ const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
   const checkPagePermission = (item,props) => {
    // console.log(props,222);
    //console.log(item.pagepermission === 1)
    //  //2396 1415改=========
    // /230905 1613改/return item.pagepermission === 1 &&  rights.includes(item.key)
    //  //2396 1415改=========return  true// /230905 1613改/
    return item.pagepermission === 1 && props.rights?.includes(item.key) 
  }
  const checkRoute = (item,list) => {
    return list?.includes(item.key)
  }
  const iconList = {
    '/home':<UserOutlined/>,
    '/user-manage/list':<UserOutlined/>,
    '/right-manage/role/list':<UserOutlined/>,
  }
  const renderMenu = (menuList,props,list)=>{
    // console.log(props,1111);
    return menuList.map(item=>{
      if(item.children?.length>0 && checkPagePermission(item,props)) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {renderMenu(item.children,props,list)}
        </SubMenu>
      }else{
        if(checkRoute(item,list)){
          return <Menu.Item key={item.key} icon={iconList[item.key]}>{item.title}</Menu.Item> // /230905 1613改/
        }
        
      }
      // /230905 1613改/return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]}>{item.title}</Menu.Item>
    
    })
  }
  // const [collapsed ] = useState(false);

  //console.log(props.history.location.pathname)
  const selectKeys = [props.history.location.pathname]
  const openKeys = ['/'+props.history.location.pathname.split('/')[1]]
// console.log(props)
console.log('侧边栏重新渲染')
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
        <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
          <div className="logo" >全球新闻发布管理系统</div>
          <div style={{flex:1,"overflow":"auto"}}> 
             <Menu
                onClick={(e)=>{
                 props.history.push(e.key)
                }}
                theme="dark"
                mode="inline"
                selectedKeys={selectKeys}
                defaultOpenKeys={openKeys}
                //items={menu}
              >
                {renderMenu(sidemenuList,props,LocalRouterMap)}
              </Menu>
            </div>
        </div>
      </Sider>
  )
}
const mapStateToProps = ({CollApsedReducer:{isCollapsed},CurrentRightsReducer:{rights}}) => {
  
  return {
    isCollapsed,rights
  }
}
export default connect(mapStateToProps)(withRoute(SideMenu))