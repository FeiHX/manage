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
        console.log(id)
        setdataSource
    }
    const handleSunset = (id) => {
        console.log(id)
    }
    const handleDelete = (id) => {
        console.log(id)
    }
    return {
        dataSource,handlePublish,handleSunset,handleDelete
    }
} 
export default usePublish