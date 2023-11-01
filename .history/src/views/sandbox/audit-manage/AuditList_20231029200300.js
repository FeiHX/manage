import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function AuditList(props) {
  useEffect(()=>{
    axios.get(`/news?author=${props.username}`&auditState1=1&)
  })
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
