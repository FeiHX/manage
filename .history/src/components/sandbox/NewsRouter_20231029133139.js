// import React, { useEffect, useState } from 'react'
// import {useRoutes} from 'react-router-dom'
// import Redirect from '../../router/Redirect'
// import Home from '../../views/sandbox/home/Home.js'
// import RightList from '../../views/sandbox/right-manage/RightList.js'
// import RoleList from '../../views/sandbox/right-manage/RoleList.js'
// import UserList from '../../views/sandbox/use-manage/UserList.js'
// import NoPermission from '../../views/sandbox/nopermission/NoPermission.js'
// import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
// import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
// import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
// import Audit from '../../views/sandbox/audit-manage/Audit'
// import AuditList from '../../views/sandbox/audit-manage/AuditList'
// import Unpublish from '../../views/sandbox/publish-manage/Unpublish'
// import Sunset from '../../views/sandbox/publish-manage/Sunset'
// import Publish from '../../views/sandbox/publish-manage/Publish'
// import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
// import axios from 'axios'

// import { Spin } from 'antd'
// import { connect } from 'react-redux'


//   // const backelement = 
//   //   [
//   //   //   {
//   //   //       path:'/home',
//   //   //       element:React.lazy(()=> import('../../views/sandbox/home/Home.js'))
//   //   //   },
//   //   //   // {
//   //   //   //   path:'/login',
//   //   //   //   element:<Login></Login>
//   //   //   // },
//   //   //   {
//   //   //       path:'/user-manage/list',
//   //   //       element:React.lazy(()=> import('../../views/sandbox/use-manage/UserList.js'))
          
         
//   //   //  },
//   //   //   {
//   //   //       path:'/right-manage/role/list',
//   //   //       element:React.lazy(()=> import('../../views/sandbox/use-manage/UserList.js'))
//   //   //   },
//   //   //   {
//   //   //       path:'/right-manage/right/list',
//   //   //       element:React.lazy(()=> import('../../views/sandbox/use-manage/UserList.js'))
//   //   //   },

//   //   //   // {
//   //   //   //   path:'/',
//   //   //   //   element:<Redirect to="/home"/>
//   //   //   // },       
//   //   //   //  {
//   //   //   //   path:'*',
//   //   //   //   element:<NoPermission></NoPermission>
//   //   //   // },

//   //   ]
  

// // function LazyLoad(path) {
// //   let Mycomponent = React.lazy(()=> import(path));
// //   console.log(path,Mycomponent)
// //   return <React.Suspense fallback={<>加载中...................</>}>
// //             <Mycomponent></Mycomponent>
// //         </React.Suspense>
// // }
// const LocalRouterMap = {
//   '/home': <Home></Home>,
//   '/user-manage/list':<UserList></UserList>,
//   '/right-manage/role/list':<RoleList></RoleList>,
//   '/right-manage/right/list':<RightList></RightList>,
//   "/news-manage/add":<NewsAdd></NewsAdd>,
//   "/news-manage/draft":<NewsDraft></NewsDraft>,
//   "/news-manage/category":<NewsCategory></NewsCategory>,
//   '/news-manage/preview/:id': <NewsPreview></NewsPreview>,
//   "/audit-manage/audit":<Audit></Audit>,
//   "/audit-manage/list":<AuditList></AuditList>,
//   "/publish-manage/unpublished":<Unpublish></Unpublish>,
//   "/publish-manage/published":<Publish></Publish>,
//   "/publish-manage/sunset":<Sunset></Sunset>,


//   '/':<Redirect to="/home"/>,
//   '*':<NoPermission></NoPermission>,
// }
// // const LocalRouterMap = {
// //   '/home': '../../views/sandbox/home/Home.js',
// //   '/user-manage/list':'../../views/sandbox/use-manage/UserList.js',
// //   '/right-manage/role/list':'../../views/sandbox/right-manage/RoleList.js',
// //   '/right-manage/right/list':'../../views/sandbox/right-manage/RightList.js',
 


// //   '/':'../../router/Redirect',
// //   '*':'../../views/sandbox/nopermission/NoPermission.js',
// // }
//  function NewsRouter(props) {

//   const roles = [
//     {
//       "id": 1,
//       "roleName": "超级管理员",
//       "roleType": 1,
//       "rights": [
//         "/user-manage/update",
//         "/right-manage",
//         "/right-manage/role/list",
//         "/right-manage/right/list",
//         "/right-manage/role/update",
//         "/right-manage/role/delete",
//         "/right-manage/right/update",
//         "/right-manage/right/delete",
//         "/news-manage",
//         "/news-manage/list",
//         "/news-manage/add",
//         "/news-manage/update/:id",
//         "/news-manage/preview/:id",
//         "/news-manage/draft",
//         "/news-manage/category",
//         "/audit-manage",
//         "/audit-manage/audit",
//         "/audit-manage/list",
//         "/publish-manage",
//         "/publish-manage/unpublished",
//         "/publish-manage/published",
//         "/publish-manage/sunset",
//         "/user-manage",
//         "/user-manage/list",
//         "/user-manage/add",
//         "/user-manage/delete",
//         "/home"
//       ]
//     },
//     {
//       "id": 2,
//       "roleName": "区域管理员",
//       "roleType": 2,
//       "rights": [
//         "/user-manage",
//         "/user-manage/add",
//         "/user-manage/delete",
//         "/user-manage/update",
//         "/user-manage/list",
//         "/news-manage",
//         "/news-manage/list",
//         "/news-manage/add",
//         "/news-manage/update/:id",
//         "/news-manage/preview/:id",
//         "/news-manage/draft",
//         "/news-manage/category",
//         "/audit-manage",
//         "/audit-manage/audit",
//         "/audit-manage/list",
//         "/home",
//         "/publish-manage",
//         "/publish-manage/unpublished",
//         "/publish-manage/published",
//         "/publish-manage/sunset"
//       ]
//     },
//     {
//       "id": 3,
//       "roleName": "区域编辑",
//       "roleType": 3,
//       "rights": [
//         "/home",
//         "/news-manage/list",
//         "/news-manage/add",
//         "/news-manage/update/:id",
//         "/news-manage/preview/:id",
//         "/news-manage/draft",
//         "/audit-manage",
//         "/audit-manage/list",
//         "/publish-manage",
//         "/publish-manage/unpublished",
//         "/publish-manage/published",
//         "/publish-manage/sunset",
//         "/news-manage"
//       ]
//     }
//   ]
//   const routeList1 = []
// console.log(props.roleId);
// let list22 = []
//   for(let item of roles) {
//     if(item.roleType === props.roleId) {
//           props.changeRights(item.rights)
      
//         //   for(let data of backelement) {
//         //   console.log(item.rights.includes(data.path));
//         //   if(item.rights.includes(data.path)) {
//         //     list22.push(data);
//         //     }else{
//         //     list22.push({
//         //     path:data.path,
//         //     component:React.lazy(()=>import('../../views/sandbox/nopermission/NoPermission.js'))
//         //                })
//         // }
//         //   }
//       console.log(list22)
//       for (let right of item.rights) {
      
//         if(LocalRouterMap[right]){
//           // console.log(right,'应该有的');
//           console.log(LocalRouterMap[right]);
//           routeList1.push({
//             path:right,
//             component: React.lazy(()=>import(LocalRouterMap[right]))
//           })
//         }else{
//           // console.log(right,'不该有的');
//           routeList1.push({
//                   path:right,
//                   component:React.lazy(()=>import('../../views/sandbox/nopermission/NoPermission.js'))
                  
//                   // <NoPermission></NoPermission>
//                 })
//         }
  
//           }
//     }
//     }
//     // for (let right of item.rights) {
      
//     //   if(LocalRouterMap1[right]){
//     //     // console.log(right,'应该有的');
//     //     console.log(LocalRouterMap[right]);
//     //     routeList1.push({
//     //       path:right,
//     //       component: LocalRouterMap[right]
//     //     })
//     //   }else{
//     //     // console.log(right,'不该有的');
//     //     routeList1.push({
//     //             path:right,
//     //             component:React.lazy(()=>import('../../views/sandbox/nopermission/NoPermission.js'))
                
//     //             // <NoPermission></NoPermission>
//     //           })
//     //   }

//     //     }
//       }
//   }
    
//   console.log(routeList1);
//   let routeList = [...routeList1,{
//               path:'/',
//               component:React.lazy(()=>import('../../router/Redirect'))
//               // <Redirect to="/home"/>
//             },       
//              {
//               path:'*',
//               component:React.lazy(()=>import('../../views/sandbox/nopermission/NoPermission.js'))
//               // <NoPermission></NoPermission>
//             }]
//             console.log(routeList);
//   // let synclist = function(routeList) {
//   //   let list = [];
//   //   console.log(routeList);


//   //   routeList.forEach((route)=>{
//   //     list.push({
//   //       path:route.path,
//   //       element:(
//   //         <React.Suspense fallback={<>加载中...................</>}>
//   //           <route.component></route.component>
//   //         </React.Suspense>
//   //       )
//   //     })
    
//   //   }

//   //   )
//     console.log(list);
//     return list
//   }
//   const element = useRoutes(synclist(routeList1))

// //   const element = useRoutes(
// //     [
      


// //       {
// //           path:'/home',
// //           element:<Home></Home>
// //       },
// //       // {
// //       //   path:'/login',
// //       //   element:<Login></Login>
// //       // },
// //       {
// //           path:'/user-manage/list',
// //           element:LazyLoad('../../views/sandbox/use-manage/UserList.js')
         
// //      },
// //       {
// //           path:'/right-manage/role/list',
// //           element:<RoleList></RoleList>
// //       },
// //       {
// //           path:'/right-manage/right/list',
// //           element:<RightList></RightList>
// //       },
// //       {
// //         path:'/',
// //         element:<Redirect to="/home"/>
// //       },       
// //        {
// //         path:'*',
// //         element:<NoPermission></NoPermission>
// //       },

// //     ]
  
// // )
// // /230905 1613改/==========
// // const [BackRouteList,setBackRouteList]= useState([])
// // useEffect(()=>{
// //   Promise.all([
// //               axios.get('http://localhost:5000/rights'),
// //               axios.get('http://localhost:5000/children'),
// //       ]).then(res=>{
// //                 // console.log(res)
// //                 setBackRouteList([...res[0].data,...res[1].data])
// //                 // console.log([...res[0].data,...res[1].data])
// //                 // console.log(BackRouteList)
// //                })
// // },[])
// // //console.log(BackRouteList)
// // const routeList1 = []
// // const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
// // const checkRoute = (item) => {
// // //检查配置项是否启用
// // return  LocalRouterMap[item.key] && item.pagepermission
// // }
// // const checkUserPermission = (item) => {
// // //检查当前登陆用户的权限列表中是否有该项权限
// // return rights.includes(item.key)
// // }
// // for (const item of BackRouteList) {
// //   if(checkRoute(item) && checkUserPermission(item)) {
// //     routeList1.push({
// //       path:item.key,
// //       element:LocalRouterMap[item.key]
// //     })
// //   }else{
// //     routeList1.push({
// //       path:item.key,
// //       element:<NoPermission></NoPermission>
// //     })
// //   }
  
// // }
// // //console.log(routeList)
// // //加上路由重定向和通配符路径
// // const routeList = [...routeList1,
// //         {
// //           path:'/',
// //           element:<Redirect to="/home"/>
// //         },       
// //          {
// //           path:'*',
// //           element:<NoPermission></NoPermission>
// //         },]
// // const element = useRoutes(routeList)
// // //  const routeList = [
// // //     BackRouteList.map(item=>
// // //       {
// // //       path:item.key,
// // //       element:LocalRouterMap[item.key]
// // //     }),
// // //   ]
// // /230905 1613改/==============

// // console.log(props.roleId)
//   return   (<Spin spinning={props.isLoading}>
//               {element}
//             </Spin>)

  
// }

// const mapStateToProps = ({LoadingReducer:{isLoading},setCurrentUserReducer:{roleId}})=>{
//   return{
//       isLoading,roleId
//     }
  
// }
// const mapDispatchToProps = {
//   changeRights(rights) {
//     return {
//       type:"change_rights",
//       payload:rights
//     }//action
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(NewsRouter)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.//

import React, { useEffect, useState } from 'react'
import {useRoutes} from 'react-router-dom'
import Redirect from '../../router/Redirect'

// import Home from '../../views/sandbox/home/Home.js'
// import RightList from '../../views/sandbox/right-manage/RightList.js'
// import RoleList from '../../views/sandbox/right-manage/RoleList.js'
// import UserList from '../../views/sandbox/use-manage/UserList.js'
// import NoPermission from '../../views/sandbox/nopermission/NoPermission.js'
// import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
// import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
// import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
// import Audit from '../../views/sandbox/audit-manage/Audit'
// import AuditList from '../../views/sandbox/audit-manage/AuditList'
// import Unpublish from '../../views/sandbox/publish-manage/Unpublish'
// import Sunset from '../../views/sandbox/publish-manage/Sunset'
// import Publish from '../../views/sandbox/publish-manage/Publish'

import axios from 'axios'
import { Spin } from 'antd'
import { connect } from 'react-redux'
const  Home   = React.lazy(()=>import('../../views/sandbox/home/Home.js'))
const   RightList  = React.lazy(()=>import('../../views/sandbox/right-manage/RightList.js'))
const  RoleList   = React.lazy(()=>import('../../views/sandbox/right-manage/RoleList.js'))
const    UserList  = React.lazy(()=>import('../../views/sandbox/use-manage/UserList.js'))
const   NoPermission  = React.lazy(()=>import('../../views/sandbox/nopermission/NoPermission.js'))
const   NewsAdd  = React.lazy(()=>import('../../views/sandbox/news-manage/NewsAdd'))
const   NewsDraft   = React.lazy(()=>import('../../views/sandbox/news-manage/NewsDraft'))
const NewsPreview = React.lazy(()=)
const   NewsCategory   = React.lazy(()=>import('../../views/sandbox/news-manage/NewsCategory'))
const  Audit   = React.lazy(()=>import('../../views/sandbox/audit-manage/Audit'))

const    AuditList = React.lazy(()=>import('../../views/sandbox/audit-manage/AuditList'))
const   Unpublish  = React.lazy(()=>import('../../views/sandbox/publish-manage/Unpublish'))
const    Sunset = React.lazy(()=>import('../../views/sandbox/publish-manage/Sunset'))
const   Publish  = React.lazy(()=>import('../../views/sandbox/publish-manage/Publish'))

const LocalRouterMap = {
  '/home':<Home></Home>,
  '/user-manage/list':<UserList></UserList>,
  '/right-manage/role/list':<RoleList></RoleList>,
  '/right-manage/right/list':<RightList></RightList>,
  "/news-manage/add":<NewsAdd></NewsAdd>,
  "/news-manage/draft":<NewsDraft></NewsDraft>,
  "/news-manage/category":<NewsCategory></NewsCategory>,
  "/news-manage/preview/:id":<NewsPreview></NewsPreview>,
  "/audit-manage/audit":<Audit></Audit>,
  "/audit-manage/list":<AuditList></AuditList>,
  "/publish-manage/unpublished":<Unpublish></Unpublish>,
  "/publish-manage/published":<Publish></Publish>,
  "/publish-manage/sunset":<Sunset></Sunset>,


  '/':<Redirect to="/home"/>,
  '*':<NoPermission></NoPermission>,
}

 function NewsRouter(props) {

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
  const routeList1 = []
console.log(props.roleId);
  for(let item of roles) {
    if(item.roleType === props.roleId) {
      props.changeRights(item.rights)
      for (let right of item.rights) {
        if(LocalRouterMap[right]){
          // console.log(right,'应该有的');
          routeList1.push({
            path:right,
            element:LocalRouterMap[right]
          })
        }else{
          // console.log(right,'不该有的');
          routeList1.push({
                  path:right,
                  element:<NoPermission></NoPermission>
                })
        }
  
          }
        }
    }
  // console.log(routeList1);
  let routeList = [...routeList1,{
              path:'/',
              element:<Redirect to="/home"/>
            },       
             {
              path:'*',
              element:<NoPermission></NoPermission>
            }]
  const element = useRoutes(routeList)
//   const element = useRoutes(
//     [
      


//       {
//           path:'/home',
//           element:<Home></Home>
//       },
//       // {
//       //   path:'/login',
//       //   element:<Login></Login>
//       // },
//       {
//           path:'/user-manage/list',
//           element:<UserList></UserList>
//      },
//       {
//           path:'/right-manage/role/list',
//           element:<RoleList></RoleList>
//       },
//       {
//           path:'/right-manage/right/list',
//           element:<RightList></RightList>
//       },
//       {
//         path:'/',
//         element:<Redirect to="/home"/>
//       },       
//        {
//         path:'*',
//         element:<NoPermission></NoPermission>
//       },

//     ]
  
// )
// /230905 1613改/==========
// const [BackRouteList,setBackRouteList]= useState([])
// useEffect(()=>{
//   Promise.all([
//               axios.get('http://localhost:5000/rights'),
//               axios.get('http://localhost:5000/children'),
//       ]).then(res=>{
//                 // console.log(res)
//                 setBackRouteList([...res[0].data,...res[1].data])
//                 // console.log([...res[0].data,...res[1].data])
//                 // console.log(BackRouteList)
//                })
// },[])
// //console.log(BackRouteList)
// const routeList1 = []
// const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
// const checkRoute = (item) => {
// //检查配置项是否启用
// return  LocalRouterMap[item.key] && item.pagepermission
// }
// const checkUserPermission = (item) => {
// //检查当前登陆用户的权限列表中是否有该项权限
// return rights.includes(item.key)
// }
// for (const item of BackRouteList) {
//   if(checkRoute(item) && checkUserPermission(item)) {
//     routeList1.push({
//       path:item.key,
//       element:LocalRouterMap[item.key]
//     })
//   }else{
//     routeList1.push({
//       path:item.key,
//       element:<NoPermission></NoPermission>
//     })
//   }
  
// }
// //console.log(routeList)
// //加上路由重定向和通配符路径
// const routeList = [...routeList1,
//         {
//           path:'/',
//           element:<Redirect to="/home"/>
//         },       
//          {
//           path:'*',
//           element:<NoPermission></NoPermission>
//         },]
// const element = useRoutes(routeList)
// //  const routeList = [
// //     BackRouteList.map(item=>
// //       {
// //       path:item.key,
// //       element:LocalRouterMap[item.key]
// //     }),
// //   ]
// /230905 1613改/==============

// console.log(props.roleId)



  return  <React.Suspense fallback={<>加载中...................</>}>
            <Spin spinning={props.isLoading}>
                          {element}
                        </Spin>
  </React.Suspense>
}

// return  (<Spin spinning={props.isLoading}>
//               {element}
//             </Spin>)
// }

const mapStateToProps = ({LoadingReducer:{isLoading},setCurrentUserReducer:{roleId}})=>{
  return{
      isLoading,roleId
    }
  
}
const mapDispatchToProps = {
  changeRights(rights) {
    return {
      type:"change_rights",
      payload:rights
    }//action
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewsRouter)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
// import React, { useEffect, useState } from 'react'
// import {useRoutes} from 'react-router-dom'
// import Redirect from '../../router/Redirect'
// import Home from '../../views/sandbox/home/Home.js'
// import RightList from '../../views/sandbox/right-manage/RightList.js'
// import RoleList from '../../views/sandbox/right-manage/RoleList.js'
// import UserList from '../../views/sandbox/use-manage/UserList.js'
// import NoPermission from '../../views/sandbox/nopermission/NoPermission.js'
// import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
// import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
// import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
// import Audit from '../../views/sandbox/audit-manage/Audit'
// import AuditList from '../../views/sandbox/audit-manage/AuditList'
// import Unpublish from '../../views/sandbox/publish-manage/Unpublish'
// import Sunset from '../../views/sandbox/publish-manage/Sunset'
// import Publish from '../../views/sandbox/publish-manage/Publish'
// import axios from 'axios'
// import { Spin } from 'antd'
// import { connect } from 'react-redux'
// const LocalRouterMap = {
//   '/home':<Home></Home>,
//   '/user-manage/list':<UserList></UserList>,
//   '/right-manage/role/list':<RoleList></RoleList>,
//   '/right-manage/right/list':<RightList></RightList>,
//   "/news-manage/add":<NewsAdd></NewsAdd>,
//   "/news-manage/draft":<NewsDraft></NewsDraft>,
//   "/news-manage/category":<NewsCategory></NewsCategory>,
//   "/audit-manage/audit":<Audit></Audit>,
//   "/audit-manage/list":<AuditList></AuditList>,
//   "/publish-manage/unpublished":<Unpublish></Unpublish>,
//   "/publish-manage/published":<Publish></Publish>,
//   "/publish-manage/sunset":<Sunset></Sunset>,


//   '/':<Redirect to="/home"/>,
//   '*':<NoPermission></NoPermission>,
// }

//  function NewsRouter(props) {

//   const roles = [
//     {
//       "id": 1,
//       "roleName": "超级管理员",
//       "roleType": 1,
//       "rights": [
//         "/user-manage/update",
//         "/right-manage",
//         "/right-manage/role/list",
//         "/right-manage/right/list",
//         "/right-manage/role/update",
//         "/right-manage/role/delete",
//         "/right-manage/right/update",
//         "/right-manage/right/delete",
//         "/news-manage",
//         "/news-manage/list",
//         "/news-manage/add",
//         "/news-manage/update/:id",
//         "/news-manage/preview/:id",
//         "/news-manage/draft",
//         "/news-manage/category",
//         "/audit-manage",
//         "/audit-manage/audit",
//         "/audit-manage/list",
//         "/publish-manage",
//         "/publish-manage/unpublished",
//         "/publish-manage/published",
//         "/publish-manage/sunset",
//         "/user-manage",
//         "/user-manage/list",
//         "/user-manage/add",
//         "/user-manage/delete",
//         "/home"
//       ]
//     },
//     {
//       "id": 2,
//       "roleName": "区域管理员",
//       "roleType": 2,
//       "rights": [
//         "/user-manage",
//         "/user-manage/add",
//         "/user-manage/delete",
//         "/user-manage/update",
//         "/user-manage/list",
//         "/news-manage",
//         "/news-manage/list",
//         "/news-manage/add",
//         "/news-manage/update/:id",
//         "/news-manage/preview/:id",
//         "/news-manage/draft",
//         "/news-manage/category",
//         "/audit-manage",
//         "/audit-manage/audit",
//         "/audit-manage/list",
//         "/home",
//         "/publish-manage",
//         "/publish-manage/unpublished",
//         "/publish-manage/published",
//         "/publish-manage/sunset"
//       ]
//     },
//     {
//       "id": 3,
//       "roleName": "区域编辑",
//       "roleType": 3,
//       "rights": [
//         "/home",
//         "/news-manage/list",
//         "/news-manage/add",
//         "/news-manage/update/:id",
//         "/news-manage/preview/:id",
//         "/news-manage/draft",
//         "/audit-manage",
//         "/audit-manage/list",
//         "/publish-manage",
//         "/publish-manage/unpublished",
//         "/publish-manage/published",
//         "/publish-manage/sunset",
//         "/news-manage"
//       ]
//     }
//   ]
//   const routeList1 = []
// console.log(props.roleId);
//   for(let item of roles) {
//     if(item.roleType === props.roleId) {
//       props.changeRights(item.rights)
//       for (let right of item.rights) {
//         if(LocalRouterMap[right]){
//           // console.log(right,'应该有的');
//           routeList1.push({
//             path:right,
//             element:LocalRouterMap[right]
//           })
//         }else{
//           // console.log(right,'不该有的');
//           routeList1.push({
//                   path:right,
//                   element:<NoPermission></NoPermission>
//                 })
//         }
  
//           }
//         }
//     }
//   // console.log(routeList1);
//   let routeList = [...routeList1,{
//               path:'/',
//               element:<Redirect to="/home"/>
//             },       
//              {
//               path:'*',
//               element:<NoPermission></NoPermission>
//             }]
//   const element = useRoutes(routeList)
// //   const element = useRoutes(
// //     [
      


// //       {
// //           path:'/home',
// //           element:<Home></Home>
// //       },
// //       // {
// //       //   path:'/login',
// //       //   element:<Login></Login>
// //       // },
// //       {
// //           path:'/user-manage/list',
// //           element:<UserList></UserList>
// //      },
// //       {
// //           path:'/right-manage/role/list',
// //           element:<RoleList></RoleList>
// //       },
// //       {
// //           path:'/right-manage/right/list',
// //           element:<RightList></RightList>
// //       },
// //       {
// //         path:'/',
// //         element:<Redirect to="/home"/>
// //       },       
// //        {
// //         path:'*',
// //         element:<NoPermission></NoPermission>
// //       },

// //     ]
  
// // )
// // /230905 1613改/==========
// // const [BackRouteList,setBackRouteList]= useState([])
// // useEffect(()=>{
// //   Promise.all([
// //               axios.get('http://localhost:5000/rights'),
// //               axios.get('http://localhost:5000/children'),
// //       ]).then(res=>{
// //                 // console.log(res)
// //                 setBackRouteList([...res[0].data,...res[1].data])
// //                 // console.log([...res[0].data,...res[1].data])
// //                 // console.log(BackRouteList)
// //                })
// // },[])
// // //console.log(BackRouteList)
// // const routeList1 = []
// // const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
// // const checkRoute = (item) => {
// // //检查配置项是否启用
// // return  LocalRouterMap[item.key] && item.pagepermission
// // }
// // const checkUserPermission = (item) => {
// // //检查当前登陆用户的权限列表中是否有该项权限
// // return rights.includes(item.key)
// // }
// // for (const item of BackRouteList) {
// //   if(checkRoute(item) && checkUserPermission(item)) {
// //     routeList1.push({
// //       path:item.key,
// //       element:LocalRouterMap[item.key]
// //     })
// //   }else{
// //     routeList1.push({
// //       path:item.key,
// //       element:<NoPermission></NoPermission>
// //     })
// //   }
  
// // }
// // //console.log(routeList)
// // //加上路由重定向和通配符路径
// // const routeList = [...routeList1,
// //         {
// //           path:'/',
// //           element:<Redirect to="/home"/>
// //         },       
// //          {
// //           path:'*',
// //           element:<NoPermission></NoPermission>
// //         },]
// // const element = useRoutes(routeList)
// // //  const routeList = [
// // //     BackRouteList.map(item=>
// // //       {
// // //       path:item.key,
// // //       element:LocalRouterMap[item.key]
// // //     }),
// // //   ]
// // /230905 1613改/==============

// // console.log(props.roleId)
//   return   <Spin spinning={props.isLoading}>
//               {element}
//             </Spin>

  
// }

// const mapStateToProps = ({LoadingReducer:{isLoading},setCurrentUserReducer:{roleId}})=>{
//   return{
//       isLoading,roleId
//     }
  
// }
// const mapDispatchToProps = {
//   changeRights(rights) {
//     return {
//       type:"change_rights",
//       payload:rights
//     }//action
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(NewsRouter)
