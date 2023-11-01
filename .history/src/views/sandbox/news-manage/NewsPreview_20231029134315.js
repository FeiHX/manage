import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import {
  ArrowLeftOutlined
} from '@ant-design/icons'

import axios from 'axios'

import './NewsPreview.css'
import joe from 'joe-tools'
import withRoute from '../home/withRoute1'
function NewsPreview (props) {
  console.log(props.history,);
  const [newInfo, setNewInfo] = useState(null)

  useEffect(() => {
    axios.get(`/api/news/preview?id=${props.history.param.id}`,1).then(res => {
      console.log(res.data)
      setNewInfo(res.data[0])
    })
  }, [props.history.param.id])

  const auditList = ['未审核', '审核中', '已通过', '未通过']
  const publishList = ['未发布', '待发布', '已上线', '已下线']
  const colorList = ['', 'orange', 'green', 'red']
  return (
    <div style={{ minWidth: 750 }}>
      {newInfo && (
        <div className='preview'>
          <div className='header'>
            <Button style={{ border: 'none', fontSize: 16 }} icon={<ArrowLeftOutlined />} onClick={() => window.history.back()} /> {newInfo.title}
            <span className='subhead'>{newInfo.subheading}</span>
          </div>
          <ul>
            <li>创建者：{newInfo.author}</li>
            <li>创建时间：{joe.dateFormat(newInfo.createTime)}</li>
            <li>发布时间：{newInfo.publishTime ? joe.dateFormat(newInfo.createTime) : '-'}</li>
            <li>区域：{newInfo.region}</li>
            <li>审核状态：<span style={{ color: colorList[newInfo.auditState] }}>{auditList[newInfo.auditState]}</span></li>
            <li>发布状态：<span style={{ color: colorList[newInfo.publishState] }}>{publishList[newInfo.publishState]}</span></li>
            <li>访问数量：<span style={{ color: 'green' }}>{newInfo.view}</span></li>
            <li>点赞数量：<span style={{ color: 'green' }}>{newInfo.star}</span></li>
            <li>评论数量：<span style={{ color: 'green' }}>0</span></li>
          </ul>
          <div className='content' dangerouslySetInnerHTML={{ __html: newInfo.content }}>
          </div>
        </div>
      )}
    </div>
  )
}
export default withRoute(NewsPreview) 
// import React from 'react'

// export default function NewsPreview() {
//   return (
//     <div>NewsPreview</div>
//   )
// }

