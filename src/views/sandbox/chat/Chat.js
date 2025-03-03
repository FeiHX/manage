import React, { useEffect, useState, useRef } from "react";
import { Layout, Menu, Form, Button, Input } from "antd";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./chat.css";
const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const Chat = props => {
  const [selectKeys, setSelectKeys] = useState(0);
  const [userList, setuserList] = useState([]);
  const scrollContainerRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      key: new Date().toLocaleTimeString(),
      send: "系统",
      recieve: "recieve",
      message: "<---请选择用户私聊"
    }
  ]);
  const [recieve, setrecieve] = useState("");
  useEffect(
    () => {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    },
    [messages]
  );
  useEffect(() => {
    const ws2 = new WebSocket(
      `wss://my-manage.cn/websocket/chat?type=userlist&&send=${props.username}`
    );
    ws2.onmessage = function(msg) {
      setuserList(JSON.parse(msg.data));
      ws2.close();
    };
    const ws = new WebSocket(
      `wss://my-manage.cn/websocket/chat?type=chat&&send=${props.username}&&recieve=${recieve}`
    );
    ws.onmessage = function(msg) {
      if (msg.data.indexOf("type") == -1) {
        setMessages(
          msg.data.split(",,").map(item => {
            return JSON.parse(item);
          })
        );
      }
    };
  }, []);
  const renderMenu = () => {
    return userList?.filter(data => data.user != props.username).map(item => {
      return (
        <Menu.Item
          key={item.user}
          onClick={() => {
            setrecieve(item.user);
            const ws = new WebSocket(
              `wss://my-manage.cn/websocket/chat?type=messagelist&&send=${props.username}&&recieve=${item.user}`
            );
            ws.onmessage = function(msg) {
              if (msg.data.indexOf("type") == -1) {
                setMessages(
                  msg.data.split(",,").map(item => {
                    return JSON.parse(item);
                  })
                );
              }
            };
          }}
        >
          {item.user}
        </Menu.Item>
      );
    });
  };
  const myref = useRef();
  const onFinish = ({ message }) => {
    console.log(message, recieve);
    if (recieve == "") {
      alert("请选择一个用户来发送信息");
      return;
    }
    setMessages([
      ...messages,
      {
        key: new Date().toLocaleTimeString(),
        send: props.username,
        recieve: recieve,
        message: message
      }
    ]);
    myref?.current.resetFields();
    const ws = new WebSocket(
      `wss://my-manage.cn/websocket/chat?type=chat&&send=${props.username}&&recieve=${recieve}`
    );
    ws.onopen = function() {
      ws.send(
        JSON.stringify({
          key: new Date().toLocaleTimeString(),
          send: props.username,
          recieve: recieve,
          message: message
        })
      );
    };
    ws.onmessage = function(msg) {
      if (msg.data.indexOf("type") == -1) {
        setMessages(
          msg.data.split(",,").map(item => {
            return JSON.parse(item);
          })
        );
      }
    };
  };
  const select = useRef([]);
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ backgroundColor: "white" }}>私聊 用户</Header>
      <Layout className="site-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={false}
          style={{ backgroundColor: "white" }}
        >
          <div
            style={{ display: "flex", height: "100%", flexDirection: "column" }}
          >
            <div style={{ flex: 1, overflow: "auto" }}>
              <Menu
                onClick={e => {
                  setSelectKeys([e.key]);
                  select.current = [e.key];
                }}
                mode="inline"
                selectedKeys={select.current}
              >
                {renderMenu()}
              </Menu>
            </div>
          </div>
        </Sider>
        <Content>
          <div className="chatWindow">
            <div className="messageList" ref={scrollContainerRef}>
              {messages.map(message => {
                return (
                  <div
                    key={uuidv4()}
                    className={
                      message.send == props.username ? "selfMessage" : ""
                    }
                  >
                    <div
                      className={
                        message.send == props.username
                          ? "selfMessageContent"
                          : "messageContent"
                      }
                    >
                      {message.message}
                    </div>
                    <div className="messageTime">
                      {message.key}--{message.send}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="chat-input-box">
                <Form ref={myref} onFinish={onFinish} name="normal_login">
                  <Form.Item
                    name="message"
                    rules={[
                      { required: true, message: "Please input your Message!" }
                    ]}
                  >
                    <TextArea
                      placeholder="请输入聊天内容"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    发送
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = ({
  CurrentUserReducer: { username, role, roleId },
  ChatMessageReducer: { chatmessagelist }
}) => {
  return {
    username,
    role,
    roleId,
    chatmessagelist
  };
};
const mapDispatchToProps = {
  changeChatMessageList(chatmessagelist) {
    return {
      type: "change_chatmessagelist",
      payload: chatmessagelist
    };
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

```

│  
│  babel.config.js
│  jest.config.js
│  package-lock.json
│  package.json
│  README.md
│  
├─config
│  │  webpack.config.js
│  │  
│  └─jest
│          cssTransform.js
│          fileTransform.js
│          
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      mockServiceWorker.js
│      robots.txt
│      
├─server
│          
└─src
    │  .babelrc
    │  App.css
    │  App.js
    │  babel.config.js
    │  index.css
    │  index.js
    │  logo.svg
    │  setupTests.js
    │  
    ├─components
    │  ├─news-manage
    │  │      NewsEditor.js
    │  │      
    │  ├─publish-manage
    │  │      NewsPublish.js
    │  │      usePublish.js
    │  │      
    │  ├─sandbox
    │  │      index.css
    │  │      SideMenu.js
    │  │      TopHeader.js
    │  │      withRoute.js
    │  │      
    │  ├─user-manage
    │  │      UserForm.js
    │  │      
    │  └─__test__
    │          NewsEditor.test.js
    │          NewsPublish.test.js
    │          SideMenu.test.js
    │          TopHeader.test.js
    │          
    ├─image
    │      JiqGstEfoWAOHiTxclqi.png
    │      QasfAllzWOlzRzlqooai.jpg
    │      
    ├─mocks
    │      handlers.js
    │      server.js
    │      
    ├─redux
    │  │  store.js
    │  │  
    │  └─reducers
    │          CategoriesReducer.js
    │          ChatMessageReducer.js
    │          CollapsedReducer.js
    │          CurrentUserReducer.js
    │          NoticeListReducer.js
    │          RightListReducer.js
    │          RoleListReducer.js
    │          
    ├─router
    │  │  DetailRoute.js
    │  │  IndexRouter.js
    │  │  LoginRoute.js
    │  │  NewsRoute.js
    │  │  Redirect.js
    │  │  
    │  └─__test__
    │          IndexRouter.test.js
    │          
    ├─test
    │      mockStore.js
    │      
    ├─utils
    │      data.js
    │      echarts.js
    │      myAxios.js
    │      
    ├─views
    │  ├─login
    │  │      login.css
    │  │      Login.js
    │  │      LoginForm.js
    │  │      
    │  ├─news
    │  │      Detail.css
    │  │      Detail.js
    │  │      News.css
    │  │      News.js
    │  │      
    │  ├─sandbox
    │  │  │  NewsSandBox.css
    │  │  │  NewsSandBox.js
    │  │  │  
    │  │  ├─audit-manage
    │  │  │      Audit.js
    │  │  │      AuditList.js
    │  │  │      
    │  │  ├─chat
    │  │  │      chat.css
    │  │  │      Chat.js
    │  │  │      
    │  │  ├─home
    │  │  │      home.css
    │  │  │      Home.js
    │  │  │      
    │  │  ├─news-manage
    │  │  │      NewsAdd.css
    │  │  │      NewsAdd.js
    │  │  │      NewsCategory.js
    │  │  │      NewsDraft.js
    │  │  │      NewsPreview.css
    │  │  │      NewsPreview.js
    │  │  │      NewsUpdate.js
    │  │  │      
    │  │  ├─nopermission
    │  │  │      NoPermission.css
    │  │  │      NoPermission.js
    │  │  │      
    │  │  ├─publish-manage
    │  │  │      Publish.js
    │  │  │      Sunset.js
    │  │  │      Unpublish.js
    │  │  │      
    │  │  ├─right-manage
    │  │  │      RightList.js
    │  │  │      RoleList.js
    │  │  │      
    │  │  └─use-manage
    │  │          UserList.js
    │  │          
    │  └─__test__
    │      │  Audit.test.js
    │      │  AuditList.test.js
    │      │  Detail.test.js
    │      │  Home.test.js
    │      │  LoginForm.test.js
    │      │  News.test.js
    │      │  NewsAdd.test.js
    │      │  NoPermission.test.js
    │      │  UserList.test.js
    │      │  
    │      └─__snapshots__
    │              NoPermission.test.js.snap
    │              
    └─__mocks__
            echarts.js
            styleMock.js
            
```


客户端目录

```

│  babel.config.js
│  package.json
│  
├─config
│      webpack.config.js
│      
└─src
    │  App.js
    │  index.css
    │  index.js
    │  logo.svg
    │  
    ├─components
    │  ├─news-manage
    │  │      NewsEditor.js
    │  │      
    │  ├─publish-manage
    │  │      NewsPublish.js
    │  │      usePublish.js
    │  │      
    │  ├─sandbox
    │  │      index.css
    │  │      SideMenu.js
    │  │      TopHeader.js
    │  │      withRoute.js
    │  │      
    │  ├─user-manage
    │  │      UserForm.js
    │  │      
    │  └─__test__
    │          NewsEditor.test.js
    │          NewsPublish.test.js
    │          SideMenu.test.js
    │          TopHeader.test.js
    │          
    ├─image
    │      JiqGstEfoWAOHiTxclqi.png
    │      QasfAllzWOlzRzlqooai.jpg
    │      
    ├─mocks
    │      handlers.js
    │      server.js
    │            
    ├─redux
    │  │  store.js
    │  │  
    │  └─reducers
    │          CategoriesReducer.js
    │          ChatMessageReducer.js
    │          CollapsedReducer.js
    │          CurrentUserReducer.js
    │          NoticeListReducer.js
    │          RightListReducer.js
    │          RoleListReducer.js
    │          
    │          
    ├─router
    │  │  DetailRoute.js
    │  │  IndexRouter.js
    │  │  LoginRoute.js
    │  │  NewsRoute.js
    │  │  Redirect.js
    │  │  
    │  └─__test__
    │          IndexRouter.test.js
    │
    ├─test
    │      mockStore.js
    │     
    ├─utils
    │      data.js
    │      echarts.js 
    │      myAxios.js
    │      
    └─views
        ├─login
        │      login.css
        │      Login.js
        │      LoginForm.js
        │      
        ├─news
        │      Detail.css
        │      Detail.js
        │      News.css
        │      News.js
        │      
        └─sandbox
            │  NewsSandBox.css
            │  NewsSandBox.js
            │  
            ├─audit-manage
            │      Audit.js
            │      AuditList.js
            │      
            ├─chat
            │      chat.css
            │      Chat.js
            │            │      
            ├─home
            │      home.css
            │      Home.js
            │      
            ├─news-manage
            │      NewsAdd.css
            │      NewsAdd.js
            │      NewsCategory.js
            │      NewsDraft.js
            │      NewsPreview.css
            │      NewsPreview.js
            │      NewsUpdate.js
            │      
            ├─nopermission
            │      Nopermission.css
            │      NoPermission.js
            │      
            ├─publish-manage
            │      Publish.js
            │      Sunset.js
            │      Unpublish.js
            │      
            ├─right-manage
            │      RightList.js
            │      RoleList.js
            │      
            └─use-manage
                    UserList.js

```



服务器server目录


```
│  index.js
│  nodemon.json
│  package.json
│  
├─middlewares
│      auth.js
│      cache.js
│      
├─mysql
│      index.js
│      
│      
└─routes
        categoriesRouter
        config.js
        newsRouter.js
        rightlistchildrenRouter.js
        rightlistRouter.js
        rolelistRouter.js
        userRouter.js
```
