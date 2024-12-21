
import React from 'react'
import { connect } from 'react-redux'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'
function Publish(props) {
    const {dataSource, handleSunset} = usePublish(2, props.username)
    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(item) => 
                <Button danger onClick={() => {handleSunset(item)}}>下线</Button>}>
            </NewsPublish>
        </div>
    )
}
const mapStateToProps = ({CurrentUserReducer:{username},CategoriesReducer:{categories}}) => {
    return {
        username,categories
    }
}
export default connect(mapStateToProps)(Publish)
