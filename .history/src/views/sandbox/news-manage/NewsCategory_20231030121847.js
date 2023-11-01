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
  
      setdataSource(dataSource.filter(data=>data.id!==item.id))

      axios.delete(`/api/categories?id=${item.id}`)
    
    
  }
  
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
      pagination={{
        pageSize:5
      }}
      rowKey={item=>item.id}
      >
      components = {{
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }}
  </Table>
    </div>
  )
}
