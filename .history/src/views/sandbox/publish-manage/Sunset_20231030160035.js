import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

function Sunset(props) {
  // const [dataSource,setdataSource] = useState([])
  // useEffect(()=>{
  //     axios.get(`/api/news/publishmanage?author=${props.username}&publishState=0`).then((res)=>{
  //       setdataSource(res.data)
  //     })
  // },[props.username])



  return (
    <div><NewsPublish dataSource={dataSource}></NewsPublish></div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (Sunset)