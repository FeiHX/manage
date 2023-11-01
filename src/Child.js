import React from 'react'
import style from'./Child.module.scss'
export default function Child() {
  return (
    <div>Child
        <ul>
            <li className={style.item}>1111-Child</li>
        </ul>
    </div>
  )
}
