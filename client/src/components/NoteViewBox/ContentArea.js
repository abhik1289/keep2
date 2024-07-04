import React, { useRef, useState } from 'react'
import { motion } from "framer-motion"
import { BsPin, BsPinFill, BsPlus } from 'react-icons/bs';
import BottomBox from './BottomBox';
import { FaTrash } from 'react-icons/fa';
import { BiPencil } from 'react-icons/bi';
import TodoItem from './TodoItem';
import Moment from 'react-moment';
import CollapseMenu from './CollapseMenu';
import { useDispatch, useSelector } from 'react-redux';
import { pinNote, updateImage, updateText, updateTitle } from '../../redux/features/NoteSlice';
import { toast } from 'react-hot-toast';
import PulseLoader from "react-spinners/PulseLoader";
import { v4 as uuid } from 'uuid';
export default function ContentArea({ todo, title, setTitle, text, setText, pin, showBottomBar, onPress, color, editMode, image, setPin, setColor, updatedAt, setImage, postImage, setPostImage, setTodo, item, id, noteCurrentId, index, drawing }) {
    const dispatch = useDispatch();
    const fileUploadBtn = useRef();
    const [height, setHeight] = useState('40px');
    const [showText, setShowText] = useState(false);
    const [focus, setFocus] = useState(false);
    const [todoItemText, setTodoItemText] = useState("");
    const noteState = useSelector(state => state.note);
    const handleFileUploadChange = (even, id) => {
        if (id) {
            const file = even.target.files[0];
            if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
                setPostImage(URL.createObjectURL(file));
            } else {
                toast.error(`Uploading ${file.type} not supported`);
            }
            const data = {
                id: id,
                image: file
            };
            dispatch(updateImage(data));
        }
    }
    const handleTextChange = (e, id) => {
        setText(e.target.value);
        setHeight(`${e.target.scrollHeight}px`);
        if (id) {
            const data = { id: id, text: e.target.value };
            console.log(data);
            dispatch(updateText(data));
        }
    }
    const handleImageDelete = () => setPostImage(null);
    const handleTitle = async (e, id) => {
        setTitle(e.target.value);
        if (id) {
            const data = { id: id, title: e.target.value };
            console.log(data);
            dispatch(updateTitle(data));
        }
    }
    const handlePin = (id) => {
        setPin(!pin);
        const data = { id: id }
        dispatch(pinNote(data));
    }
    const handleImageUpdate = () => {
        fileUploadBtn.current.click();
    }
    const showAddTextButton = () => setShowText(true);
    const handleInputFocus = () => {
        setFocus(true);
    }
    const handleInputBlur = () => {
        setFocus(false);
    }
    const handleKey = (e) => {
        if (todoItemText !== null || todoItemText.length > 0) {
            if (e.key === "Enter") {
                const id = uuid();
                setTodo([...todo, {
                    title: todoItemText,
                    isChecked: false,
                    id: id,
                }]);
                setTodoItemText("");
            }
        }
    }

    return (<><motion.div onClick={onPress} className={`p-3 content_area relative w-full ${!editMode && 'h-[250px]'} max-h-[350px] overflow-hidden  group ${editMode && 'overflow-y-scroll'}`}>
        <motion.div
            className='font-main text-xl font-semibold title relative'
        > <input type="text" onChange={(e) => handleTitle(e, id)} value={!editMode ?
            title.length > 13 ? title.slice(0, 13) + ".." : title.slice(0, 13) : title} className="input_title_box bg-transparent py-1 px-1 outline-none w-full" />
            <div className="pin" >
                <div
                    onClick={() => handlePin(item?._id)}
                    className={`pin cursor-pointer absolute top-[50%] translate-y-[-50%] right-3 ${pin ? 'block' : 'hidden'} group-hover:block transition-all duration-200`}>
                    {pin ? <BsPinFill size={14} /> : <BsPin size={14} />}
                </div>
            </div>
        </motion.div>
        {
            postImage && <div className='display_image rounded-md overflow-hidden relative w-full h-[295px]'>
                <img src={postImage} alt={`${postImage}Img`} />
                {editMode && <div className="image_control_wrapper absolute bottom-[8px] right-[8px] flex gap-1">
                    <input type="file" name="file" hidden onChange={(e) => handleFileUploadChange(e, id)} ref={fileUploadBtn} />
                    <div
                        onClick={handleImageUpdate}
                        className="wrapper_button w-[35px] h-[35px] bg-slate-800 rounded-md cursor-pointer flex justify-center items-center">

                        {noteState.loading === true ? <PulseLoader size={10} color="#fed330" /> : <BiPencil className='text-slate-600' />}
                    </div>
                    <div
                        onClick={handleImageDelete}
                        className="wrapper_button w-[35px] h-[35px] bg-slate-800 rounded-md cursor-pointer flex justify-center items-center">
                        <FaTrash className='text-slate-600' />
                    </div>
                </div>}
            </div>
        }
        {
            drawing && <div className='drawing_image_wrapper w-full h-[200px]'>
                <img src={drawing} alt='drawing_display' className='object-cover' />
            </div>
        }
        {
            editMode && !text && !todo && <div
                onClick={showAddTextButton}
                className='bg-slate-400 cursor-pointer w-[80px] h-[30px] rounded-md flex justify-center items-center text-[15px] font-main'>Add text</div>
        }
        {
            showText && <textarea
                onChange={(e) => handleTextChange(e, id)}
                value={text}
                className={`w-full outline-none placeholder:text-slate-700 resize-none p-2 bg-transparent text-slate-900 min-h-[200px]`}
                style={{ height }}
                placeholder='Take a note' ></textarea>
        }
        {(!postImage || editMode) && <div>{text && <div>{editMode ? <textarea
            onChange={(e) => handleTextChange(e, id)}
            value={text}
            className={`w-full outline-none placeholder:text-slate-700 resize-none p-2 bg-transparent text-slate-900 min-h-[200px]`}
            style={{ height }}
            placeholder='Take a note' ></textarea> : <motion.h2>{postImage ? text.slice(0, 60) : text.slice(0, 200)}</motion.h2>}</div>}
            {todo && <div className='todo_show_wrapper'>
                {todo.map((item, index) =>
                    <div key={index}>
                        {item.isChecked === false &&
                            <TodoItem
                                setTodo={setTodo}
                                todo={todo}
                                editMode={editMode}
                                title={item.title}
                                checked={item.isChecked}
                                key={index}
                                id={item.id}
                            />}
                    </div>
                )}
                {editMode && todo.length > 0 && <div className={`add_todo_item flex items-center ${focus && 'border-t border-b border-t-slate-300 border-b-slate-300'}`}>
                    <div className="icon">
                        <BsPlus className='text-xl text-slate-600' />
                    </div>
                    <div className="text">
                        <input
                            value={todoItemText}
                            onChange={(e) => setTodoItemText(e.target.value)}
                            onKeyUp={handleKey}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            type="text"
                            placeholder='Add new item' className='bg-transparent outline-none placeholder:text-slate-700 pl-2'
                        />
                    </div>
                </div>}
            </div>}
        </div>}
        <CollapseMenu
            setTodo={setTodo}
            todo={todo}
            editMode={editMode}
        />
        <motion.div className='flex mt-2 flex-wrap gap-1'>
        </motion.div>
        {editMode && <div className="other_information flex justify-end font-main text-[14px]">
            Edited: <Moment fromNow>{updatedAt}</Moment>
        </div>}
    </motion.div>
        <BottomBox
            setImage={setImage}
            editMode={editMode}
            image={image}
            noteView={showBottomBar}
            color={color}
            setColor={setColor}
            setPin={setPin}
            pin={pin}
            itemId={item?._id}
            item={item}
            index={index}
        />
    </>)
}
