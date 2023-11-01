import React from 'react'
import { Steps } from 'antd';
const description = 'This is a description.';
export default function NewsAdd() {
  return (
    <div>
      <h1>撰写新闻</h1>
      <Steps
    current={1}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
  </div>
  )
}
