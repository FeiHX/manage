import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function AuditList(props) {
  useEffect(()=>{
    axios.get(`/news/audlist?author=${props.username}&auditState1=1&&auditState2=2&&auditState3=3&
    publishState0=0&publish1=1`)
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
