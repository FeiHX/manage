import React ,{useEffect, useState}from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch, message } from 'antd'
import Axios from '../../../utils/myAxios'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import { connect } from 'react-redux';
const { confirm } = Modal;

function RightList(props) {
    const [rightListTabData,setrightListTabData] = useState([])
    let rightlistData = props.rightlist;
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
    useEffect(()=>{
        setrightListTabData(props.rightlist)
    },[])
    const columns = [
        {
        title: 'ID',
        dataIndex: 'id',
        render: (id)=>{
            return <b>{id}</b>
        }
        },
        {
        title: '权限名称',
        dataIndex: 'title',
        },
        {
        title: '权限路径',
        dataIndex: 'rightKey',
        render:(rightKey)=>{
            return <Tag color="orange">{rightKey}</Tag>
        }
        },
        {
        title: '操作',
        render:(item)=>{
            return <div>
                <Button  danger shape='circle' icon={<DeleteOutlined/>}
                    onClick = {()=>confirmMethod(item)}
                    disabled={item.pagepermission==2}
                ></Button>
                <Popover content={<div style={{textAlign:'center'}}>
                    <Switch checked={item.pagepermission} onClick={()=>switchMethod(item)}> </Switch>
                    </div>} title="配置项" trigger={item.pagepermission===undefined?'':'click'}>
                        <Button  type='primary'shape='circle' icon={<EditOutlined/>}
                        disabled={item.pagepermission==2}
                        ></Button>
                </Popover>
            </div>
        }
        },
    ];
    const confirmMethod = (item)=> {
        confirm({
            title: '你确定删除吗?',
            icon: <ExclamationCircleFilled />,
            onOk() { deleteMethod(item) },
            onCancel() { },
        });
    }
    const deleteMethod = (delItem) => {
        if(delItem.grade == 1) {
            setrightListTabData(rightListTabData.filter(data=>data.id!==delItem.id));
            Axios.delete(`/api/rightlist?id=${delItem.id}`).then(res => {
                message.success('权限删除成功')
            });
            Axios.delete(`/api/rightlistchildren/related?rightId=${delItem.id}`);
            (function() {
                let rightListdeletions = (rightListTabData.filter(data => data.id === delItem.id)[0].children)
                    .concat(rightListTabData.filter(data => data.id === delItem.id)[0])
                let rolelist = props.rolelist.map(roleListItem => {
                    for(let rightListdeletion of rightListdeletions) {
                        roleListItem.rights = roleListItem.rights.filter(item => item !== rightListdeletion.rightKey)
                    }
                    return roleListItem
                })
                props.changeRolelist(rolelist)
                Axios.patch(`/api/rolelist/related`,{rolelist: rolelist})
            })();
            (function() {
                rightlistData = rightlistData.filter(data=>{
                    return data.id !== delItem.id
                })  
                props.changeRightlist(rightlistData)
            })()
        }else {
            //先通过子项的rightId向上寻找上一级菜单
            let list = rightListTabData.filter(data=>data.id === delItem.rightId);
            //通过filter，把上一级菜单的子项中，要删除的那一条过滤掉
            list[0].children = list[0].children.filter(data=>data.id!==delItem.id);
            //通过重新赋值给一个新数组来触发页面更新
            setrightListTabData([...rightListTabData]);
            Axios.delete(`/api/rightlistchildren?id=${delItem.id}`).then(res => {
                message.success('权限删除成功')
            });
            (function() {
                let rolelist = props.rolelist.map(roleListItem => {
                    roleListItem.rights = roleListItem.rights.filter(data => data !== delItem.rightKey)
                    return roleListItem
                })
                props.changeRolelist(rolelist)
                Axios.patch(`/api/rolelist/related`,{rolelist: rolelist})
            })();
            (function() {
                rightlistData = rightlistData.filter(data => {
                    return data.id !== delItem.id
                })  
                props.changeRightlist(rightlistData)
            })();
        }
    }
    const switchMethod = (swItem) => {
        swItem.pagepermission = swItem.pagepermission == 1 ? 0:1
        let tag = swItem.pagepermission
        if(swItem.grade == 1) {
            swItem.children.forEach(data => {
                data.pagepermission = data.pagepermission == 2 ? 2 : swItem.pagepermission; 
            })
            setrightListTabData([...rightListTabData]);
            (function() {
                rightlistData.map(data=>{
                    if(data.id==swItem.id) { data = {...swItem} }
                })
                props.changeRightlist(rightlistData) 
                Axios.patch(`/api/rightlist?id=${swItem.id}`,{pagepermission:swItem.pagepermission}).then(res => {
                    message.success('权限修改成功')
                })
                Axios.patch(`/api/rightlistchildren/related?rightId=${swItem.id}`,{pagepermission:swItem.pagepermission})
            })();
            (function() {
                let rightListSwitch = (rightListTabData.filter(data => data.id == swItem.id)[0].children)
                    .concat(rightListTabData.filter(data => data.id == swItem.id)[0])
                let rolelist = props.rolelist.map(roleListItem => {
                    if(!tag) {
                        for(let data of rightListSwitch) {
                            roleListItem.rights = roleListItem.rights.filter(item => item !== data.rightKey)
                        }
                    }else {
                        for(let data of rightListSwitch) {
                            if(roles[roleListItem.id-1].rights.includes(data.rightKey)) {
                                roleListItem.rights = roleListItem.rights.concat(data.rightKey)
                            }
                        }
                    }
                    return roleListItem
                })
                props.changeRolelist(rolelist)
                Axios.patch(`/api/rolelist/related`,{rolelist: rolelist})
            })();
        }else {
            setrightListTabData([...rightListTabData]);
            (function() {
                let rolelist = props.rolelist.map(roleListItem => {
                    if(!tag) {
                        roleListItem.rights = roleListItem.rights.filter(data => data !== swItem.rightKey)
                    }else {
                        if(roles[roleListItem.id-1].rights.includes(swItem.rightKey)) {
                            roleListItem.rights = roleListItem.rights.concat(swItem.rightKey)
                        }
                    }
                    return roleListItem
                })
                props.changeRolelist(rolelist)  
                Axios.patch(`/api/rolelist/related`,{rolelist:rolelist}).then(res => {
                    message.success('权限修改成功')
                })   
            })();
            (function() {
                rightlistData.map(data=>{
                    if(data.id==swItem.rightId) {
                        data.children.map(temp=>{
                            if(temp.id==swItem.id) {
                                return swItem
                            }
                        })
                    }
                })
                props.changeRightlist(rightlistData)
                Axios.patch(`/api/rightlistchildren?id=${swItem.id}`,{pagepermission:swItem.pagepermission})        
            })();
        }
    }
    return (
        <div>
            <Table dataSource={rightListTabData} columns={columns} pagination={{ pageSize:6 }}></Table>
        </div>
    )
}
const mapStateToProps = ({CurrentUserReducer:{roleId},RoleListReducer:{rolelist},RightListReducer:{rightlist}}) => {
    return {
        roleId,rolelist,rightlist
    }
 }
const mapDispatchToProps = {
    changeRolelist(rolelist) {
        return {
            type:'change_rolelist',
            payload:rolelist
        }
    },
    changeRightlist(rightlist) {
        return {
            type:'change_rightlist',
            payload:rightlist
        }
    }
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(RightList)
