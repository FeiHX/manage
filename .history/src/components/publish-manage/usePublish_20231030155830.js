import axios from 'axios'
import React, { useEffect,useState } from 'react'


function usePublish(){



    const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
      axios.get(`/api/news/publishmanage?author=${props.username}&publishState=0`).then((res)=>{
        setdataSource(res.data)
      })
  },[props.username])
    return {

    }
} 
export default usePublish