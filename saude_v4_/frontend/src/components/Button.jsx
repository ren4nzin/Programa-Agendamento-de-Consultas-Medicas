import React from 'react'
export default function Button({children, onClick, variant='primary', style, type}) {
  return (
    <button className={'btn ' + variant} onClick={onClick} style={style} type={type}>
      {children}
    </button>
  )
}
