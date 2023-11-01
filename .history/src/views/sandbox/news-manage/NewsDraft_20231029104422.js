import React ,{useEffect, useState}from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch } from 'antd'
import axios from 'axios'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import { connect } from 'react-redux';

const { confirm } = Modal;

function NewsDraft() {
  const [dataSource,setdataSource] = useState([])


  useEffect(()=>{
    axios.post("/api/news/draft",).then(res=>{
    const list = res.data
    console.log(res.data);
    list.forEach(item=>{
      if(item.children.length === 0) {
        item.children = ''
      }
    }) 
    console.log(res.data);
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
  const switchMethod=(item)=>{
    item.pagepermission = item.pagepermission === 1 ? 0:1
    setdataSource([...dataSource]) 
    console.log(item.pagepermission)
    if(item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`,{pagepermission:item.pagepermission})
      //setdataSource([...dataSource])
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{pagepermission:item.pagepermission})
      //setdataSource([...dataSource])
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


export default connect(mapState)(NewsDraft)
