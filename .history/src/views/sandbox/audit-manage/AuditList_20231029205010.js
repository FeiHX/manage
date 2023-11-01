import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function AuditList(props) {
  console.log(props.username)
  useEffect(()=>{
    axios.get(`/api/news/auditlist?author=${props.username}&au`).then(res=>{
      console.log(res)
    })
  },[props.username])
  return (
    <div>AuditList</div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (AuditList)
