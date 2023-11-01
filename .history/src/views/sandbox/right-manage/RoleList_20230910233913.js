import { Table,Button ,Modal,Tree} from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  const [isModalOpen,setisModalOpen] = useState(false)
  const [rightList,setrightList] = useState([])
  const [currentRights,setcurrentRight] = useState([])
  const [currentId,setcurrentId] = useState(0)
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
     
    axios.delete(`/api/rolelist?id=${item.id}`).then((res)=>{
      setdataSource(dataSource.filter(data=>data.id!==item.id))
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Button  danger shape='circle' icon={<DeleteOutlined/>}
              onClick = {()=>confirmMethod(item)}
          ></Button>
          
          <Button  type='primary'shape='circle' icon={<EditOutlined/>}
            onClick = {()=>{
              setisModalOpen(true)
              setcurrentRight(item.rights)
              //console.log(item)
              setcurrentId(item.id)
            }}
          ></Button>
          
          
        </div>
      }
    },
  ]
  useEffect(()=>{
    axios.get('/api/rolelist').then(res=>{
    // console.log(res.data);
    let rolelist = []
    for(let i = 0; i < 3; i++) {
      let rights1 = res.data[i].rights;
      let rights2 = rights1.split(',\n')
      // console.log(rights2);
      let list = {
        ...res.data[i],
        rights:rights2
      }
      // console.log(list);
      rolelist.push(list);
      
    }
    // console.log(rolelist);
    setdataSource(rolelist);
    
   
    })
  },[])
  // useEffect(()=>{
  //   axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
  //     // console.log(res.data)
  //     setrightList(res.data)

  //   })
  // },[])
  useEffect(()=>{
  Promise.all([
              axios.get('/api/rightlist'),
              axios.get('/api/rightlistchildren'),
      ]).then(res=>{
                
                console.log(res[0].data,res[1].data)
                console.log(res[1].data.filter())
                // setBackRouteList([...res[0].data,...res[1].data])
                // console.log([...res[0].data,...res[1].data])
                // console.log(BackRouteList)
               })
},[])
  const handleOk = ()=>{
    setisModalOpen(false)
    //同步dataSoure
    setdataSource(dataSource.map(item=>{
      if(item.id === currentId) {
        console.log(item)
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }))
    //patch
    axios.patch(`http://localhost:5000/roles/${currentId}`,{
      rights:currentRights
    })
  }
  const handleCancel = ()=>{
    setisModalOpen(false)
  }
  const onCheck = (checkKeys)=>{
    //console.log(checkKeys)
    setcurrentRight(checkKeys.checked)
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
      rowKey={(item)=>item.id}></Table>
      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Tree
      checkable
      checkedKeys={currentRights}
      onCheck={onCheck}
      treeData={rightList}
      checkStrictly={true}
    />
      </Modal>
    </div>
  )
}
