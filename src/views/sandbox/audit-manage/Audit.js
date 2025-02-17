import Axios from '../../../utils/myAxios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Table ,Button,notification, message} from 'antd';
import withRoute from '../../../components/sandbox/withRoute';
function Audit(props) { 
    const [dataSource,setdataSource] = useState([])
    const roleObj = {
        '1':'超级管理员',
        '2':'区域管理员',
        '3':'区域编辑'
    }
    useEffect(()=>{ 
        Axios.get('/api/news/audit?auditState=1').then(
            (res)=>{
                let list = [];
                res.data?.forEach((item) => {
                    let role = props.rolelist?.filter(data => data.roleType === item.roleId);
                    item.role = role;
                    list.push(item)
                })
                setdataSource(roleObj[props.roleId] === '超级管理员'?list:[...list.filter(item=>item.author===props.username),...list.filter(item=>item.region===props.region&&roleObj[item.roleId]==='区域编辑')])
              }
        )
      },[props.roleId,props.username,props.region,props.rolelist])

    const columns = 
        [
            {
                title: '新闻标题',
                dataIndex: 'title',
                render: (title,item)=>{
                    return <Button type='link' onClick={() => props.history.push(`/news-manage/preview/${item.id}`)}>{title}</Button>
                }
            },
            {
                title: '新闻副标题',
                dataIndex: 'subheading',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '新闻分类',
                dataIndex: 'categoryId',
                render:(categoryId) => {
                    return props.categories.filter(item => item.id === categoryId)[0]?.title
                }
            },
            {
                title: '操作',
                render:(item) => {
                    return  <div>
                                <Button type='primary' onClick={() => {handleAudit(item, 2, 1)}}>通过</Button>
                                <Button danger onClick={() => {handleAudit(item, 3, 0)}}>驳回</Button>
                            </div>
                }
            },
        ];
    const handleAudit = (item,auditState,publishState) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        Axios.patch(`/api/news/audit?id=${item.id}`,{auditState, publishState})
            .then(res => {
                if(auditState==2&&publishState==1) {
                    const ws = new WebSocket(`wss://my-manage.cn/websocket/notice?type=pass&&user=${props.username}`);
                    ws.onopen = function() {
                        ws.send(JSON.stringify({type:'pass',time:Date.now(),send:props.username,recieve: item.author,content:`审核通过:用户${item.author}提交的新闻《${item.title}》审核通过`}))
                    }
                }else if(auditState==3&&publishState==0) {
                    const ws = new WebSocket(`wss://my-manage.cn/websocket/notice?type=reject&&user=${props.username}`);
                    ws.onopen = function() {
                        ws.send(JSON.stringify({type:'reject',time:Date.now(),send:props.username,recieve:item.author,content:`审核未通过:用户${item.author}提交的新闻《${item.title}》被驳回`}))
                    }
                }
                notification.info({ 
                    message: '通知',
                    description: `您可以到【审核管理/审核列表】中查看您的新闻的审核状态`,
                    placement: 'bottomRight',
                    duration: 1,
                })
                message.success(`您可以到【审核管理/审核列表】中查看您的新闻的审核状态`)
            })
    }
    return (
        <div>
            <Table 
                dataSource={dataSource} 
                columns={columns}
                pagination={{pageSize:5}} 
                rowKey={item=>item.id}
            ></Table>
        </div>
    )
}
const mapStateToProps = ({CurrentUserReducer:{roleId,region,username},
    CategoriesReducer:{categories},RoleListReducer:{rolelist}}) => {
    return {
        roleId,region,username,categories,rolelist
    }
}
export default connect(mapStateToProps)(withRoute(Audit))
