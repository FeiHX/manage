import axios from 'axios'
import { useEffect,useState } from 'react'


function usePublish(type,username){

    const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
      axios.get(`/api/news/publishmanage?author=${username}&publishState=${type}`).then((res)=>{
        setdataSource(res.data)
      })
  },[username])

    const handlePublish = () => {

    }
    const handlePublish = () => {
        
    }
    const handlePublish = () => {
        
    }
    return {
        dataSource
    }
} 
export default usePublish