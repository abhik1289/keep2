import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { MdModeEditOutline } from 'react-icons/md';
import { updateLabel } from '../../redux/features/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function LabelItem({ text, onPressDelete, labelID }) {
    const [editMode, setEditMode] = useState(false);
    const [Text, setText] = useState(text);
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const labelLIst = data.user.lables;
    const userID = data.user.auth.id;
    const handleLabelUpdate = async () => {
        try {
            const res = await fetch(`/modifyLabels/${userID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: Text, Lid: labelID })
            })
            if (res.status === 200) {
                dispatch(updateLabel({
                    labelID: labelID,
                    title: Text
                }));
                Cookies.set("labels", JSON.stringify(labelLIst))
                setEditMode(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleLabelUpdate();
        }
    }
    return (
        <div className='flex w-full items-center justify-between border mt-1 px-2 bg-slate-300 py-1 rounded-sm'>
            <div className="left flex items-center gap-3">
                <div onClick={onPressDelete} className="delete hover:bg-white w-[25px] h-[25px] flex justify-center items-center rounded-full transition-all">
                    <FaTrash className='text-slate-500 cursor-pointer' />
                </div>
                {editMode ? <div>
                    <input
                        type="text"
                        className='outline-none px-2'
                        placeholder='Edit Label'
                        value={Text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div> : <div className="text font-main">
                    {text}
                </div>}
            </div>
            <div className="edit">
                {editMode ? <AiOutlineArrowRight
                    className='text-slate-500 cursor-pointer'
                    onClick={handleLabelUpdate}
                /> : <MdModeEditOutline onClick={() => setEditMode(true)} className='text-slate-500 cursor-pointer' />}
            </div>
        </div>
    )
}
