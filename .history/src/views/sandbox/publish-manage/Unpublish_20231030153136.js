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
conn
export default connect(mapStateToProps) (Unpublish)