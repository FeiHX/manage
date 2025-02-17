import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Col, Row, List, Select, Layout} from 'antd';
import _ from 'lodash';
import groupBy from 'lodash/groupBy'
import './News.css'
import withRoute from '../../components/sandbox/withRoute'
const { Header } = Layout;

function News(props) {
    const [list,setList] = useState([]);
    const [mynews,setNews] = useState([])
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    useEffect(
        () => {
          
            // axios.get(`/api/news/homepublish?publishState=2`).then(res => {
            //     let temp3 = Object.entries(res.data)
            //     temp3.filter(data=>{
            //         return data
            //     })[0] = "item.title"
            // })
            // axios.get(`/api/categories`).then(res => {
            //     let temp4 = Object.entries(res.data)
            //     temp4.filter(data=>{
            //         return data
            //     })[0] = "item.title"
            // })
            // axios.all(['/api/news/homepublish?publishState=2','/api/categories'].map((item)=>axios.get(item)))
            axios.all([axios.get('/api/categories'), axios.get('/api/news/homepublish?publishState=2')])
            .then(res=> {
                setNews(res[1].data)
                let temp = []
                // let temp2 = Object.entries(res[1].data)
                let temp2 = Object.entries(_.groupBy(res[1].data,item=>item.categoryId))

                res[0].data.map(item => {
                    temp2.filter(data => {
                        data[0]==item.id && temp.push(data)
                        return data[0] == item.id
                    })[0][0] = item.title
                })
                setList(temp)
            })
          }, []);
          
    const handleSearch = (newValue) => {
        setData(mynews.filter(item =>
            item.title.toUpperCase().includes(newValue.toUpperCase()) ||
            item.subheading.toUpperCase().includes(newValue.toUpperCase())
        ))
    };
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{margin:'0 auto',backgroundColor:'#DCDCDC'}}>
            <Header style={{ padding: '0,16px', height: '100' }}>
                <div>
                    <span className='login'>新 闻</span>
                    <span style={{margin:100}}>
                        <Select
                            showSearch
                            value={ value }
                            placeholder={ '请输入新闻关键词' }
                            style={{ width: 300 }}
                            defaultActiveFirstOption={ false }
                            suffixIcon={ null }
                            filterOption={ false }
                            onSearch={ handleSearch }
                            onChange={ handleChange }
                            notFoundContent={ null }
                            options={(data || []).map((d) => ({
                                value: d.title,
                                label:  <div type='link' onClick={()=>props.history.push(`/detail/${d.id}`)} >
                                            {'Main:'+d.title}
                                            <div>{'Sub:'+d.subheading}</div>
                                        </div>
                                }
                            ))}
                        />
                    </span>
                    <div style={{float: 'right', color: 'red', fontWeight: 'bold'}}>
                        <span onClick={() => props.history.push(`/login`) }>登 录</span>
                    </div>
                </div>
            </Header>
            <div style={{margin:90}}>
                <Row gutter={[16,16]}>
                    {
                        list?.map(item => 
                            <Col span={8} key={item[0]}>
                                <Card title={item[0]} bordered={true} hoverable={true}>
                                    <List
                                        dataSource={item[1]}
                                        pagination={{pageSize:3}}
                                        renderItem={(data) => (
                                            <List.Item className='ant-card-meta-title'>
                                                <div style={{color:'blue'}} type='link' onClick={() => props.history.push(`/detail/${data.id}`)}>{data.title}</div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        )
                    }   
                </Row>
            </div>
        </div>
      
    )
}
export default withRoute(News)
