import React, { useEffect } from 'react'

export default function Unpublish() {

  useEffect(()=>{
      axios.get(`/api/news?author=${props}`)
  })



  return (
    <div>Unpublish</div>
  )
}
