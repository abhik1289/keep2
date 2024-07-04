import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { BsCheck } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import useClickOutside from '../../helpers/useClickOutside';
import ContentArea from './ContentArea';
import { backgroundNote, colorNote, updateTodo } from '../../redux/features/NoteSlice';

export default function MainContentBox({ item, index, row }) {
    console.log("The row is", row);
    const noteViewRef = useRef();
    const id = item._id;
    const listView = useSelector((state) => state.note.isListView);
    const [showNote, setShowNote] = useState(false);
    const [noteCurrentId, setNoteCurrentId] = useState(null);
    const [title, setTitle] = useState(item?.title);
    const [text, setText] = useState(item?.text);
    const [color, setColor] = useState(item?.color);
    const [image, setImage] = useState(item?.background);
    const [pin, setPin] = useState(item?.pin);
    const [todo, setTodo] = useState(item?.todo);
    const [updatedAt, setUpdatedAt] = useState(item?.updatedAt);
    const [postImage, setPostImage] = useState(item?.image);
    const [drawing, setDrawing] = useState(item?.drawing);

    const dispatch = useDispatch();
    useEffect(() => {
        const data = { id: id, color: color?.color };
        if (color?.color) {
            dispatch(colorNote(data));
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color?.color]);


    useEffect(() => {
        const data = { id: id, background: image?.image ? image.image : null };
        // if (data) {
        dispatch(backgroundNote(data));
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image?.image]);
    useClickOutside(noteViewRef, () => {
        setShowNote(false);
        setNoteCurrentId(null);
    });

    const handleNoteClick = (id) => {
        setNoteCurrentId(id);
        setShowNote(true);
    }
    useEffect(() => {
        if (todo) {
            const data = { todo: todo, id: id };
            dispatch(updateTodo(data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todo]);
    const style = {
        backgroundImage: image?.image ? `url(${process.env.REACT_APP_CLIENT_URL
            + image.image})` : `url(${process.env.REACT_APP_CLIENT_URL
            + image})`,
        backgroundSize: "cover",
        borderWidth: "1px",
        borderColor: color?.color ? color.color : color ? color : "red",
    };

    return (
        <>
            {/* note preview code start */}
            {
                showNote && <div className='overlay w-screen h-screen fixed z-50 bg-blur-background top-0 left-0 flex justify-center items-center'>
                    {/* <img src={img} alt="" /> */}
                    <motion.div
                        style={style}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                        ref={noteViewRef}
                        className="main_note_view_box w-[500px] max-h-[500px] bg-white rounded-md relative">
                        <ContentArea
                            postImage={postImage}
                            setPostImage={setPostImage}
                            editMode={true}
                            title={title}
                            setTitle={setTitle}
                            text={text}
                            setColor={setColor}
                            color={color}
                            setText={setText}
                            image={image}
                            setImage={setImage}
                            pin={pin}
                            setPin={setPin}
                            showBottomBar={true}
                            todo={todo}
                            setTodo={setTodo}
                            updatedAt={updatedAt}
                            setUpdatedAt={setUpdatedAt}
                            item={item}
                            id={id}
                            drawing={drawing}

                            index={index}
                        />
                    </motion.div>
                </div>
            }
            {/* note preview code start */}

            <div className={`${item.id === noteCurrentId && "invisible"} my-1 group relative ${!listView ? 'lg:w-3/12 px-1 md:w-6/12 sm:w-full w-full' : "w-full"}`}>
                <div className={`checkIcon w-[20px] absolute h-[20px] bg-slate-800 rounded-full flex justify-center items-center left-[-1px] top-[-6px] ${item.pin ? "visible" : "invisible"} ${item.id === noteCurrentId && "invisible"} group-hover:visible`}>
                    <BsCheck className='text-white' />
                </div>
                <motion.div
                    className='w-full min-h-[150px] max-h-[350px] rounded-lg cursor-pointer'
                    style={style}

                >
                    <ContentArea
                        noteCurrentId={noteCurrentId}
                        postImage={postImage}
                        setPostImage={setPostImage}
                        editMode={false}
                        title={title}
                        setTitle={setTitle}
                        text={text}
                        setColor={setColor}
                        color={color}
                        setText={setText}
                        image={image}
                        setImage={setImage}
                        pin={pin}
                        setPin={setPin}
                        showBottomBar={true}
                        todo={todo}
                        setTodo={setTodo}
                        updatedAt={updatedAt}
                        setUpdatedAt={setUpdatedAt}
                        onPress={() => handleNoteClick(item.id)}
                        item={item}
                        id={id}
                        index={index}
                        drawing={drawing}
                    />
                </motion.div>
            </div >
        </>
    )
}
