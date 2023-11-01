// import React ,{ useEffect, useState, useRef } from 'react'
// import { connect } from 'react-redux'
// import  axios  from 'axios';
// import { Table,Button ,Modal, Switch,} from 'antd'
// import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
// const { confirm } = Modal;

// function UserList(props) {
//   const [dataSource,setdataSource] = useState([])

//   const [isAddOpen,setisAddOpen] = useState(false)
//   const [roleList,setroleList] = useState([])
//   const [regionList,setregionList] = useState([])
//   const [isUpdateOpen,setisUpdateOpen] = useState(false)
//   const [isUpdateDisabled,setisUpdateDisabled] = useState(false)
//   const[current,setcurrent]=useState(null)
//   const addForm = useRef(null)
//   const updateForm = useRef(null)
//   // useEffect(()=>{
//   //   props.getUserList()
//   // })
//   console.log(props.userList,props.roles);
//   let list = []
//   props.userList?.forEach((item)=>{
//     let role = props.roles?.filter(data=>data.roleType === item.roleId);
//     item.role = role;
//     list.push(item)
//   })
//   console.log(list);
//   useEffect(()=>{
//     const roleObj = {
//       '1':'superadmin',
//       '2':'admin',
//       '3':'editor'
//     }
    
//     setdataSource(roleObj[props.roleId]==='superadmin'?list:[...list.filter(item=>item.username===props.username),...list.filter(item=>item.region===props.region&&roleObj[item.roleId]==='editor')])
    
//   },[list,props.roleId])

//    const columns = [
//     {
//       title: '区域',
//       dataIndex: 'region',
     
//       render: (region)=>{
//         return <b>{region===''?'全球':region}</b>
//       }
//     },
//     {
//       title: '角色名称',
//       dataIndex: 'role',
//       render:(role)=> {
//         return role.roleType
//       }

//     },
//     {
//       title: '用户名',
//       dataIndex: 'username',
//     },
//     {
//       title: '用户状态',
//       dataIndex: 'roleState',
//       render:(roleState,item)=>{
//         return <Switch checked={roleState} disabled={item.roeDefault}
//               onChange={()=>{handleChange(item)}}
//              ></Switch>
//       },
      
//     },
//     {
//             title: '操作',
//             render:(item)=>{
//               return <div>
//                 <Button  danger shape='circle' icon={<DeleteOutlined/>}
//                     onClick = {()=>confirmMethod(item)} disabled={item.roleDefault === "true" ? true : false}
//                 ></Button>
                
//                 <Button  type='primary'shape='circle' icon={<EditOutlined/>} disabled={item.roleDefault === "true" ? true : false}
//                   onClick = {()=>{
//                     handleUpdate(item)
//                   }} 
//                 ></Button>
                
//               </div>
//           }
//         },
//   ];
//   async function handleChange (item){
//     item.roleState = !item.roleState
//     setdataSource([...dataSource])
//     console.log(item.id,item.roleState);
//     await axios.patch('/api/users',{
//       id:item.id,roleState:item.roleState
//     })
//     await props.getUserList()
   
//   }
//   const confirmMethod = (item)=> {
//         confirm({
//           title: '你确定删除吗?',
//           icon: <ExclamationCircleFilled />,
//           //content: 'Some descriptions',
//           onOk() {
//             //console.log('OK');
//             deleteMethod(item)
//           },
//           onCancel() {
//             //console.log('Cancel');
//           },
//         });
//       }
//   const deleteMethod = (item)=>{
//       setdataSource(dataSource.filter(data=>data.id!==item.id))
//       axios.delete(`/api/users?id=${item.id}`)
//   }
//   const handleUpdate = (item) => {
//     //？？？让他们变成同步触发，在异步中改true，一定是先创建好了，再更新？？？？
//     setisUpdateOpen(true)
//     setTimeout(()=>{
//       updateForm.current.setFieldsValue(item)
//       if(item.roleId===1) {
//         //超级管理员，禁用区域选项
//         setisUpdateDisabled(true)
//       }else{
//         //取消禁用
//         setisUpdateDisabled(false)
//       }
//     },0)
// //current 保存触发handleUpdate的用户的id，用于之后点更新时，确定需要更新的用户是哪条
//     setcurrent(item.id)
    
//   }
 
//   return (
    
//     <div>
//       <Table dataSource={dataSource} columns={columns} rowKey={item=>item.id}
//       pagination={{
//         pageSize:5
//       }}
//       ></Table>
//     </div>
//   )
// }
// const mapStateToProps = ({RolesReducer:{roles},UserListReducer:{userList},setCurrentUserReducer:{roleId,region,username,role}}) => {

//   return {
//     roles,userList,roleId,region,username
//   }
// }
// const mapDispatchToProps = {
//    getUserList(){
//     return  (dispatch)=> {
//       return   axios.get('/api/users').then(
//         (res)=>{
//           dispatch({
//             type:'change_userList',
//             payload:res.data
//           })
//         }
//       )
//     }
//   }
// } 

// // const mapDispatchToprops ={
 
// //   loginActions (value,roles){
 
// //     return  (dispatch)=> {
// //        return axios.post('/api/users',value)
// //        .then(
// //         (res)=>{
// //           // console.log(res.data);
// //           const token = res.data;
// //           localStorage.setItem('jwtToken',token);
// //           // setAuthorizationToken(token);
// //           const jwt = jwtDecode(token);
// //           // console.log(jwt,1111,dispatch);
         
// //           dispatch({
// //             type:"change_roleId_username",
// //             payload:{roleId:jwt.roleId,username:jwt.username}
// //           },
// //           dispatch({
// //             type:"change_roles",
// //             payload:roles
// //           })
          
// //             //action
// //           )
// //         }
// //       )
// //     }
// export default connect(mapStateToProps,mapDispatchToProps)(UserList)

// // import { Table,Button ,Modal, Switch,} from 'antd'
// // import axios from 'axios'
// // import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
// // import UserForm from '../../../components/user-manage/UserForm';
// // const { confirm } = Modal;


// // export default function UserList() {
// //   const [dataSource,setdataSource] = useState([])
// //   const [isAddOpen,setisAddOpen] = useState(false)
// //   const [roleList,setroleList] = useState([])
// //   const [regionList,setregionList] = useState([])
// //   const [isUpdateOpen,setisUpdateOpen] = useState(false)
// //   const [isUpdateDisabled,setisUpdateDisabled] = useState(false)
// // //current 保存触发handleUpdate的用户的id，用于之后点更新时，确定需要更新的用户是哪条
// //   const[current,setcurrent]=useState(null)
// //   const addForm = useRef(null)
// //   const updateForm = useRef(null)

// //   const deleteMethod = (item)=>{
// //     setdataSource(dataSource.filter(data=>data.id!==item.id))
// //     axios.delete(`http://localhost:5000/users/${item.id}`)
// //   }
// //   const confirmMethod = (item)=> {
// //     confirm({
// //       title: '你确定删除吗?',
// //       icon: <ExclamationCircleFilled />,
// //       //content: 'Some descriptions',
// //       onOk() {
// //         //console.log('OK');
// //         deleteMethod(item)
// //       },
// //       onCancel() {
// //         //console.log('Cancel');
// //       },
// //     });
// //   }

// // const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))

// //   useEffect(()=>{
// //     const roleObj = {
// //       '1':'superadmin',
// //       '2':'admin',
// //       '3':'editor'
// //     }
// //     axios.get("http://localhost:5000/users?_expand=role").then(res=>{
// //     const list = res.data
// //     setdataSource(roleObj[roleId]==='superadmin'?list:[...list.filter(item=>item.username===username),...list.filter(item=>item.region===region&&roleObj[item.roleId]==='editor')])
// //     })
// //   },[roleId,region,username])
// //   useEffect(()=>{
// //     axios.get("http://localhost:5000/regions").then(res=>{

// //     setregionList(res.data)
// //     })
// //   },[])
// //   useEffect(()=>{
// //     axios.get("http://localhost:5000/roles").then(res=>{

// //     setroleList(res.data)
// //     })
// //   },[])
// //   const columns = [
// //     {
// //       title: '区域',
// //       dataIndex: 'region',
// //       filters: [
// //           ...regionList.map(item=>({
// //               text:item.title,
// //               value:item.value
// //           })),
// //           {
// //             text:'全球',
// //             value:''
// //           }
// //       ],
// //       onFilter:(value,item)=>item.region===value,
// //       render: (region)=>{
// //         return <b>{region===''?'全球':region}</b>
// //       }
// //     },
// //     {
// //       title: '角色名称',
// //       dataIndex: 'role',
// //       render:(role)=>{
// //         return role.roleName
// //       }
// //     },
// //     {
// //       title: '用户名',
// //       dataIndex: 'username',
// //     },
// //     {
// //       title: '用户状态',
// //       dataIndex: 'roleState',
// //       render:(roleState,item)=>{
// //         return <Switch checked={roleState} disabled={item.default}
// //               onChange={()=>{handleChange(item)}}
// //              ></Switch>
// //       }
// //     },
// //     {
// //       title: '操作',
// //       render:(item)=>{
// //         return <div>
// //           <Button  danger shape='circle' icon={<DeleteOutlined/>}
// //               onClick = {()=>confirmMethod(item)} disabled={item.default}
// //           ></Button>
          
// //           <Button  type='primary'shape='circle' icon={<EditOutlined/>} disabled={item.default}
// //             onClick = {()=>{
// //               handleUpdate(item)
// //             }} 
// //           ></Button>
          
          
// //         </div>
// //     },
// //     }
// //   ];
// //   const handleChange =(item)=>{
// //     item.roleState = !item.roleState
// //     setdataSource([...dataSource])

// //     axios.patch(`http://localhost:5000/users/${item.id}`,{
// //       roleState:item.roleState
// //     })
// //   }
// //   const handleUpdate = (item) => {
// //     //？？？让他们变成同步触发，在异步中改true，一定是先创建好了，再更新？？？？
// //     setisUpdateOpen(true)
// //     setTimeout(()=>{
// //       updateForm.current.setFieldsValue(item)
// //       if(item.roleId===1) {
// //         //超级管理员，禁用区域选项
// //         setisUpdateDisabled(true)
// //       }else{
// //         //取消禁用
// //         setisUpdateDisabled(false)
// //       }
// //     },0)
// // //current 保存触发handleUpdate的用户的id，用于之后点更新时，确定需要更新的用户是哪条
// //     setcurrent(item.id)
    
// //   }
// //   const addFormOk =()=>{
// //     addForm.current.validateFields().then(value=>{
// //       //console.log(value)
// //       setisAddOpen(false)
// //       //重置表单
// //       addForm.current.resetFields()
// //       //post到后端，自动生成id，再设置datasource，方便后面的删除和更新
// //       axios.post(`http://localhost:5000/users`,{
// //         ...value,
// //         "roleState": true,
// //         "default": false,
// //       }).then(res=>{
// //         console.log(res.data)
// //         console.log(roleList.filter(item=>item.id===value.roleId)[0])
// //         setdataSource([...dataSource,{
// //               ...res.data,
// //               //要实时更新用户列表（刷新页面前获取roleName），但是roleId要等axios完后,才能从后端要到对应的roleName
// //               //所以手动从现有的roleList中匹配到id等于roleId的role，得到正确的roleName，与post之后的数据拼接到一起，实时更新用户列表
// //               role:roleList.filter(item=>item.id===value.roleId)[0]
// //             }])
// //       })
// //     }).catch(err=>{
// //       console.log(err)
// //     })
// //   }
// //   const updateFormOk = (item) => {
// //     updateForm.current.validateFields().then(value=>{
// //       //console.log(value)
// //       setisUpdateOpen(false)
// //       setdataSource(dataSource.map(item=>{
// //         if(item.id===current) {
// //           return {
// //             ...item,
// //             ...value,
// //             role:roleList.filter(data=>data.id===value.roleId)[0]
// //           }
// //         }
// //         return item
// //       }))
// //       axios.patch(`http://localhost:5000/users/${current}`,value)
// //       })
// //   }
// //   return (
// //     <div>
// //       <Button type='primary' onClick={()=>{setisAddOpen(true)}}>添加用户</Button>
// //       <Table dataSource={dataSource} columns={columns} rowKey={item=>item.id}
// //       pagination={{
// //         pageSize:5
// //       }}
// //       ></Table>
// //       <Modal
// //       open={isAddOpen}
// //       title="添加用户"
// //       okText="确定"
// //       cancelText="取消"
// //       onCancel={()=>{setisAddOpen(false)}}
// //       onOk={() => {addFormOk()}}
// //     >
// //       <UserForm ref={addForm} regionList={regionList} roleList={roleList}></UserForm>
// //     </Modal>
// //     <Modal
// //       open={isUpdateOpen}
// //       title="更新用户"
// //       okText="更新"
// //       cancelText="取消"
// //       onCancel={()=>{setisUpdateOpen(false)}}
// //       onOk={() => {updateFormOk()}}
// //     >
// //       <UserForm ref={updateForm} regionList={regionList} roleList={roleList} isUpdateDisabled={isUpdateDisabled} isUpdate={true}></UserForm>
// //     </Modal>
// //     </div>
// //   )
// // }
