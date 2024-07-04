import React from 'react'
import { GoPencil } from 'react-icons/go'
export default function ProfileInput({ value, readOnly, edit, setName, setFileChange }) {
  return (
    <div className="input_wrapper relative">
      <input className='w-full border border-slate-400 rounded-md px-2 py-1 font-main outline-none focus:border-blue-600 transition-all' type="text" value={value}
        readOnly={readOnly}
        onChange={(e) => {
          setName(e.target.value);
          setFileChange(true)
        }}
      />
      {edit && <div className="icon absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer w-[28px] h-[28px] bg-slate-300 rounded-full flex justify-center items-center">
        <GoPencil />
      </div>}
    </div>
  )
}
