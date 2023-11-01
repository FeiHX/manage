import React, { useEffect ,useRef} from 'react'
import { useState } from 'react';
import { Steps,Button,Form,Input,Select } from 'antd';
import  './News.css'
import axios from 'axios'
import NewsEditor from '../../../components/news-manage/NewsEditor';
const {Option} = Select;

export default function NewsAdd() {
  const NewsForm = useRef(null)
  const [current,setCurrent] = useState(0);
  const [categoryList,setCategoryList] = useState([]);
  const [formInfo,setFormInfo] = useState({});
  const [cotent,set]
  useEffect(()=>{
    axios.get('/api/categories').then(
      (res)=>{
        setCategoryList(res.data)
      }
    )
  },[])
  
  let handlerNext = ()=>{
    if(current === 0) {
      NewsForm.current.validateFields().then(res=>{
        console.log(res)
        setCurrent(current+1)
      }).catch(error=>{
        console.log(error)
      })
    }else {
      setCurrent(current+1)
    }
    
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

  <div className={current === 0 ? '' : 'hidden'}>
  
  <div style={{marginTop:'50px'}}>
  <Form
    ref={NewsForm}
    name="basic"
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 20,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="新闻标题"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="新闻分类"
      name="categoryId"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      
      <Select>
        {
          categoryList.map(item=>
          <Option value={item.id} key={item.id}>{item.title}</Option>)
        }
      </Select>
    </Form.Item>
    
  </Form>
  </div>

  </div>
  <div className={current === 1 ? '' : 'hidden'}>
    <NewsEditor getContent={(value)=>{
        console.log(value)
    }}></NewsEditor>
  </div>
  <div className={current === 2 ? '' : 'hidden'}>333</div>
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
