import React, { useEffect } from 'react'
import { connect } from 'react-redux'

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
export default connect(mapStateToProps) (Unpublish)