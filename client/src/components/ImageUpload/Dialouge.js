import React from 'react'

export default function Dialouge() {
    return (
        <div className='main_box w-screen h-screen fixed top-0 left-0 bg-blur-background z-50 flex justify-center items-center'>
            <div className="mainBx md:w-[500px] w-[450px] h-[400px] bg-white rounded-md p-4 relative">
                <div className="title font-main text-2xl font-semibold">
                    Upload or Shoot Photo
                </div>
                <div className="below_bx w-full relative flex justify-between items-center  h-[300px]  mt-4">
                  <button className='font-main uppercase font-semibold bg-main-color px-3 py-2 rounded-xl'>upload photo</button>
                </div>
            </div>
        </div>
    )
}
