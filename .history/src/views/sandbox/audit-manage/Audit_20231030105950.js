import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Table ,Button} from 'antd';
function Audit(props) { 
  const [dataSource,setdataSource] = useState([])
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
  useEffect(()=>{ 
    axios.get('/api/news/audit?auditState=1').then(
      (res)=>{
        let list = [];
        console.log(res.data)
        res.data?.forEach((item)=>{
          let role = props.roles?.filter(data=>data.roleType === item.roleId);
          item.role = role;
          list.push(item)
        })
        // console.log(list);
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
        return props.categories.data.filter(item=>item.id==categoryId)[0].title
      }
    },
  
 
    {
      title: '操作',
      render:(item)=>{
        return <div>
                  <Button type='primary' onClick={()=>{handleAudit(item)}}>通过</Button>
                  <Button danger onClick={()=>{handleAudit(item)}}>驳回</Button>
                </div>
      }
    },
  ];
  const handleAudit = (item) => {
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/api/news/audit?id=${item.id}`)
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