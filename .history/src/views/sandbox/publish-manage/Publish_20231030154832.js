import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

function Unpublish(props) {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
      axios.get(`/api/news/publishmanage?author=${props.username}&publishState=2`).then((res)=>{
        setdataSource(res.data)
      })
  },[props.username])



  return (
    <div><NewsPublish dataSource={dataSource}></NewsPublish></div>
  )
}
const mapStateToProps = ({getCategories:{categories}}) => {
  return {
    categories
  }
}
export default connect(mapStateToProps) (Publish)