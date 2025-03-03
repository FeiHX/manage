import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { connect } from "react-redux";
import withRoute from "../sandbox/withRoute";
const { Option } = Select;
const UserForm1 = props => {
  const [isDisabled, setisDisabled] = useState(false);
  //监听props，只有当真正改变的时候，才选择调整是否禁用区域选项，
  //如果只是改变了角色，区域禁用实时更新，但之后点取消了，禁用选项也要回调
  useEffect(
    () => {
      setisDisabled(props.isUpdateDisabled);
    },
    [props]
  );
  //确定当前登录用户的区域选择选项，添加用户和更新里的表单共用了UserForm组件，所以要区分开,isUpdate={true}为更新
  // const {roleId,region} = JSON.parse(localStorage.getItem('token'))
  const { roleId, region } = props;
  const roleObj = {
    "1": "superadmin",
    "2": "admin",
    "3": "editor"
  };
  const checkRegionDisabled = item => {
    if (props.isUpdate) {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return item.value !== region;
      }
    }
  };
  //确定当前登录用户的角色选择选项，添加用户和更新里的表单共用了UserForm组件，所以要区分开,isUpdate={true}为更新
  const checkRoleDisabled = item => {
    if (props.isUpdate) {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return roleObj[item.id] !== "editor";
      }
    }
  };
  return (
    <Form ref={props.refInstance} layout="vertical">
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "用户名不能为空!"
          }
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "密码不能为空!"
          }
        ]}
      >
        <Input placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={
          isDisabled
            ? []
            : [
                {
                  required: true,
                  message: "请选择区域!"
                }
              ]
        }
      >
        <Select disabled={isDisabled}>
          {props.regionList.map(item =>
            <Option
              value={item.value}
              key={item.id}
              disabled={checkRegionDisabled(item)}
            >
              {item.title}
            </Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: "请选择用户角色！"
          }
        ]}
      >
        <Select
          onChange={value => {
            if (value === 1) {
              setisDisabled(true);
              props.refInstance.current.setFieldsValue({
                region: "全球"
              });
            } else {
              setisDisabled(false);
            }
          }}
        >
          {props.rolelist?.map(item =>
            <Option
              value={item.id}
              key={item.id}
              disabled={checkRoleDisabled(item)}
            >
              {item.roleName}
            </Option>
          )}
        </Select>
      </Form.Item>
    </Form>
  );
};
const mapStateToProps = ({
  CurrentUserReducer: { roleId, region, username },
  RoleListReducer: { rolelist }
}) => {
  return {
    roleId,
    region,
    username,
    rolelist
  };
};
const UserForm = connect(mapStateToProps)(withRoute(UserForm1));
export default React.forwardRef((props, ref) =>
  <UserForm {...props} refInstance={ref} />
);
