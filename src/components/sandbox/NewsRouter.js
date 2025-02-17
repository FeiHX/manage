

// import React from 'react'
// import {HashRouter, Router, useRoutes} from 'react-router-dom'
// import Redirect from '../../router/Redirect'
// import NewsSandBox from '../../views/sandbox/NewsSandBox.js'
// import { Spin } from 'antd'
// import { connect } from 'react-redux'
// import { history, HistoryRouter } from '../../router/history.js'
// import Home from '../../views/sandbox/home/Home.js'
// // const  Home   = React.lazy(()=>import('../../views/sandbox/home/Home.js'))
// const   RightList  = React.lazy(()=>import('../../views/sandbox/right-manage/RightList.js'))
// const  RoleList   = React.lazy(()=>import('../../views/sandbox/right-manage/RoleList.js'))
// const    UserList  = React.lazy(()=>import('../../views/sandbox/use-manage/UserList.js'))
// const   NoPermission  = React.lazy(()=>import('../../views/sandbox/nopermission/NoPermission.js'))
// const   NewsAdd  = React.lazy(()=>import('../../views/sandbox/news-manage/NewsAdd'))
// const   NewsDraft   = React.lazy(()=>import('../../views/sandbox/news-manage/NewsDraft'))
// const NewsPreview = React.lazy(()=>import('../../views/sandbox/news-manage/NewsPreview'))
// const NewsUpdate = React.lazy(()=>import('../../views/sandbox/news-manage/NewsUpdate'))
// const   NewsCategory   = React.lazy(()=>import('../../views/sandbox/news-manage/NewsCategory'))
// const  Audit   = React.lazy(()=>import('../../views/sandbox/audit-manage/Audit'))

// const    AuditList = React.lazy(()=>import('../../views/sandbox/audit-manage/AuditList'))
// const   Unpublish  = React.lazy(()=>import('../../views/sandbox/publish-manage/Unpublish'))
// const    Sunset = React.lazy(()=>import('../../views/sandbox/publish-manage/Sunset'))
// const   Publish  = React.lazy(()=>import('../../views/sandbox/publish-manage/Publish'))

// // const News = React.lazy(()=>import('../../views/news/News.js'))
// // const Detail = React.lazy(()=>import('../../views/news/Detail.js'))


// //尝试////////////////////////////////////////////////////
// import News from '../../views/news/News.js'
// import Detail from '../../views/news/Detail.js'
// import Login from '../../views/login/Login.js'

// // const Ielement = [
// //     {path:'login',element:<Login></Login>},
// //     {path:'news',element:<News></News>},
// //     {path:'detail:id',element:<Detail></Detail>},
// //     {
// //         path:'/',
// //         element:<NewsSandBox></NewsSandBox>,
// //         children:[

// //         ]
// //     }
// // ]
// //尝试/////////////////////////////////




// const LocalRouterMap = {
//   // '/home':<HistoryRouter history={history}>
//   //           <Home></Home>
//   //         </HistoryRouter>,
//   '/home':<Home></Home>,
//   '/user-manage/list':<UserList></UserList>,
//   '/right-manage/role/list':<RoleList></RoleList>,
//   '/right-manage/right/list':<RightList></RightList>,
//   "/news-manage/add":<NewsAdd></NewsAdd>,
//   "/news-manage/draft":<NewsDraft></NewsDraft>,
//   "/news-manage/category":<NewsCategory></NewsCategory>,
//   "/news-manage/preview/:id":<NewsPreview></NewsPreview>,
//   "/news-manage/update/:id":<NewsUpdate></NewsUpdate>,
//   "/audit-manage/audit":<Audit></Audit>,
//   "/audit-manage/list":<AuditList></AuditList>,
//   "/publish-manage/unpublished":<Unpublish></Unpublish>,
//   "/publish-manage/published":<Publish></Publish>,
//   "/publish-manage/sunset":<Sunset></Sunset>,

//   // "/news":<News></News>,
//   // "/Detail":<Detail></Detail>,

//   '/':<Redirect to="/home"/>,
//   '*':<NoPermission></NoPermission>,
// }

//  function NewsRouter(props) {
//   console.log('NewsRouterNewsRouterNewsRouterNewsRouterNewsRouter')
//   // const roles = [
//   //   {
//   //     "id": 1,
//   //     "roleName": "超级管理员",
//   //     "roleType": 1,
//   //     "rights": [
//   //       "/user-manage/update",
//   //       "/right-manage",
//   //       "/right-manage/role/list",
//   //       "/right-manage/right/list",
//   //       "/right-manage/role/update",
//   //       "/right-manage/role/delete",
//   //       "/right-manage/right/update",
//   //       "/right-manage/right/delete",
//   //       "/news-manage",
//   //       "/news-manage/list",
//   //       "/news-manage/add",
//   //       "/news-manage/update/:id",
//   //       "/news-manage/preview/:id",
//   //       "/news-manage/draft",
//   //       "/news-manage/category",
//   //       "/audit-manage",
//   //       "/audit-manage/audit",
//   //       "/audit-manage/list",
//   //       "/publish-manage",
//   //       "/publish-manage/unpublished",
//   //       "/publish-manage/published",
//   //       "/publish-manage/sunset",
//   //       "/user-manage",
//   //       "/user-manage/list",
//   //       "/user-manage/add",
//   //       "/user-manage/delete",
//   //       "/home"
//   //     ]
//   //   },
//   //   {
//   //     "id": 2,
//   //     "roleName": "区域管理员",
//   //     "roleType": 2,
//   //     "rights": [
//   //       "/user-manage",
//   //       "/user-manage/add",
//   //       "/user-manage/delete",
//   //       "/user-manage/update",
//   //       "/user-manage/list",
//   //       "/news-manage",
//   //       "/news-manage/list",
//   //       "/news-manage/add",
//   //       "/news-manage/update/:id",
//   //       "/news-manage/preview/:id",
//   //       "/news-manage/draft",
//   //       "/news-manage/category",
//   //       "/audit-manage",
//   //       "/audit-manage/audit",
//   //       "/audit-manage/list",
//   //       "/home",
//   //       "/publish-manage",
//   //       "/publish-manage/unpublished",
//   //       "/publish-manage/published",
//   //       "/publish-manage/sunset"
//   //     ]
//   //   },
//   //   {
//   //     "id": 3,
//   //     "roleName": "区域编辑",
//   //     "roleType": 3,
//   //     "rights": [
//   //       "/home",
//   //       "/news-manage/list",
//   //       "/news-manage/add",
//   //       "/news-manage/update/:id",
//   //       "/news-manage/preview/:id",
//   //       "/news-manage/draft",
//   //       "/audit-manage",
//   //       "/audit-manage/list",
//   //       "/publish-manage",
//   //       "/publish-manage/unpublished",
//   //       "/publish-manage/published",
//   //       "/publish-manage/sunset",
//   //       "/news-manage"
//   //     ]
//   //   }
//   // ]
//   const routeList1 = []

//   for(let item of props.rolelist) {
//     console.log(item)
//     if(item.roleType === props.roleId) {
//       props.changeRights(item.rights)
//       for (let right of item.rights) {
//         if(LocalRouterMap[right]){
         
//           routeList1.push({
//             path:right,
//             element:LocalRouterMap[right],
//             // exact: true,
//           })
//         }else{
        
//           routeList1.push({
//                   path:right,
//                   element:<NoPermission></NoPermission>
//                 })
//         }
  
//           }
//         }
//     }

//   let routeList = [...routeList1,{
//               path:'/',
//               element:<Redirect to="/home"/>,
//               // exact: true,
//             },
//         //     {
//         //       path:'/news',
//         //       element:<News></News>
              
//         //   },
//         //   {
//         //     path:'/detail/:id',
//         //     element:<Detail></Detail>
            
//         // },
//         // {
//         //   path:'/login',
//         //   element:<Redirect to="/home"/>
//         // } ,
//         // {
//         //   path:'/news',
//         //   element:<Redirect to="/home"/>
//         // } ,
//         // {
//         //   path:'/detail/:id',
//         //   element:<Redirect to="/home"/>
//         // } ,
//              {
              
//               path:'*',
//               element:<NoPermission></NoPermission>
//             },
//             // {
//             //   path:'/News',
//             //   element:<News></News>
//             // },
//             // {
//             //   path:'/Detail',
//             //   element:<Detail></Detail>
//             // }
//           ]


//   const element = useRoutes(routeList)

// //尝试////////////////////////////////////////////////////

// const Ielement = useRoutes([
//     {path:'login',element:<Login></Login>},
//     {path:'news',element:<News></News>},
//     {path:'detail:id',element:<Detail></Detail>},
//     {
//         path:'/',
//         element:<NewsSandBox></NewsSandBox>,
//         children:routeList
//     }
// ])

// //尝试/////////////////////////////////
//   return  <React.Suspense fallback={<>加载中...................</>}>
            
//                           {/* {element} */}
                          
//                             {Ielement}
                          
                        
                       
//   </React.Suspense>
// //   return  <HashRouter>
// //               {/* <Router> */}
// //                   {Ielement}
// //               {/* </Router> */}
// //           </HashRouter>
  
  

   
// }


// const mapStateToProps = ({setCurrentUserReducer:{roleId},getrolelist:{rolelist}})=>{
//   return{
//       roleId,rolelist
//     }
  
// }
// const mapDispatchToProps = {
//   changeRights(rights) {
//     console.log('NewsRouterChangeRights')
//     return {
//       type:"change_rights",
//       payload:rights
//     }//action
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(NewsRouter)
