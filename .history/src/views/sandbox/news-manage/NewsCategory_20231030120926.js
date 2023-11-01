import React ,{useEffect, useState}from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch } from 'antd'
import axios from 'axios'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'

const { confirm } = Modal;

export default function NewsCategory() {
  const [dataSource,setdataSource] = useState([])


  useEffect(()=>{
    axios.get("/api/categories").then(res=>{
  
    setdataSource(res.data)
    })
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
      title: '栏目名称',
      dataIndex: 'title',
    },
    
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Button  danger shape='circle' icon={<DeleteOutlined/>}
              onClick = {()=>confirmMethod(item)}
          ></Button>
        </div>
      }
    },
  ];
  
  const confirmMethod = (item)=> {
    confirm({
      title: '你确定删除吗?',
      icon: <ExclamationCircleFilled />,
      //content: 'Some descriptions',
      onOk() {
        //console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  }
  const deleteMethod = (item)=>{
    //console.log(item)
    //更新当前页面内容并且后端同步
    if(item.grade === 1) {
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      //setdataSource([...dataSource])
      axios.delete(`http://localhost:5000/rights/${item.id}`)
    }else{
      //先通过子项的rightId向上寻找上一级菜单
      let list = dataSource.filter(data=>data.id === item.rightId)
      //通过filter，把上一级菜单的子项中，要删除的那一条过滤掉
      list[0].children = list[0].children.filter(data=>data.id!==item.id)
      //通过重新赋值给一个新数组来触发页面更新
      setdataSource([...dataSource])

      axios.delete(`http://localhost:5000/children/${item.id}`)
    }
    
  }
  
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
      pagination={{
        pageSize:5
      }}
      ></Table>
    </div>
  )
}
