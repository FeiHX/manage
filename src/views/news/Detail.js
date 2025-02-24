import React, { useEffect, useState } from 'react'
import { Button, message} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios'
import './Detail.css'
import joe from 'joe-tools'
import withRoute from '../../components/sandbox/withRoute'
import {HeartTwoTone } from '@ant-design/icons';

function Detail(props) {
    const [newInfo, setNewInfo] = useState(null)
    useEffect(() => {
        axios.get(`/api/news/preview?id=${props.history.param.id}`).then(res => {
            setNewInfo({
                ...res.data[0],
                view:res.data[0].view + 1
            })
            return res.data[0]
        }).then(res => {
            axios.patch(`/api/news/preview/view?id=${props.history.param.id}`,{
                view:res.view + 1
            })
        })
    }, [props.history.param.id])

    const handleStar = () => {
        setNewInfo({
            ...newInfo,
            star:newInfo.star+1
        })
        axios.patch(`/api/news/preview/star?id=${ props.history.param.id }`,{
            star:newInfo.star + 1
        }).then(() => {
            message.success('点赞成功！')
        })
    }
    return (
        <div style={{ width: '95%', margin: '0 auto', marginTop: 20, minWidth: 750 }}>
            {newInfo && (
                <div className='preview'>
                <div className='header' style={{ fontSize: '22px' }}>
                    <Button style={{ border: 'none' }} icon={<ArrowLeftOutlined style={{width:60,height:60}} />} onClick={() => window.history.back()} /> {newInfo.title}
                    <span className='subhead'>{newInfo.subheading}</span><HeartTwoTone twoToneColor="#eb2f96" onClick={()=>handleStar()}/>
                </div>
                <ul>
                    <li>创建者：{newInfo.author}</li>
                    <li>发布时间：{newInfo.publishTime ? joe.dateFormat(newInfo.publishTime-0) : '-'}</li>
                    <li>区域：{newInfo.region}</li>
                    <li>访问数量：<span style={{ color: 'green' }}>{newInfo.view}</span></li>
                    <li>点赞数量：<span style={{ color: 'green' }}>{newInfo.star}</span></li>
                    <li>评论数量：<span style={{ color: 'green' }}>0</span></li>
                </ul>
                <div className='content' dangerouslySetInnerHTML={{ __html: newInfo.content }}>
                </div>
                </div>
            )}
        </div>
    )
}
export default withRoute(Detail) 


