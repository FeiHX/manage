
import React from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'
function Publish(props) {

  const {dataSource,handleSunset} = usePublish(2,props.username)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id)=><Button danger onClick={()=>{handleSunset(id)}}>下线</Button>}>
      
      </NewsPublish>
    </div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (Publish)