import React from 'react'
import { useState } from 'react';
import { Steps,Button } from 'antd';
import  './News.css'
export default function NewsAdd() {
  const [current,setCurrent] = useState(0);
  let handlerNext = ()=>{
    setCurrent(current+1)
  }
  let handlerPrevious = ()=>{
    setCurrent(current-1)
  }
  return (
    <div>
      <h1>撰写新闻</h1>
      <Steps
    current={current}
    items={[
      {
        title: '基本信息',
        subTitle:'新闻标题，新闻分类',
      },
      {
        title: '新闻内容',
        
        subTitle: '新闻主体内容',
      },
      {
        title: '新闻提交',
        subTitle: '保存草稿或者提交审核',
      },
    ]}
  />

  <div className={current === 0 ? '' : hidden}>111</div>
  <div className={current === 1 ? '' : hidden}>222</div>
  <div className={current === 2 ? '' : hidden}>333</div>
  <div style={{marginTop:'50px'}}>

    {
      current === 2 && <span>
            <Button type='primary'>保存草稿箱</Button>
            <Button danger>提交审核</Button>
      </span>
    }
    {
      current < 2 && <Button type='primary' onClick={handlerNext}>下一步</Button>
    }
    {
      current > 0 && <Button onClick={handlerPrevious}>上一步</Button>
    }
  </div>
  </div>
  )
}
