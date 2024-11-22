
import React  from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'
function Unpublish(props) {
    const {dataSource, handlePublish} = usePublish(1, props.username)
    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id) => 
                <Button type='primary' onClick={() => {handlePublish(id)}}>发布</Button>} >
            </NewsPublish>
        </div>
    )
}
const mapStateToProps = ({CurrentUserReducer:{username}, CategoriesReducer:{categories}}) => {
    return {
        username,categories
    }
}
export default connect(mapStateToProps)(Unpublish)
