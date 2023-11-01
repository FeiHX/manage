import axios from 'axios'
import React, { useEffect,useState } from 'react'


function usePublish(type,username){



    const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
      axios.get(`/api/news/publishmanage?author=${username}&publishState=${}`).then((res)=>{
        setdataSource(res.data)
      })
  },[username])
    return {
        dataSource
    }
} 
export default usePublish