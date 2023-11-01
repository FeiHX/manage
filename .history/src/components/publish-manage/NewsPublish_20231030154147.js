import React ,{useEffect, useState}from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch } from 'antd'
import axios from 'axios'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'

const { confirm } = Modal;

export default function NewsPublish(props) {
  


  
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
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Button  danger shape='circle' icon={<DeleteOutlined/>}
              onClick = {()=>confirmMethod(item)}
          ></Button>
          <Popover content={<div style={{textAlign:'center'}}>
              <Switch checked={item.pagepermission} onClick={()=>switchMethod(item)}> </Switch>
            </div>} title="配置项" trigger={item.pagepermission===undefined?'':'click'}>
                <Button  type='primary'shape='circle' icon={<EditOutlined/>}
                disabled={item.pagepermission===undefined}
                ></Button>
          </Popover>
         
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
      ></Table>
    </div>
  )
}

