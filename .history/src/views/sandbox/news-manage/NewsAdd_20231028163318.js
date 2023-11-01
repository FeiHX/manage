import React from 'react'
import { Steps } from 'antd';
const description1 = '新闻标题，新闻分类';
const description2 = '新闻主体内容'；
const description3 = ''
export default function NewsAdd() {
  return (
    <div>
      <h1>撰写新闻</h1>
      <Steps
    current={2}
    items={[
      {
        title: '基本信息',
        descriptio,
      },
      {
        title: 'In Progress',
        descriptio,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        descriptio,
      },
    ]}
  />
  </div>
  )
}
