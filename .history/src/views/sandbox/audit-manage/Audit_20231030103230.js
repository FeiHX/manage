import axios from 'axios';
import React, { useEffect } from 'react'

export default function Audit() {
  useEffect(()=>{ axios
    axios.get('/api/users').then(
      (res)=>{
        let list = [];
 
        res.data?.forEach((item)=>{
          let role = props.roles?.filter(data=>data.roleType === item.roleId);
          item.role = role;
          list.push(item)
        })
        // console.log(list);
        setdataSource(roleObj[props.roleId]==='超级管理员'?list:[...list.filter(item=>item.username===props.username),...list.filter(item=>item.region===props.region&&roleObj[item.roleId]==='区域编辑')])
      }
      )
  },[props.roleId,props.username,props.region])
  return (
    <div>Audit</div>
  )
}
