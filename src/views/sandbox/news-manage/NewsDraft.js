import React, { useEffect, useState } from "react";
import { Button, Table, Modal, notification, message } from "antd";
import Axios from "../../../utils/myAxios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UploadOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import withRoute from "../../../components/sandbox/withRoute";
const { confirm } = Modal;

function NewsDraft(props) {
  const [dataSource, setdataSource] = useState([]);
  useEffect(
    () => {
      Axios.get(`/api/news/draft?author=${props.username}`).then(res => {
        setdataSource(res.data);
      });
    },
    [props.username]
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: id => {
        return (
          <b>
            {id}
          </b>
        );
      }
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return (
          <Button
            type="link"
            onClick={() =>
              props.history.push(`/news-manage/preview/${item.id}`)}
          >
            {title}
          </Button>
        );
      }
    },
    {
      title: "新闻副标题",
      dataIndex: "subheading"
    },
    {
      title: "作者",
      dataIndex: "author"
    },
    {
      title: "分类",
      dataIndex: "categoryId",
      render: categoryId => {
        return props.categories.filter(item => item.id === categoryId)[0]?.title;
      }
    },
    {
      title: "操作",
      render: item => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            />
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                props.history.push(`/news-manage/update/${item.id}`);
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<UploadOutlined />}
              onClick={() => handleCheck(item.id)}
            />
          </div>
        );
      }
    }
  ];
  const handleCheck = id => {
    Axios.patch(`/api/news/update/upload?id=${id}`, {
      auditState: 1
    }).then(res => {
      props.history.push("/audit-manage/list");
      notification.info({
        message: "提交成功",
        description: `您可以到【审核管理/审核列表】中查看您的新闻`,
        placement: "bottomRight",
        duration: 1
      });
      message.success("提交成功");
    });
  };
  const confirmMethod = item => {
    confirm({
      title: "你确定删除吗?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {}
    });
  };
  const deleteMethod = item => {
    //更新当前页面内容并且后端同步
    setdataSource(dataSource.filter(data => data.id !== item.id));
    Axios.delete(`/api/news/draft?id=${item.id}`);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={item => item.id}
      />
    </div>
  );
}
const mapStateToProps = ({
  CurrentUserReducer: { username },
  CategoriesReducer: { categories }
}) => {
  return {
    username,
    categories
  };
};
export default connect(mapStateToProps)(withRoute(NewsDraft));
