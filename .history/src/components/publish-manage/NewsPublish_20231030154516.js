import React from 'react'
import { Button, Table ,Modal,} from 'antd'




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
      render:(item)=>{
        return <div>
          <Button>button</Button>
        
         
        </div>
      }
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
export default conne NewsPublish(props)

