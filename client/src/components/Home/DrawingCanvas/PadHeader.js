import React, { useState, useRef } from 'react'
import RoundButton from './../../UI/HeaderButton/RoundButton';
import { IoSaveOutline, IoColorFill } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';

import { BsFullscreenExit, BsFillEraserFill, BsArrowsFullscreen, BsPencilFill } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import PenBox from './PenBox';
import useClickOutside from './../../../helpers/useClickOutside';


export default function PadHeader({ setFullBackground, fullBackground, setShowDrawingPad, handleErase, colors, setPencilColor, pencilColor, clearCanvas, currentActive, setCurrentActive, onPressForSave }) {
  const [showPenBox, setShowPenBox] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const iconColor = "text-slate-400";
  const colorBoxRef = useRef(null);
  useClickOutside(colorBoxRef, () => setShowPenBox(false));

  return (
    <div className='w-full h-[60px] flex border-b border-slate-300 items-center justify-between px-2'>
      <div className="left flex relative">
        <RoundButton
          onPress={() => setShowDrawingPad(false)}
          icon={<AiOutlineArrowLeft
            className={iconColor}
          />}
        />
        <RoundButton
          active={currentActive === "pencil" && true}
          onPress={() => setCurrentActive('pencil')}
          icon={<BsPencilFill
            style={{
              color: pencilColor === 'white' ? 'black' : pencilColor
            }}
          />}
        />
        <RoundButton
          reference={colorBoxRef}
          onPress={() => setShowPenBox(!showPenBox)}
          bottomWrapper={showPenBox && <PenBox
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colors={colors}
            setPencilColor={setPencilColor}
          />}
          icon={<IoColorFill
            style={{
              color: pencilColor === 'white' ? 'black' : pencilColor
            }}
            className={iconColor}

          />}
        />
        <RoundButton
          active={currentActive === "erase" && true}
          onPress={handleErase}
          icon={<BsFillEraserFill
            className={iconColor}
          />}
        />
        <RoundButton
          onPress={clearCanvas}
          icon={<FaTrash
            className={iconColor}
          />}
        />
      </div>
      <div className="right flex">
        <RoundButton
          onPress={() => setFullBackground(!fullBackground)}
          icon={fullBackground ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
        />
        <RoundButton
          onPress={onPressForSave}
          icon={<IoSaveOutline />}
        />
      </div>
    </div>
  )
}
