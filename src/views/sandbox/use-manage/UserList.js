import React ,{ useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Axios from '../../../utils/myAxios'
import axios from 'axios'
import { Table,Button ,Modal, Switch,message} from 'antd'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm';
import md5 from 'js-md5'

const { confirm } = Modal;

function UserList(props) {
    const [dataSource,setdataSource] = useState([])
    const [isAddOpen,setisAddOpen] = useState(false)
    const [isUpdateOpen,setisUpdateOpen] = useState(false)
    const [isUpdateDisabled,setisUpdateDisabled] = useState(false)
    const[current,setcurrent]=useState(null)
    const addForm =useRef(null)
    const updateForm = useRef()
    const regionList = [
        {
            "id": 1,
            "title": "亚洲",
            "value": "亚洲"
        },
        {
            "id": 2,
            "title": "欧洲",
            "value": "欧洲"
        },
        {
            "id": 3,
            "title": "北美洲",
            "value": "北美洲"
        },
        {
            "id": 4,
            "title": "南美洲",
            "value": "南美洲"
        },
        {
            "id": 5,
            "title": "非洲",
            "value": "非洲"
        },
        {
            "id": 6,
            "title": "大洋洲",
            "value": "大洋洲"
        },
        {
            "id": 7,
            "title": "南极洲",
            "value": "南极洲"
        }
    ]
    const roleObj = {
        '1':'超级管理员',
        '2':'区域管理员',
        '3':'区域编辑'
    }
    const roleList = props.rolelist;
    useEffect(() => {
        Axios.get('/api/users').then(
            (res) => {
                console.log(res)
                let list = [];
                res.data?.forEach((item) => {
                    let role = props.rolelist?.filter(data => data.roleType === item.roleId);
                    item.role = role;
                    list.push(item)
                })
                setdataSource(roleObj[props.roleId]==='超级管理员'?list:[...list.filter(item=>item.username===props.username),...list.filter(item=>item.region===props.region&&roleObj[item.roleId]==='区域编辑')])
            }
        )
    },[props.roleId,props.username,props.region,props.rolelist])
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return <b>{region === '' ? '全球' : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleId',
            render:(roleId) => {
                return roleObj[roleId]
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render:(roleState,item) => {
                return <Switch checked={roleState === 0 ? false:true} disabled={item.roleDefault === 1 ? true : false}
                            onChange={()=>{handleChange(item)}}
                        ></Switch>
            },
        },
        {
            title: '操作',
            render:(item) => {
                return <div>
                    <Button danger shape='circle' icon={<DeleteOutlined/>}
                        onClick = {() => confirmMethod(item)} disabled={item.roleDefault === 1 ? true : false}
                    ></Button>
                    <Button  type='primary'shape='circle' icon={<EditOutlined/>} disabled={item.roleDefault === 1 ? true : false}
                        onClick = {()=>{
                            handleUpdate(item)
                        }} 
                    ></Button>
                </div>
            }
        },
    ];
   function handleChange(item) {
        item.roleState = item.roleState === 0 ? 1 : 0
        setdataSource([...dataSource])
        Axios.patch('/api/users',{
            id:item.id,roleState:item.roleState
        }).then(res => {
            message.success(`用户${item.roleState===0?'封禁':'解封'}成功`)
        })
    }
    const confirmMethod = (item) => {
            confirm({
                title: '你确定删除吗?',
                icon: <ExclamationCircleFilled />,
                onOk() { deleteMethod(item) },
                onCancel() { },
            });
        }
    const deleteMethod = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        Axios.delete(`/api/users?id=${item.id}`).then(res => {
            message.success( `用户删除成功`)
        })
    }
    const handleUpdate = (item) => {
        setisUpdateOpen(true)
        setTimeout(() => {   
            updateForm.current.setFieldsValue(item)
            if(item.roleId === 1) {
                //超级管理员，禁用区域选项
                setisUpdateDisabled(true)
            }else{
                //取消禁用
                setisUpdateDisabled(false)
            }
        },300)
        //current 保存触发handleUpdate的用户的id，用于之后点更新时，确定需要更新的用户是哪条
        setcurrent(item.id)
    }
    const addFormOk = () => {
        addForm.current.validateFields().then(value => {
        setisAddOpen(false)
        //重置表单
        addForm.current.resetFields()
        //post到后端，自动生成id，再设置datasource，方便后面的删除和更新
        Axios.post(`/api/users/adduser`,{
            ...value,
            "roleState": 1,
            "roleDefault": 0,
            "role":roleObj[value.roleId],
            'password':md5(value.password)
            }).then(res => {
                if(res.data === 'jwt失效' || res.data === '无jwt'){
                    throw (new Error('jwt出问题'))
                }
                message.success(`用户添加成功`)
                setdataSource([...dataSource,{
                    region:value.region,
                    roleId:value.roleId,
                    username:value.username,
                    roleState:1,
                    roleDefault:0
                    //要实时更新用户列表（刷新页面前获取roleName），但是roleId要等Axios完后,才能从后端要到对应的roleName
                    //所以手动从现有的roleList中匹配到id等于roleId的role，得到正确的roleName，与post之后的数据拼接到一起，实时更新用户列表
                    // role:roleList.filter(item=>item.id===value.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err)
        })
    };
    const updateFormOk = (item) => {
        updateForm.current.validateFields().then(value => {
            setisUpdateOpen(false)
            Axios.put(`/api/users?id=${current}`,{...value,'password':md5(value.password)})
            .then((res) => {
                if(res.data === 'jwt失效' || res.data === '无jwt'){
                    throw (new Error('jwt出问题'))
                }
                message.success( `用户修改成功`)
                setdataSource(dataSource.map(item => {
                    if(item.id === current) {
                        value.password = md5(value.password)
                        return {
                            ...item,
                            ...value,
                        }
                    }
                    return item
                }))
            })
        })  
    };
    return (
        <div>
            <Button type='primary' onClick={() => {setisAddOpen(true)}}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{pageSize:5}}></Table>
            <Modal  
                open={isAddOpen}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => {setisAddOpen(false)}}
                onOk={() => {addFormOk()}}
            >
                <React.Suspense fallback={<>加载中...................</>}>
                    <UserForm ref={addForm} regionList={regionList} roleList={roleList}></UserForm>      
                </React.Suspense>
            </Modal>
            <Modal
                open={isUpdateOpen}
                title="更新用户"
                okText="更新"
                cancelText="取消"
                onCancel={()=>{setisUpdateOpen(false)}}
                onOk={() => {updateFormOk()}}
            >
                <React.Suspense fallback={<>加载中...................</>}>
                    <UserForm ref={updateForm}  regionList={regionList} roleList={roleList} isUpdateDisabled={isUpdateDisabled} isUpdate={true}></UserForm>                   
                </React.Suspense> 
            </Modal>
        </div>
    )
};
const mapStateToProps = ({CurrentUserReducer:{roleId,region,username},
    RoleListReducer:{rolelist}}) => {
    return {
        roleId,region,username,rolelist
    }
}
export default connect(mapStateToProps)(UserList)


