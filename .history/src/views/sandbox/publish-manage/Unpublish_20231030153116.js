import React, { useEffect } from 'react'

function Unpublish() {

  useEffect(()=>{
      axios.get(`/api/news?author=${props.username}`)
  })



  return (
    <div>Unpublish</div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default function Unpublish()
export default connect(mapStateToProps) (withRoute(AuditList)) 