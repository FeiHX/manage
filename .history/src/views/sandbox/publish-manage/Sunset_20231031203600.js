
import React from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'

function Sunset(props) {


  const {dataSource,handleDelete} = usePublish(3,props.username)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id)=><Button danger onClick={()=>{handleDelete(id)}}>删除</Button>}>

      </NewsPublish>
    </div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
  return {
    username,categories
  }
}
export default connect(mapStateToProps) (Sunset)