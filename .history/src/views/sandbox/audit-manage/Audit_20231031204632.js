import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Table ,Button,notification} from 'antd';
function Audit(props) { 
  const [dataSource,setdataSource] = useState([])
  
    const roleObj = {
      '1':'超级管理员',
      '2':'区域管理员',
      '3':'区域编辑'
    }
  useEffect(()=>{ 
    axios.get('/api/news/audit?auditState=1').then(
      (res)=>{
        let list = [];
        
        res.data?.forEach((item)=>{
          let role = props.roles?.filter(data=>data.roleType === item.roleId);
          item.role = role;
          list.push(item)
        })
      
        setdataSource(roleObj[props.roleId]==='超级管理员'?list:[...list.filter(item=>item.author===props.username),...list.filter(item=>item.region===props.region&&roleObj[item.roleId]==='区域编辑')])
      }
      )
  },[props.roleId,props.username,props.region])

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
      title: '新闻分类',
      dataIndex: 'categoryId',
      render:(categoryId)=>{
        return props.categories.filter(item=>item.id===categoryId)[0].title
      }
    },
  
 
    {
      title: '操作',
      render:(item)=>{
        return <div>
                  <Button type='primary' onClick={()=>{handleAudit(item,2,1)}}>通过</Button>
                  <Button danger onClick={()=>{handleAudit(item,3,0)}}>驳回</Button>
                </div>
      }
    },
  ];
  const handleAudit = (item,auditState,publishState) => {
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/api/news/audit?id=${item.id}`,{
      auditState,publishState
    }).then(res => {
      
      notification.info({ 
        message: '通知',
        description: `您可以到【审核管理/审核列表】中查看您的新闻的审核状态`,
        placement: 'bottomRight'
      })
      
    })
  }
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
const mapStateToProps = ({RolesReducer:{roles},setCurrentUserReducer:{roleId,region,username,role},getCategories:{categories}}) => {

  return {
    roles,roleId,region,username,categories
  }
}

export default connect(mapStateToProps)(Audit)