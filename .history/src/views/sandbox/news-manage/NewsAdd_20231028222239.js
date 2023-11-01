import React, { useEffect ,useRef} from 'react'
import { useState } from 'react';
import { Steps,Button,Form,Input,Select, message } from 'antd';
import  './News.css'
import axios from 'axios'
import NewsEditor from '../../../components/news-manage/NewsEditor';
import { connect } from 'react-redux';
const {Option} = Select;

 function NewsAdd(props) {
  const NewsForm = useRef(null)
  const [current,setCurrent] = useState(0);
  const [categoryList,setCategoryList] = useState([]);
  const [formInfo,setFormInfo] = useState({});
  const [content,setContent] = useState('');

  
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
        
        setFormInfo(res)
        setCurrent(current+1)
      }).catch(error=>{
        console.log(error)
      })
    }else {
      if(content==='' || content.trim() ==="<p></p>") {
        message.error('新闻内容不能为空')
        
      }else{
        console.log(formInfo,content)
        setCurrent(current+1)
      }

    }
    
  }
  const handlerPrevious = ()=>{
    setCurrent(current-1)
  }
  const handleSave = () => {
    axios.post('/api/categories',{
      ...formInfo,
      "content": content,
      "region": "全球",
      "auditState": 2,
      "publishState": 2,
      "createTime": 1615777743864,
      "star": 1002,
      "view": 2017,
      "id": 1,
      "publishTime": 1615778496314
    })
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
        
        setContent(value)
    }}></NewsEditor>
  </div>
  <div className={current === 2 ? '' : 'hidden'}></div>
  <div style={{marginTop:'50px'}}>

    {
      current === 2 && <span>
            <Button type='primary' onClick={()=>handleSave()}>保存草稿箱</Button>
            <Button danger onClick={()=>handleSave()}>提交审核</Button>
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
const mapStateToProps = ({setCurrentUserReducer:{username}}) => {
  // console.log(state)
  return {
    isCollapsed,username
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewsAdd)
