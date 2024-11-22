import { notification ,message} from 'antd'
import axios from 'axios'
import Axios from '../../utils/myAxios.js'
import { useEffect,useState } from 'react'


function usePublish(type,username){
    const [dataSource,setdataSource] = useState([])
  	useEffect(()=>{
      	Axios.get(`/api/news/publishmanage?author=${username}&publishState=${type}`).then((res)=>{
        	setdataSource(res.data)
    	})
  	},[username,type])
    const handlePublish = (id) => {
        setdataSource(dataSource.filter(item=>item.id!==id))
        Axios.patch(`/api/news/update/publish?id=${id}`, {
            "publishState": 2 ,
            "publishTime":Date.now()+''
        }).then(res => {
            notification.info({
            	message: '通知',
            	description: `您可以到【发布管理/已发布】中查看您的新闻`,
             	placement: 'bottomRight',
            	duration: 2,
            })
            message.success(`发布成功`)
          })
    };
    const handleSunset = (id) => {
        setdataSource(dataSource.filter(item=>item.id!==id))
        Axios.patch(`/api/news/update/publish?id=${id}`, {
            	"publishState": 3 ,
          	}).then(res => {
           		notification.info({
              		message: '通知',
              		description: `您可以到【发布管理/已下线】中查看您的新闻`,
              		placement: 'bottomRight',
              		duration: 2,
            	});
        		message.success(`下线成功`)
          })
    }
    const handleDelete = (id) => {
        setdataSource(dataSource.filter(item=>item.id!==id))
        Axios.delete(`/api/news/update/delete?id=${id}`).then(res => {
            notification.info({
              	message: '通知',
              	description: `您已经删除了已下线的新闻`,
              	placement: 'bottomRight',
              	duration: 2,
            })
            message.success(`删除成功`)
          })
    };
    return {
        dataSource,handlePublish,handleSunset,handleDelete
    };
} 
export default usePublish
