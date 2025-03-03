import React from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import withRoute from "../sandbox/withRoute";

function NewsPublish(props) {
  const columns = [
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
      title: "新闻分类",
      dataIndex: "categoryId",
      render: categoryId => {
        return props.categories.filter(item => item.id === categoryId)[0]?.title
      }
    },
    {
      title: "操作",
      render: item => props.button(item)
    }
  ];
  return (
    <div>
      <Table
        dataSource={props.dataSource}
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
export default connect(mapStateToProps)(withRoute(NewsPublish));
