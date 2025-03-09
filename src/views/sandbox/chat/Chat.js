import React, { useEffect, useState, useRef } from "react";
import { Layout, Menu, Form, Button, Input } from "antd";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./chat.css";
import { parse, stringify } from 'flatted';
import styled from 'styled-components';
import NewsEditor from "../../../components/news-manage/NewsEditor";
const MyNewsEditor = styled(NewsEditor)``;

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const Chat = props => {
  const [content,setContent] = useState('');
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
  const onFinish = () => {
    if (recieve == "") {
      alert("请选择一个用户来发送信息");
      return;
    }else if(content == "" || content.replace(/\s+/g, "") == "<p></p>") {
      alert('请输入消息')
      return
    } else {
      setMessages([
        ...messages,
        {
          key: new Date().toLocaleTimeString(),
          send: props.username,
          recieve: recieve,
          message: content
        }
      ]);
      const ws = new WebSocket(
        `wss://my-manage.cn/websocket/chat?type=chat&&send=${props.username}&&recieve=${recieve}`
      );
      ws.onopen = function() {
        ws.send(
          stringify({
            key: new Date().toLocaleTimeString(),
            send: props.username,
            recieve: recieve,
            message: content
          })
        );
      };
      ws.onmessage = function(msg) {
        if (msg.data.indexOf("type") == -1) {
          setMessages(
            msg.data.split(",,").map(item => {
              return parse(item);
            })
          );
        }
      };
    }
    
   
    
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
                        ? 'selfMessageContent'
                        : 'messageContent'
                      } 
                      dangerouslySetInnerHTML={{ __html: message.message }}>
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
                <MyNewsEditor content={content} getContent={(value)=>{setContent(value)}} options={["image", "emoji"]}> 
                  {(clearEditor) => (
                    <button
                      className="submit-button"
                      onClick={() => {
                        onFinish();
                        clearEditor();
                      }}
                    >       
                      发送
                    </button>)}
                </MyNewsEditor>
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
