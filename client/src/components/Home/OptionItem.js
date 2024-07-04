import React from 'react'

export default function OptionItem({onPress,title}) {
  return (
    <div
                    onClick={onPress}
                    className='item px-2 cursor-pointer hover:bg-slate-200 py-1 select-none'>
                    {title}
                </div>
  )
}
