import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { IoIosClose } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import useClickOutside from '../../helpers/useClickOutside';
export default function TodoCheckBox({ CheckBox, setCheckBox,hideAddInput,background }) {
  const itemAddRef = useRef();
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [text, settext] = useState();
  const [checked, setchecked] = useState(false);
  const [focusID, setfocusID] = useState(null);
  const [Inputfocus, setInputfocus] = useState(false);


  const handleTextChange = (getId, title) => {
    const updateTask = CheckBox.map((CheckBox) => {
      if (CheckBox.id === getId) {
        return { ...CheckBox, title: title };
      } else {
        return CheckBox;
      }
    });
    setCheckBox(updateTask)
  }
  const handleCheckBox = (getId) => {
    const updateTask = CheckBox.map((CheckBox) => {
      setfocusID(getId)
      if (CheckBox.id === getId) {
        return { ...CheckBox, isChecked: CheckBox.isChecked === true ? false : true };
      } else {
        return CheckBox;
      }
    });

    setCheckBox(updateTask)
  }
  const addNextItem = () => {
    if (text.trim() === "" || text === null) {
      return false;
    }
    const newTask = { id: small_id, title: text, isChecked: false }
    setCheckBox((item) => [...item, newTask]);
    settext("")
  }
  const handleDelete = (getId) => {
    const existingItem = CheckBox.filter((item) => item.id !== getId);
    setCheckBox(existingItem);
  }
  const handleFocus = (getId) => {
    setfocusID(getId)
    setInputfocus(false)
  }
  const handleInputFocus = () => {
    setfocusID(null);
    setInputfocus(true);
  }
  const handleTapEnter = (even) => {
    if (even.key === "Enter") {
      addNextItem()
    }
  }

  return (
    <div className='todo_checkbox_wrapper p-1'>
      {
        CheckBox.map((item, i) => <div
          key={i}  className={`mt-1 item flex justify-between items-center gap-2  px-3 rounded-sm ${item.id === focusID ? "border border-slate-300" : "border border-transparent"}`}>
          <div className="left_side flex gap-2 items-center">
            <div className="checkbox mt-1">
              <input className='w-3 h-3 cursor-pointer' type="checkbox" checked={item.isChecked} onChange={() => handleCheckBox(item.id)} />
            </div>
            <div className="title">
              <input
                onFocus={() => handleFocus(item.id)}
                value={item.title}
                onChange={(e) => handleTextChange(item.id, e.target.value)}
                type="text" className={`checkbox_title outline-none font-main ${background&&"bg-transparent text-white"}`} />
            </div>
          </div>
          <div className="deleteIcon" onClick={() => handleDelete(item.id)}>
            <IoIosClose className={`text-2xl ${background&&" text-white"}`} />
          </div>
        </div>)
      }
     {!hideAddInput && <div className={`inputBx item flex my-2 items-center gap-2 rounded-sm ${Inputfocus ? "border border-slate-300" : "border border-transparent"} `}>
        <div className='item flex items-center gap-2 px-2'>
          <div className="plus cursor-pointer" onClick={addNextItem}>
            <AiOutlinePlus />
          </div>
          <div className="title">
            <input
              onFocus={handleInputFocus}
              type="text"
              value={text}
              ref={itemAddRef}
              onKeyDown={handleTapEnter}
              onChange={(e) => settext(e.target.value)} className='checkbox_title font-main outline-none'
            />
          </div>
        </div>
      </div>}
    </div>
  )
}
