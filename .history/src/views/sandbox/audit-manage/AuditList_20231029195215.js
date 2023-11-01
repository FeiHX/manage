import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function AuditList(props) {
  useEffect(()=>{
    axios.get(``)
  })
  return (
    <div>AuditList</div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username}}) => {
  // console.log(state)
  return {
    username
  }
}
export default connect(mapStateToProps) (AuditList)
