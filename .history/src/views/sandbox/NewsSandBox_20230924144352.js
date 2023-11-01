import React, { useEffect ,useState} from 'react'

import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Layout } from 'antd'
import './NewsSandBox.css'
import NewsRouter from '../../components/sandbox/NewsRouter'
// import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const { Content } = Layout;
export default function NewsSandBox() {
  // NProgress.start()
  // useEffect(()=>{
  //   NProgress.done()
  // })

  return (
    <div num={num}>
      <button onClick={change}>{num}</button>
      <div></div>
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
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
    </div>
    
    // <NewsRouter></NewsRouter>
  )
}
