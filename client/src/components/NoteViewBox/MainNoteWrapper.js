import React from 'react'

export default function MainNoteWrapper({ title, text }) {
  return (
    <div className='wrapper'>
      <div className="title">
        {title}
      </div>
      <div className="text">
        {text}
      </div>
    </div>
  )
}
