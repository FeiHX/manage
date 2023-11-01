import React ,{useEffect, useState}from 'react'
import { Button, Table, Tag ,Modal,Popover,Switch } from 'antd'
import axios from 'axios'
import {DeleteOutlined,EditOutlined,ExclamationCircleFilled} from '@ant-design/icons'
import { connect } from 'react-redux';

const { confirm } = Modal;

function NewsDraft(props) {
  const [dataSource,setdataSource] = useState([])
  const [categoryList,setCategoryList] = useState([]);

  useEffect(()=>{
    axios.get(`/api/news/draft?author=${props.username}`).then(res=>{
    const list = res.data
    console.log(res.data);

    setdataSource(res.data)
    })
    axios.get('/api/categories').then(
      (res)=>{
        setCategoryList(res.data)
        console
      }
    )
  },[props.username])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      render:(categoryId)=>{
        return list.categoryId
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Button  danger shape='circle' icon={<DeleteOutlined/>}
              onClick = {()=>confirmMethod(item)}
          ></Button>

          <Button  shape='circle' icon={<EditOutlined/>}
                disabled={item.pagepermission===undefined}
          ></Button>
          <Button  type='primary'shape='circle' icon={<EditOutlined/>}
                disabled={item.pagepermission===undefined}
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
const mapStateToProps = ({setCurrentUserReducer:{username}}) => {
  // console.log(state)
  return {
    username
  }
}

export default connect(mapStateToProps)(NewsDraft)
