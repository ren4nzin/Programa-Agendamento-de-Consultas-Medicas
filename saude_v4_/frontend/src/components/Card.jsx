import React from 'react'
export default function Card({children, style, onClick}) {
  return <div className="card" style={style} onClick={onClick}>{children}</div>
}
