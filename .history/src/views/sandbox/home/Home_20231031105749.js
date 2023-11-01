import React, { useEffect, useState, useRef ,useMemo} from 'react'
import { Card, Col, Row, List, Avatar, Button, Drawer, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  PieChartOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import withRoute from './withRoute1.js'
import { connect } from 'react-redux';
// import * as Echarts from 'echarts'
// import _ from 'loadsh'
import './home.css'
const { Meta } = Card





function Home (props) {

  const [allList, setAllList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [newsList,setNewsList] = useState();

  const [open, setOpen] = useState(false)

  const [pieChart, setPieChart] = useState(null)

  // const history = useHistory()
  // const users = JSON.parse(localStorage.getItem('token'))
//有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug
// console.log(props)
  useEffect(() => {
    getViewStartData()
  }, []);
  
  
//有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug有bug
  // 最常浏览
  const getViewStartData = () => {
    axios.get('/api/news/homepublish?publishState=2').then(res => {
      // console.log(res.data.sort((a,b)=> b['star']-a['star']).slice(0,5))
      // res.data.sort((a,b)=> b['view']-a['view']).slice(0,4)
      setViewList(res.data.sort((a,b)=> b['view']-a['view']).slice(0,5))
      setStarList(res.data.sort((a,b)=> b['star']-a['star']).slice(0,5))
    })
  }
  // 最多点赞

  const barRef = useRef()
  const pieRef = useRef()

  useEffect(() => {

    // axios.get('/news?author=admin&publishState=2&_expand=category').then(res => {
    //   // renderBar(_.groupBy(res.data, item => item.category.title))
    //   setAllList(res.data)
    // })

    return () => {
      window.onresize = null
    }
  }, []);

  const renderBar = (obj) => {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = Echarts.init(barRef.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj)
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.keys(obj).map(item => item.length)
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);

    // window.onresize = () => {
    //   myChart.resize()
    // }
  }
  const renderPie = () => {
    // 数据处理
    var currentList = allList.filter(item => item.author === props.username)
    console.log(currentList, allList)
    // console.log(users.username)
    // var groupObj = _.groupBy(currentList, item => item.category.title)

    // var list = []
    // for (let i in groupObj) {
    //   list.push({
    //     name: i,
    //     value: groupObj[i].length
    //   })
    // }

    // var myChart
    // if (!pieChart) {
    //   myChart = Echarts.init(pieRef.current)
    //   setPieChart(myChart)
    // } else {
    //   myChart = pieChart
    // }
    var option;

    option = {
      title: {
        text: `${props.username} 新闻分类图示`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          // data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // option && myChart.setOption(option);
    // window.onresize = () => {
    //   myChart.resize()
    // }
  }
// 搜索框
// const [newsList,setcinemaList] = useState()
  const [mytext,setmytext] = useState('')
  // useEffect(()=>{
  //   //console.log(store.getState().CinemaListReducer.list)
  //   if(store.getState().CinemaListReducer.list.length === 0) {
  //     //去后台取数据
  //     //actionCreator里面写异步
  //     store.dispatch(getCinemaListAction())
  //   }else {
  //     console.log('store 缓存')
  //   }

  //   //订阅
  //   var unsubscribe =  store.subscribe(()=>{
  //     console.log('cinema中订阅',store.getState().CinemaListReducer.list)
  //     setcinemaList(store.getState().CinemaListReducer.list)
  //   })
  //   return () => {
  //     //取消订阅
  //     unsubscribe()
  //   }
  // },[])
  const debounce = (func,delay) => {
    var timeout;
    return () => {
      // clearTimeout(timeout)
      console.log(timeout);
      console.log(clearTimeout(timeout));
      
      timeout = setTimeout(()=>{
        // func.call(this);
        console.log('dingshiqi');
        // console.log(timeout);
      },delay)
      // clearTimeout(timeout)
    }
  }
  const getNewsList =
   useMemo(()=>props.news?.filter(item=>item.
    title.toUpperCase().includes(mytext.toUpperCase()) ||
    item.subheading.toUpperCase().includes(mytext.toUpperCase())
    ),[props.news,mytext])

  
  // debounce(getNewsList,2000)()
  // console.log(debounce(getNewsList,2000));
  return (
    <div>
      
    <div style={{ minWidth: 613 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title={<div>用户最常浏览 <BarChartOutlined /></div>} bordered={true}>
            <List
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <Button type='link' onClick={() => props.history.push(`/news-manage/preview/${item.id}`)}>{item.title}</Button>

                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<div>用户点赞最多 <BarChartOutlined /></div>} bordered={true}>
            <List
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <Button type='link' onClick={() => props.history.push(`/news-manage/preview/${item.id}`)}>{item.title}</Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card

              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title="Card title"
                description="This is the description"
              />
        </Card>
        </Col>


      </Row>

      <div ref={barRef} style={{
        width: '100%', height: 500
      }}></div>

      <Drawer width='50%' title="个人新闻分类" placement="right" onClose={() => setOpen(false)} open={open}>
        <div ref={pieRef} style={{
          width: '100%', height: 500
        }}></div>
      </Drawer>
    </div>
{/* //搜索框 */}
<div>
      <input value={mytext} onChange={(evt)=>{
        setmytext(evt.target.value);
        
        // debounce(getNewsList,2000)()
  }} id='container' ></input>
        {
             getNewsList?.map(item=>
              <dl key={item.id} style={{padding:'10px'}}>
                <dt>{item.title}</dt>
                <dd style={{fontSize:'12px',color:'gray'}}>{item.subheading}</dd>
              </dl>)
          }
    </div>



    </div>
  )
}
const mapStateToProps = ({getNews:{news},setCurrentUserReducer:{username}}) => {
  // console.log(news)
  return {
    news
  }
}
const mapDispatchToProps = {
  getViewData() {
    // console.log('get_news')
    return (dispatch)=>{
      axios.get('/api/news?publishState=2').then(res => {
        // console.log(res.data)
        // setViewList(res.data)
        dispatch({
          type:"get_news",
          payload:res.data
          }
        )
      })
    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRoute(Home)) 

