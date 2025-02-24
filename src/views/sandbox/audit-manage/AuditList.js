import Axios from '../../../utils/myAxios'
import React, { useEffect ,useState} from 'react'
import { connect } from 'react-redux'
import { Button, Table, Tag ,notification,message} from 'antd'
import withRoute from '../../../components/sandbox/withRoute';
function AuditList(props) {
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
        Axios.get(`/api/news/auditlist?author=${props.username}
            &auditState1=1&auditState2=2&auditState3=3&publishState0=0&publishState1=1
        `).then(res=>{
                setdataSource(res.data)
        })
    },[props.username])

    const handleRervert = (item) => {
        setdataSource(dataSource.filter(data=>data.id!==item.id))
        Axios.patch(`/api/news/update/upload?id=${item.id}`,{auditState:0})
            .then(res => {
                notification.info({
                message: '通知',
                description: `您可以到【草稿箱】中查看您的新闻`,
                placement: 'bottomRight',
                duration:1,
                })
                message.success( '撤销成功')
            })
    }
    const handlePublish = (item) => {
        Axios.patch(`/api/news/update/publish?id=${item.id}`, { publishState: 2, publishTime:Date.now() + ''
          }).then(res => {
                props.history.push('/publish-manage/published')
                notification.info({
                message: '通知',
                description: `您可以到【发布管理/已发布】中查看您的新闻`,
                placement: 'bottomRight',
                duration:1,
                })
                message.success(`发布成功`)
        })
        
    };
    const handleUpdate = (item) => {
        props.history.push(`/news-manage/update/${item.id}`)
    }
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title,item) => {
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
            title: '审核状态',
            dataIndex: 'auditState',
            render:(auditState) => {
                const colorList = ["",'orange','green','red']
                const auditList = ['草稿箱','审核中','已通过','未通过']
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
    
        {
            title: '操作',
            render:(item)=>{
                return  <div>
                            {item.auditState === 1 && <Button onClick={()=>handleRervert(item)}>撤销</Button>}
                            {item.auditState === 2 && <Button danger onClick={()=>handlePublish(item)}>发布</Button>}
                            {item.auditState === 3 && <Button type='primary'onClick={()=>handleUpdate(item)}>更新</Button>}
                        </div>
            }
        },
    ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize:5}} rowKey={item=>item.id}></Table>
        </div>
    )
}
const mapStateToProps = ({CurrentUserReducer:{username},CategoriesReducer:{categories}}) => {
    return {
        username,categories
    }
}
export default connect(mapStateToProps) (withRoute(AuditList)) 
