import { notification, message } from "antd";
import Axios from "../../utils/myAxios.js";
import { useEffect, useState } from "react";

function usePublish(type, username) {
  const [dataSource, setdataSource] = useState([]);
  useEffect(
    () => {
      Axios.get(
        `/api/news/publishmanage?author=${username}&publishState=${type}`
      ).then(res => {
        setdataSource(res.data);
      });
    },
    [username, type]
  );
  const handlePublish = data => {
    setdataSource(dataSource.filter(item => item.id !== data.id));
    Axios.patch(`/api/news/update/publish?id=${data.id}`, {
      publishState: 2,
      publishTime: Date.now() + ""
    }).then(res => {
      const ws = new WebSocket(
        `wss://mymanage.xyz/websocket/notice?type=publish&&send=${username}`
      );
      ws.onopen = function() {
        ws.send(
          JSON.stringify({
            type: "publish",
            time: Date.now(),
            send: username,
            recieve: data.author,
            content: `已发布:用户${username}的新闻《${data.title}》已发布`
          })
        );
      };
      notification.info({
        message: "通知",
        description: `您可以到【发布管理/已发布】中查看您的新闻`,
        placement: "bottomRight",
        duration: 2
      });
      message.success(`发布成功`);
    });
  };
  const handleSunset = data => {
    setdataSource(dataSource.filter(item => item.id !== data.id));
    Axios.patch(`/api/news/update/publish?id=${data.id}`, {
      publishState: 3
    }).then(res => {
      const ws = new WebSocket(
        `wss://mymanage.xyz/websocket/notice?type=sunset&&user=${username}`
      );
      ws.onopen = function() {
        ws.send(
          JSON.stringify({
            type: "sunset",
            time: Date.now(),
            send: username,
            recieve: data.author,
            content: `已下线:用户${username}的新闻《${data.title}》已下线`
          })
        );
      };
      notification.info({
        message: "通知",
        description: `您可以到【发布管理/已下线】中查看您的新闻`,
        placement: "bottomRight",
        duration: 2
      });
      message.success(`下线成功`);
    });
  };
  const handleDelete = data => {
    setdataSource(dataSource.filter(item => item.id !== data.id));
    Axios.delete(`/api/news/update/delete?id=${data.id}`).then(res => {
      const ws = new WebSocket(
        `wss://mymanage.xyz/websocket/notice?type=delete&&user=${username}`
      );
      ws.onopen = function() {
        ws.send(
          JSON.stringify({
            type: "delete",
            time: Date.now(),
            send: username,
            recieve: data.author,
            content: `已删除:用户${username}的新闻《${data.title}》已删除`
          })
        );
      };
      notification.info({
        message: "通知",
        description: `您已经删除了已下线的新闻`,
        placement: "bottomRight",
        duration: 2
      });
      message.success(`删除成功`);
    });
  };
  return {
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete
  };
}
export default usePublish;
