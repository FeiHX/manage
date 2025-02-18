import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, Col, Row, List, Avatar, Button, Drawer } from "antd";
import {
  EditOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import withRoute from "../../../components/sandbox/withRoute.js";
import { connect } from "react-redux";
import Echarts from "../../../utils/echarts.js";
import _ from "lodash";
import groupBy from "lodash/groupBy";
import "./home.css";
import img1 from "../../../image/JiqGstEfoWAOHiTxclqi.png";
import img2 from "../../../image/QasfAllzWOlzRzlqooai.jpg";
const { Meta } = Card;

function Home(props) {
  const [allList, setAllList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [open, setOpen] = useState(false);
  const [pieChart, setPieChart] = useState(null);
  const [barData, setBarData] = useState();
  useEffect(() => {
    getViewStartData();
    // return () => {
    //     window.onresize = null;
    // }
  }, []);
  const getViewStartData = () => {
    axios
      .all(
        ["/api/categories", "/api/news/homepublish?publishState=2"].map(item =>
          axios.get(item)
        )
      )
      .then(res => {
        setViewList(
          res[1].data.sort((a, b) => b["view"] - a["view"]).slice(0, 5)
        );
        setStarList(
          res[1].data.sort((a, b) => b["star"] - a["star"]).slice(0, 5)
        );
        // renderBar(groupBy(res[1].data,item=>item.categoryId),res[0].data)
        setBarData(groupBy(res[1].data, item => item.categoryId), res[0].data);
        setAllList(res[1].data);
      });
  };
  const barRef = useRef();
  const pieRef = useRef();
  const renderBar = obj => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = Echarts.init(barRef.current);
    // 指定图表的配置项和数据
    var option = {
      title: { text: "新闻分类图示" },
      tooltip: {},
      legend: { data: ["数量"] },
      xAxis: {
        data: props.categories,
        axisLabel: {
          rotate: "60",
          interval: 0
        }
      },
      yAxis: { minInterval: 1 },
      series: [
        {
          name: "数量",
          type: "bar",
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };
    myChart.setOption(option);
    // window.onresize = () => {
    //     myChart.resize()
    // }
  };
  const renderPie = () => {
    // 数据处理
    let newsMap = new Map();
    let newsList = [];
    var currentList = allList.filter(item => item.author === props.username);
    let groupObj = Object.entries(
      groupBy(currentList, item => item.categoryId)
    );
    props.categories.map(item => {
      newsMap.set(item.id, item.title);
    });
    groupObj.forEach(item => {
      item[0] = newsMap.get(item[0] - 0);
    });
    groupObj.map(item => {
      newsList.push({
        name: item[0],
        value: item[1].length
      });
    });
    let myChart;
    if (!pieChart) {
      myChart = Echarts.init(pieRef.current);
      setPieChart(myChart);
    } else {
      myChart = pieChart;
    }
    let option = {
      title: { text: `${props.username} 新闻分类图示`, left: "center" },
      tooltip: { trigger: "item" },
      legend: { orient: "vertical", left: "left" },
      series: [
        {
          name: "发布数量",
          type: "pie",
          radius: "50%",
          data: newsList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
    // window.onresize = () => {
    //     myChart.resize()
    // }
  };
  return (
    <div>
      <div style={{ minWidth: 613 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title={
                <div>
                  用户最常浏览 <BarChartOutlined />
                </div>
              }
              bordered={true}
            >
              <List
                dataSource={viewList}
                renderItem={item =>
                  <List.Item className="ant-card-meta-title">
                    <Button
                      type="link"
                      onClick={() =>
                        props.history.push(`/news-manage/preview/${item.id}`)}
                    >
                      {item.title}
                    </Button>
                  </List.Item>}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={
                <div>
                  用户点赞最多 <BarChartOutlined />
                </div>
              }
              bordered={true}
            >
              <List
                dataSource={starList}
                renderItem={item =>
                  <List.Item className="ant-card-meta-title">
                    <Button
                      type="link"
                      onClick={() =>
                        props.history.push(`/news-manage/preview/${item.id}`)}
                    >
                      {item.title}
                    </Button>
                  </List.Item>}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              cover={
                <img alt="example" height="100%" width="100%" src={img1} />
              }
              actions={[
                <EditOutlined
                  key="edit"
                  placeholder="chart"
                  onClick={async () => {
                    await setOpen(true);
                    renderPie();
                    renderBar(barData);
                  }}
                />
              ]}
            >
              <Meta
                avatar={<Avatar src={img2} />}
                title={props.username}
                description={
                  <div>
                    <b>
                      {props.region}
                    </b>
                    <span style={{ paddingLeft: "30px" }}>
                      {props.role}
                    </span>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
        {/* <div ref={barRef} style={{height:'400px',marginTop:'30px'}}></div> */}
        <Drawer
          width="50%"
          title="个人新闻分类"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <div ref={pieRef} style={{ width: "100%", height: 360 }} />
          <div ref={barRef} style={{ width: "100%", height: 230 }} />
        </Drawer>
      </div>
    </div>
  );
}
const mapStateToProps = ({
  CurrentUserReducer: { username, region, role },
  CategoriesReducer: { categories }
}) => {
  return {
    username,
    region,
    role,
    categories
  };
};

export default connect(mapStateToProps, null)(withRoute(Home));
