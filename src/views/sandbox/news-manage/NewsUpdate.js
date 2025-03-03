import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Steps,
  Form,
  Input,
  Select,
  message,
  notification
} from "antd";
import Axios from "../../../utils/myAxios";
import NewsEditor from "../../../components/news-manage/NewsEditor";
import "./NewsAdd.css";
import withRoute from "../../../components/sandbox/withRoute";
import { connect } from "react-redux";
const { Option } = Select;

function NewsUpdate(props) {
  const [current, setCurrent] = useState(0);
  const [formInfo, setFormInfo] = useState();
  const [content, setContent] = useState();
  const [newInfo, setNewInfo] = useState(null);
  const NewsForm = useRef();
  useEffect(
    () => {
      Axios.get(`/api/news/preview?id=${props.history.param.id}`).then(res => {
        setNewInfo(res.data[0]);
        NewsForm.current.setFieldsValue({
          title: res.data[0].title,
          subheading: res.data[0].subheading,
          categoryId: res.data[0].categoryId
        });
        setContent(res.data[0].content);
      });
    },
    [props.history.param.id]
  );
  let handlerNext = () => {
    if (current === 0) {
      NewsForm.current
        .validateFields()
        .then(res => {
          setFormInfo(res);
          setCurrent(current + 1);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if (content === "") {
        message.error("新闻内容不能为空");
      } else {
        setCurrent(current + 1);
      }
    }
  };
  const handlerPrevious = () => {
    setCurrent(current - 1);
  };
  // 保存草稿/提交
  const handleSave = auditState => {
    Axios.patch(`/api/news/update/draft?id=${props.history.param.id}`, {
      ...formInfo,
      content: content,
      auditState: auditState // 0-草稿箱、1-待审核、2-已审核、3-驳回
    }).then(res => {
      const ws = new WebSocket(
        "wss://my-manage.cn/websocket/notice?type=submit"
      );
      ws.onopen = function() {
        ws.send(
          JSON.stringify({
            type: "submit",
            send: props.username,
            recieve: props.region,
            content: `待审核:用户${props.username}提交新闻《${formInfo.title}》`
          })
        );
      };
      props.history.push(
        auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
      );
      notification.info({
        message: "更新成功",
        description: `您可以到${auditState === 0
          ? "【新闻管理/草稿箱】"
          : "【审核管理/审核列表】"}中查看您的新闻`,
        placement: "bottomRight",
        duration: 1
      });
      message.success(`${auditState === 0 ? "保存" : "提交"}成功`);
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
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              span: 20
            }}
            style={{
              maxWidth: 600
            }}
            initialValues={{
              remember: true
            }}
            autoComplete="off"
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻副标题"
              name="subheading"
              rules={[
                {
                  required: true,
                  message: "Please input your subheading!"
                }
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
                  message: "Please input your categoryId!"
                }
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
      <div className={current === 1 ? "" : "hidden"}>
        <NewsEditor
          content={content}
          getContent={value => {
            setContent(value);
          }}
        />
      </div>
      <div className={current === 2 ? "" : "hidden"} />
      <div style={{ marginTop: "50px" }}>
        {current === 2 &&
          <span>
            <Button type="primary" onClick={() => handleSave(0)}>
              保存草稿箱
            </Button>
            <Button danger onClick={() => handleSave(1)}>
              提交审核
            </Button>
          </span>}
        {current < 2 &&
          <Button type="primary" onClick={handlerNext}>
            下一步
          </Button>}
        {current > 0 && <Button onClick={handlerPrevious}>上一步</Button>}
      </div>
    </div>
  );
}
const mapStateToProps = ({ CategoriesReducer: { categories } }) => {
  return {
    categories
  };
};
export default connect(mapStateToProps)(withRoute(NewsUpdate));
