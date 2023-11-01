import React, { useEffect } from 'react'

export default function Unpublish() {

  useEffect(()=>{
      axios.get(`/api/news?author=${props.username}`)
  })



  return (
    <div>Unpublish</div>
  )
}
