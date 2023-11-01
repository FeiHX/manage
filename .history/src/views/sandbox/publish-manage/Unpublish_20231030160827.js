
import React  from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
function Unpublish(props) {
  // const [dataSource,setdataSource] = useState([])
  // useEffect(()=>{
  //     axios.get(`/api/news/publishmanage?author=${props.username}&publishState=1`).then((res)=>{
  //       setdataSource(res.data)
  //     })
  // },[props.username])
  const {dataSource} = usePublish(1,props.username)


  return (
    <div><NewsPublish dataSource={dataSource} button={<Button>发布</Button>}></NewsPublish></div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (Unpublish)