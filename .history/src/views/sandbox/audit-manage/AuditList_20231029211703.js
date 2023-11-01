import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
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
        return <a ></a>
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
