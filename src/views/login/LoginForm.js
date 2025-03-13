import React from "react";
import { Form, Button, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.css";
import withRoute from "../../components/sandbox/withRoute.js";
import { connect } from "react-redux";
import md5 from "js-md5";
import { RasAes } from '../../utils/crypto';

function LoginForm(props) {
  const onFinish = value => {
    let newValue = {
      username: value.username,
      password: md5(value.password)
    };
    var pubKey =  `-----BEGIN PUBLIC KEY-----
    MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI4Sd1JVtIIrHDoMcknO6iva2+iAMPFo
    Jx+dGrjlgvcYdyePwPJft1ZB4WkZb/vRHN8UKn123CV5B2XolmqrDv0CAwEAAQ==
    -----END PUBLIC KEY-----`
    const { encryptedAesKey, iv, ciphertext } = RasAes({'password':value.password},pubKey)

    props.loginActions(value.username, props.description,{encryptedAesKey,iv,encryptedData: ciphertext}).then(
      r => {
        props.history.push("/home");
      },
      err => {
        notification.info({
          message: `通知`,
          description: `${err.response.data}`,
          placement: "top",
          duration: "1"
        });
      }
    );
    props.getUserList && props.getUserList();
    props.getCategories();
    props.getrolelist && props.getrolelist();
    props.getrightlist();
    const ws = new WebSocket(`wss://my-manage.cn/websocket/notice?type=list`);
    ws.onmessage = function(msg) {
      let list = JSON.parse(msg.data).map(item => {
        item.message = JSON.parse(item.message);
        return item;
      });
      list.reverse();
      props.changeNoticeList(list, ws);
    };
  };
  return (
    <div
      style={{
        background: "rgb(35,39,65)",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div className="formContainer">
        <div className="logintitle">新闻管理系统</div>
        <div className="description">
          {props.description[3]}
        </div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            data-testid="username-input"
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              data-testid="username-input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              data-testid="password-input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <div>
              <span style={{ float: "left" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </span>
              <span style={{ color: "white" }}>- -账号: admin / 1 密码: 1- -</span>
              <span style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    props.history.push(`${props.description[1]}`);
                  }}
                >
                  {props.description[2]}
                </Button>
                <Button onClick={() => props.history.push(`/news`)}>
                  游客访问
                </Button>
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = ({ RoleListReducer: { rolelist } }) => {
  return {
    rolelist
  };
};
export default connect(mapStateToProps, null)(withRoute(LoginForm));
