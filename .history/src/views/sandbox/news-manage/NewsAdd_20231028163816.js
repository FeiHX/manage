import React from 'react'
import { Steps } from 'antd';
const description1 = '新闻标题，新闻分类';
const description2 = '新闻主体内容';
const description3 = '保存草稿或者提交审核';
export default function NewsAdd() {
  return (
    <div>
      <h1>撰写新闻</h1>
      <Steps
    current={2}
    items={[
      {
        title: '基本信息',
        subTitle:'新闻标题，新闻分类',
      },
      {
        title: '新闻内容',
        description2,
        // subTitle: 'Left 00:00:08',
      },
      {
        title: '新闻提交',
        description3,
      },
    ]}
  />
  </div>
  )
}
