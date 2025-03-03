import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Axios from "../../../utils/myAxios";
import "./NewsPreview.css";
import joe from "joe-tools";
import withRoute from "../../../components/sandbox/withRoute";
import { HeartTwoTone } from "@ant-design/icons";

function NewsPreview(props) {
  const [newInfo, setNewInfo] = useState(null);
  useEffect(
    () => {
      Axios.get(`/api/news/preview?id=${props.history.param.id}`)
        .then(res => {
          setNewInfo({
            ...res.data[0],
            view: res.data[0].view + 1
          });
          return res.data[0];
        })
        .then(res => {
          Axios.patch(`/api/news/preview/view?id=${props.history.param.id}`, {
            view: res.view + 1
          });
        });
    },
    [props.history.param.id]
  );
  const auditList = ["未审核", "审核中", "已通过", "未通过"];
  const publishList = ["未发布", "待发布", "已上线", "已下线"];
  const colorList = ["", "orange", "green", "red"];
  const handleStar = () => {
    setNewInfo({
      ...newInfo,
      star: newInfo.star + 1
    });
    Axios.patch(`/api/news/preview/star?id=${props.history.param.id}`, {
      star: newInfo.star + 1
    });
  };
  return (
    <div style={{ minWidth: 750 }}>
      {newInfo &&
        <div className="preview">
          <div className="header">
            <Button
              style={{ border: "none", fontSize: 16 }}
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
            />{" "}
            {newInfo.title}
            <span className="subhead">{newInfo.subheading}</span>
            <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStar()} />
          </div>
          <ul>
            <li>
              创建者：{newInfo.author}
            </li>
            <li>
              创建时间：{joe.dateFormat(newInfo.createTime - 0)}
            </li>
            <li>
              发布时间：{newInfo.publishTime
                ? joe.dateFormat(newInfo.publishTime - 0)
                : "-"}
            </li>
            <li>
              区域：{newInfo.region}
            </li>
            <li>
              审核状态：<span style={{ color: colorList[newInfo.auditState] }}>
                {auditList[newInfo.auditState]}
              </span>
            </li>
            <li>
              发布状态：<span style={{ color: colorList[newInfo.publishState] }}>
                {publishList[newInfo.publishState]}
              </span>
            </li>
            <li>
              访问数量：<span style={{ color: "green" }}>{newInfo.view}</span>
            </li>
            <li>
              点赞数量：<span style={{ color: "green" }}>{newInfo.star}</span>
            </li>
            <li>
              评论数量：<span style={{ color: "green" }}>0</span>
            </li>
          </ul>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: newInfo.content }}
          />
        </div>}
    </div>
  );
}
export default withRoute(NewsPreview);
