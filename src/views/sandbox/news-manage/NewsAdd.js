import React, { useRef } from "react";
import { useState } from "react";
import { Steps, Button, Form, Input, message, notification } from "antd";
import Axios from "../../../utils/myAxios";
import NewsEditor from "../../../components/news-manage/NewsEditor";
import { connect } from "react-redux";
import withRoute from "../../../components/sandbox/withRoute";
import Select, { Option } from "rc-select";
import "rc-select/assets/index.css";
import "antd/dist/reset.css";
import "./NewsAdd.css";

function NewsAdd(props) {
  const NewsForm = useRef(null);
  const [current, setCurrent] = useState(0);
  const [formInfo, setFormInfo] = useState({});
  const [content, setContent] = useState("请输入新闻内容！！！");

  let handlerNext = () => {
    if (current === 0) {
      NewsForm.current
        ?.validateFields()
        .then(res => {
          setFormInfo(res);
          setCurrent(current + 1);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if (content.replace(/\s+/g, "") == "<p></p>") {
        message.error("新闻内容不能为空");
      } else if (content === "请输入新闻内容！！！") {
        message.error("注意!新闻内容为初始！！请输入新闻内容！！！");
        setCurrent(current + 1);
      } else {
        setCurrent(current + 1);
      }
    }
  };
  const handlerPrevious = () => {
    setCurrent(current - 1);
  };
  const handleSave = auditState => {
    let nowTime = Date.now();
    Axios.post("/api/news", {
      ...formInfo,
      content: content,
      region: props.region,
      author: props.username,
      roleId: props.roleId,
      auditState: auditState,
      publishState: 0,
      createTime: nowTime + "",
      star: 0,
      view: 0,
      publishTime: 0
    }).then(res => {
      if(auditState) {
        const ws = new WebSocket(
          `wss://my-manage.cn/websocket/notice?type=submit&&user=${props.username}`
        );
        ws.onopen = function() {
          ws.send(
            JSON.stringify({
              type: "submit",
              time: Date.now(),
              send: props.username,
              recieve: props.region,
              content: `待审核:用户${props.username}提交新闻《${formInfo.title}》`
            })
          );
        };
      }
      props.history.push(
        auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
      );
      notification.info({
        message: `通知`,
        description: `您可以到${auditState === 0 ? "草稿箱" : "审核列表"}中查看您的新闻`,
        placement: "bottomRight",
        duration: 1
      });
    });
  };
  return (
    <div>
      <h1>撰写新闻</h1>
      <Steps
        current={current}
        items={[
          {
            title: "基本信息",
            subTitle: "新闻标题，新闻分类"
          },
          {
            title: "新闻内容",
            subTitle: "新闻主体内容"
          },
          {
            title: "新闻提交",
            subTitle: "保存草稿或者提交审核"
          }
        ]}
      />
      <div className={current === 0 ? "" : "hidden"}>
        <div style={{ marginTop: "50px" }}>
          <Form
            ref={NewsForm}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="title" />
            </Form.Item>
            <Form.Item
              label="新闻副标题"
              name="subheading"
              rules={[
                { required: true, message: "Please input your subheading!" }
              ]}
            >
              <Input placeholder="subheading" />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                { required: true, message: "Please input your category!" }
              ]}
            >
              <Select>
                {props.categories.map(item =>
                  <Option value={item.id} key={item.id}>
                    {item.title}
                  </Option>
                )}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        className={current === 1 ? "" : "hidden"}
        placeholder="react-draft-wysiwyg"
      >
        <NewsEditor
          className={current === 1 ? "" : "hidden"}
          content={content}
          getContent={value => {
            setContent(value);
          }}
        />
      </div>
      <div style={{ marginTop: "50px" }}>
        {current == 2 &&
          <span>
            <Button
              placeholder="saveDraft"
              type="primary"
              onClick={() => handleSave(0)}
            >
              保存草稿箱
            </Button>
            <Button danger placeholder="submit" onClick={() => handleSave(1)}>
              提交审核
            </Button>
          </span>}
        {current < 2 &&
          <Button placeholder="nextStep" type="primary" onClick={handlerNext}>
            下一步
          </Button>}
        {current > 0 &&
          <Button placeholder="preStep" onClick={handlerPrevious}>
            上一步
          </Button>}
      </div>
    </div>
  );
}
const mapStateToProps = ({
  CategoriesReducer: { categories },
  CurrentUserReducer: { region, username, roleId }
}) => {
  return {
    region,
    username,
    roleId,
    categories
  };
};

export default connect(mapStateToProps)(withRoute(NewsAdd));
