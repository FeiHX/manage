import React from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import withRoute from './withRoute';
import SubMenu from 'antd/es/menu/SubMenu';
import { connect } from 'react-redux';
const { Sider } = Layout;

function SideMenu(props) {
    const checkPagePermission = (item) => {
        if(props.rolelist[props.roleId-1].rights.includes(item.rightKey)) {
            if(['/right-manage','/right-manage/role/list','/right-manage/right/list'].includes(item.rightKey)){
                return 1
            }else {
                return item.pagepermission == 1 
            }
        }        
    
    }
    const renderMenu = (menuList) => {
        return menuList.map(menuListItem => {
            if(checkPagePermission(menuListItem)) {
                if(menuListItem.grade == 1 && menuListItem.rightKey !== '/home' && menuListItem.rightKey !== '/chat') {
                    return menuListItem.children?.length > 0 
                        &&  <SubMenu key={menuListItem.rightKey}  title={menuListItem.title}>
                                {renderMenu(menuListItem.children)}
                            </SubMenu>
                }else {
                      return <Menu.Item key={menuListItem.rightKey} >{menuListItem.title}</Menu.Item>
                }
            }
        })
      }
    const selectKeys = [props.history.location.pathname]
    const openKeys = ['/' + props.history.location.pathname.split('/')[1]]
    return (
        <Sider width={200} trigger={null} collapsible collapsed={props.isCollapsed}>
            <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
                <div className="logo" >新闻管理系统</div>
                <div style={{ flex: 1, "overflow": "auto" }}>
                    <Menu 
                        onClick={(e) => {props.history.push(e.key)}}
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}
                    >
                        {renderMenu(props.rightlist)}
                    </Menu>
                </div>
            </div>
        </Sider>
    )
}
const mapStateToProps = ({ CollApsedReducer: { isCollapsed }, RoleListReducer:{rolelist},
    CurrentUserReducer:{roleId},RightListReducer:{rightlist}}) => {
        return {
            isCollapsed,roleId,rolelist,rightlist
        }
    }
export default connect(mapStateToProps)(withRoute(SideMenu))
