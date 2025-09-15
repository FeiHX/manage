import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Button, Badge, Drawer, List, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MessageOutlined
} from "@ant-design/icons";
import withRoute from "./withRoute";
import { connect } from "react-redux";
import Axios from "../../utils/myAxios.js";
import { data } from "../../utils/data.js";
import joe from "joe-tools";
const { Header } = Layout;

function TopHeader(props) {
  let heartbeatTimer = null;
  let lastHeartbeatTime = 0;
  let heartbeatTimeout = null;
  const heartbeatInterval = 30000; // 30秒发送一次心跳消息
  const timeoutThreshold = 60000; // 60秒内未收到响应则认为连接已断开
  // 发送心跳消息
  function sendHeartbeat(wss) {
    if (wss.readyState === WebSocket.OPEN) {
      wss.send("heartbeat");
      lastHeartbeatTime = Date.now();
    }
  }
  // 启动心跳检测
  function startHeartbeat(wss) {
    heartbeatTimer = setInterval(() => {
      sendHeartbeat(wss);
    }, heartbeatInterval);
    // 设置一个超时检测，用于在指定时间内未收到心跳响应时处理连接断开
    const heartbeatTimeout = setTimeout(() => {
      const currentTime = Date.now();
      if (currentTime - lastHeartbeatTime > timeoutThreshold) {
        console.log("Heartbeat timeout, closing connection");
        wss.close();
      }
    }, timeoutThreshold + heartbeatInterval);
  }
  // 重置心跳定时器
  function resetHeartbeatTimer(wss) {
    clearTimeout(heartbeatTimeout);
    heartbeatTimeout = setTimeout(() => {
      const currentTime = Date.now();
      if (currentTime - lastHeartbeatTime > timeoutThreshold) {
        console.log("Heartbeat timeout after reset, closing connection");
        wss.close();
      }
    }, timeoutThreshold);
  }
  // 停止心跳检测
  function stopHeartbeat() {
    clearInterval(heartbeatTimer);
    clearTimeout(heartbeatTimeout);
  }
  useEffect(
    () => {
      function createWss() {
        const wss = new WebSocket(
          `wss://my-manage.cn/websocket/notice?send=${props.username}`
        );
        // 处理连接打开事件
        wss.onopen = () => {
          startHeartbeat(wss);
        };
        // 处理连接错误事件
        wss.onerror = error => {
          console.error("WebSocket error:", error);
          stopHeartbeat();
        };
        //处理接收消息事件
        wss.onmessage = function(msg) {
          if (msg.data === "heartbeat-response") {
            resetHeartbeatTimer(wss);
          } else {
            let tempNoticeList = JSON.parse(JSON.stringify(props.noticelist));
            tempNoticeList.unshift({
              message: JSON.parse(JSON.parse(msg.data))
            });
            props.changeNoticeList(tempNoticeList);
          }
        };
        // 处理连接关闭事件
        wss.onclose = function(e) {
          stopHeartbeat();
          //由于浏览器的节能策略，即使有心跳检测，游览器网页的最小化还是会导致websocket的断开，错误代码1006
          if (e.code == 1006) {
            createWss();
          }
        };
      }
      createWss();
    },
    [props.noticelist]
  );
  const [visible, setVisible] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <div>
          {props.role}
        </div>
      )
    },
    {
      key: "2",
      danger: true,
      label: "退出",
      onClick: e => {
        props.cleanCurrentUser();
        localStorage.removeItem("jwToken");
        localStorage.removeItem("expiresIn");
        props.history.push("/login");
      }
    }
  ];
  const restoreData = () => {
    let categoriesData = JSON.parse(
      JSON.stringify(data.filter(item => item.name === "categories")[0].data)
    );
    let rightsmenuData = JSON.parse(
      JSON.stringify(data.filter(item => item.name === "rightsmenu")[0].data)
    );
    let rightsmenuchildrenData = JSON.parse(
      JSON.stringify(
        data.filter(item => item.name === "rightsmenuchildren")[0].data
      )
    );
    let rolesrightsmenuData = JSON.parse(
      JSON.stringify(
        data.filter(item => item.name === "rolesrightsmenu")[0].data
      )
    );
    Promise.all([
      Axios.post(`/api/categories/restore`, categoriesData),
      Axios.post(`/api/rightlist/restore`, rightsmenuData),
      Axios.post(`/api/rightlistchildren/restore`, rightsmenuchildrenData),
      Axios.post(`/api/rolelist/restore`, rolesrightsmenuData)
    ]).then(res => {
      props.restoreCategories(categoriesData);
      (function() {
        let rolelist = [];
        for (let i = 0; i < 3; i++) {
          let rights1 = rolesrightsmenuData[i].rights;
          let rights2 = rights1.split(",");
          let list = {
            ...rolesrightsmenuData[i],
            rights: rights2
          };
          rolelist.push(list);
        }

        props.restoreRolelist(rolelist);
      })();
      (function() {
        rightsmenuData.forEach(item => {
          item.children = [];
          item.key = item.rightKey;
          rightsmenuchildrenData.forEach(right => {
            right.key = right.rightKey;
            right.rightId == item.id && item.children.push(right);
          });
        });
        props.restoreRightlist(rightsmenuData);
      })();
    });
  };
  return (
    <div>
      <Header
        style={{ padding: "0,16px", backgroundColor: "white", height: "70px" }}
      >
        {props.isCollapsed
          ? <MenuUnfoldOutlined onClick={props.changeCollapsed} />
          : <MenuFoldOutlined onClick={props.changeCollapsed} />}
        <div style={{ float: "right" }}>
          <span style={{ marginRight: "50px" }}>
            <Button onClick={restoreData}>数据库初始化</Button>{" "}
          </span>
          <span onClick={() => setVisible(true)} style={{ margin: "20px" }}>
            <Button data-testid="notice-button">
              <Badge count={props.noticelist.length}>
                <MessageOutlined style={{ width: "30px", height: "30px" }} />
              </Badge>
            </Button>
          </span>
          <span>
            {" "}欢 迎 <span style={{ color: "#1890ff" }}>
              {props.username}
            </span>{" "}
            回 来{" "}
          </span>
          <Dropdown menu={{ items }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
      <Drawer
        title="通知"
        placement="left"
        onClose={() => setVisible(false)}
        open={visible}
        style={{ position: "absolute" }}
      >
        <List
          itemLayout="horizontal"
          dataSource={props.noticelist}
          renderItem={(item, index) =>
            <List.Item>
              <List.Item.Meta
                title={
                  <span>
                    {item.message.type}---{joe.dateFormat(item.message.time)}
                  </span>
                }
                description={item.message.content}
              />
            </List.Item>}
        />
      </Drawer>
    </div>
  );
}
const mapStateToProps = ({
  CollApsedReducer: { isCollapsed },
  CurrentUserReducer: { username, role },
  NoticeListReducer: { noticelist }
}) => {
  return {
    isCollapsed,
    username,
    role,
    noticelist
  };
};
const mapDispatchToProps = {
  changeNoticeList(noticelist) {
    return {
      type: "change_noticelist",
      payload: noticelist
    };
  },
  changeCollapsed() {
    return {
      type: "change_collapsed"
    };
  },
  cleanCurrentUser() {
    return {
      type: "change_currentuser",
      payload: { roleId: null, username: null, region: null, role: null }
    };
  },
  restoreCategories(categories) {
    return {
      type: "change_categories",
      payload: categories
    };
  },
  restoreRolelist(rolelist) {
    return {
      type: "change_rolelist",
      payload: rolelist
    };
  },
  restoreRightlist(rightlist) {
    return {
      type: "change_rightlist",
      payload: rightlist
    };
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withRoute(TopHeader)
);
