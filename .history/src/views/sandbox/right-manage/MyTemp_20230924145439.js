import React from 'react'

function MyTemp() {
    console.log('MyTemp重新渲染了')
  return (
    <div>MyTemp</div>
  )
}
export default React.memo(MyTemp)MyTemp