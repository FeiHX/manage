import React, { useState } from 'react'

export default function MyLogin() {
    const [myvalue,setmyvalue] = useState()
    // useState
  return (
    <div>
        <input data-testid="username-input1" type="text" value={myvalue} onChange={(e)=>{setmyvalue(e.target.value)}}></input>
    </div>
  )
}
