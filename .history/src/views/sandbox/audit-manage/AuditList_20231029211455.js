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
    })
  },[props.username])
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
