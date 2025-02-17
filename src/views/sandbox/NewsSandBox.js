import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Layout } from 'antd'
import './NewsSandBox.css'
import Redirect from '../../router/Redirect'
const { Content } = Layout;
import { Outlet } from 'react-router-dom'
function NewsSandBox(props) {
    function AuthComponent({children}) {
        return localStorage.jwToken ? children: <Redirect to='/login'></Redirect>
    }
    return (
        <AuthComponent>
            <Layout>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto'
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </AuthComponent>
    )
};

export default NewsSandBox
