
import React,  from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

function Unpublish(props) {
  // const [dataSource,setdataSource] = useState([])
  // useEffect(()=>{
  //     axios.get(`/api/news/publishmanage?author=${props.username}&publishState=1`).then((res)=>{
  //       setdataSource(res.data)
  //     })
  // },[props.username])
  const {dataSource} = usePublish(1,props.username)


  return (
    <div><NewsPublish dataSource={dataSource}></NewsPublish></div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (Unpublish)