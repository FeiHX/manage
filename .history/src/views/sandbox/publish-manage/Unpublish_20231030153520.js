import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function Unpublish(props) {

  useEffect(()=>{
      axios.get(`/api/news/publishmanage?author=${props.username}&publishState=1`)
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