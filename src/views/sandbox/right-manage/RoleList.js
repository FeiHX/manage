import { Table, Button, Modal, Tree } from "antd";
import Axios from "../../../utils/myAxios";
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import withRoute from "../../../components/sandbox/withRoute";
import { connect } from "react-redux";

function RoleList(props) {
  const [roleListTabData, setroleListTabData] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [rightTreeData, setrightTreeData] = useState([]);
  const [currentRights, setcurrentRight] = useState([]);
  const [currentId, setcurrentId] = useState(0);
  useEffect(() => {
    Promise.all([
      Axios.get("/api/rightlist"),
      Axios.get("/api/rightlistchildren")
    ]).then(res => {
      let rightListChildren = res[1].data.map(item => {
        return { ...item, key: item.rightKey };
      });
      let rightList = res[0].data.filter(data => data.pagepermission != 2);
      let treeData = rightList.map(item => {
        return {
          ...item,
          children: rightListChildren.filter(
            data => data.rightId == item.id && data.pagepermission != 2
          ),
          key: item.rightKey
        };
      });
      setrightTreeData(treeData);
      setroleListTabData(props.rolelist);
    });
  }, []);
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
      title: "角色名称",
      dataIndex: "roleName"
    },
    {
      title: "操作",
      render: item => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setisModalOpen(true);
                setcurrentRight(item.rights);
                setcurrentId(item.id);
              }}
            />
          </div>
        );
      }
    }
  ];
  const handleOk = () => {
    setisModalOpen(false);
    let newRoleListTabData = roleListTabData.map(roleTabData => {
      if (roleTabData.id === currentId) {
        return {
          ...roleTabData,
          rights: currentRights
        };
      }
      return roleTabData;
    });
    setroleListTabData(newRoleListTabData);
    (function() {
      props.changeRolelist(newRoleListTabData);
      Axios.patch(`/api/rolelist?id=${currentId}`, { rights: currentRights });
    })();
  };
  const handleCancel = () => {
    setisModalOpen(false);
  };
  const onCheck = checkKeys => {
    setcurrentRight(checkKeys.checked);
  };
  return (
    <div>
      <Table
        dataSource={roleListTabData}
        columns={columns}
        rowKey={item => item.id}
      />
      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          treeData={rightTreeData}
          checkStrictly={true}
        />
      </Modal>
    </div>
  );
}
const mapStateToProps = ({
  CurrentUserReducer: { roleId },
  RoleListReducer: { rolelist },
  RightListReducer: { rightlist }
}) => {
  return {
    roleId,
    rolelist,
    rightlist
  };
};
const mapDispatchToProps = {
  changeRolelist(rolelist) {
    return {
      type: "change_rolelist",
      payload: rolelist
    };
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(
  withRoute(RoleList)
);
