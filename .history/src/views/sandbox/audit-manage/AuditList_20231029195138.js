import React from 'react'
import { connect } from 'react-redux'

function AuditList() {
  return (
    <div>AuditList</div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  // console.log(state)
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (AuditList)
