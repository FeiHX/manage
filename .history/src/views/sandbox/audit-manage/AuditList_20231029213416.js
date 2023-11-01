import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { connect } from 'react-redux'

import { Button, Table, Tag ,Modal,notification,message} from 'antd'

import {DeleteOutlined,EditOutlined,ExclamationCircleFilled,UploadOutlined } from '@ant-design/icons'
function AuditList(props) {
  const [dataSource,setdataSource] = useState([])
  console.log(props.username)
  useEffect(()=>{
    axios.get(`/api/news/auditlist?author=${props.username}&auditState1=1&auditState2=2&auditState3=3
    &publishState0=0&publishState1=1
    `).then(res=>{
      console.log(res.data)
      setdataSource(res.data)
    })
  },[props.username])
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title,item)=>{
        return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render:(auditState)=>{
        return <
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
 
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Button danger
              // onClick = {()=>confirmMethod(item)}
          >发布</Button>
         
         
        </div>
      }
    },
  ];
  return (
    <div>
        <Table dataSource={dataSource} columns={columns}
      pagination={{
        pageSize:5
      }} 
      rowKey={item=>item.id}
      ></Table>
    </div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (AuditList)
