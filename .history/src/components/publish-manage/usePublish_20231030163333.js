import axios from 'axios'
import { useEffect,useState } from 'react'


function usePublish(type,username){

    const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
      axios.get(`/api/news/publishmanage?author=${username}&publishState=${type}`).then((res)=>{
        setdataSource(res.data)
      })
  },[username])

    const handlePublish = (id) => {
        
        setdataSource(dataSource.filter(item=>item.id!==id))

        axios.patch(`/api/news/update/publish?id=${id}`, {
     
            "publishState": 2 ,
            "publishTime":Date.now()
          }).then(res => {
            props.history.push('/publish-manage/published')
            notification.info({
              message: '通知',
              description: `您可以到【发布管理/已发布】中查看您的新闻`,
              placement: 'bottomRight'
            })
            message.success(`发布成功`)
          })
    }
    const handleSunset = (id) => {
        
        setdataSource(dataSource.filter(item=>item.id!==id))
    }
    const handleDelete = (id) => {
        
        setdataSource(dataSource.filter(item=>item.id!==id))
    }
    return {
        dataSource,handlePublish,handleSunset,handleDelete
    }
} 
export default usePublish