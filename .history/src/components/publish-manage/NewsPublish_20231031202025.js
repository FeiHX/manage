import React from 'react'
import {  Table l,} from 'antd'
import { connect } from 'react-redux';

function NewsPublish(props) {
  
  const columns = [
    {
        title: '新闻标题',
        dataIndex: 'title',
        render: (title,item)=>{
          return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
        }
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
      {
        title: '新闻分类',
        dataIndex: 'categoryId',
        render:(categoryId)=>{
          return props.categories.filter(item=>item.id==categoryId)[0].title
        }
      },
    {
      title: '操作',
      render: (item) => props.button(item.id)
    },
  ];
  
  
  return (
    <div>
      <Table dataSource={props.dataSource} columns={columns}
      pagination={{
        pageSize:5
      }}
      rowKey={item=>item.id}
      ></Table>
    </div>
  )
}
const mapStateToProps = ({setCurrentUserReducer:{username},getCategories:{categories}}) => {
    return {
      username,categories
    }
  }
export default connect(mapStateToProps) (NewsPublish)

