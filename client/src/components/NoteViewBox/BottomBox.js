import React, { useState, useRef } from 'react'
import RoundButton from '../UI/HeaderButton/RoundButton';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { IoMdColorPalette } from 'react-icons/io';
import { BsPinFill } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { BsPin } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import ShowMore from '../Home/ShowMore';
import AddLabelBox from '../Home/AddLabelBox';
import { motion } from 'framer-motion';
import ColorPlateBox from '../Home/ColorPlateBox';
import useClickOutside from '../../helpers/useClickOutside';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { deleteNote, archiveNote, deleteNoteForever } from '../../redux/features/NoteSlice';
import { useLocation } from 'react-router-dom';

export default function BottomBox({ noteView, color, setImage, editMode, setColor, image, setPin, pin, item, itemId,index }) {
    const showColorPlate = useRef(null);
    const showMoreContainer = useRef(null);
    const location = useLocation();
    const isTrash = location.pathname === "/trash";
    const isArchive = location.pathname === "/archive";

    const [visibleShowMore, setVisibleShowMore] = useState(0);
    const [visableCheckBox, setVisableCheckBox] = useState(false);
    const [checkBox, setCheckBox] = useState([]);
    const [selectedIDs, setSelectedIDs] = useState([]);
    const [showDrawingPad, setShowDrawingPad] = useState(false);
    const [visibleColorPlate, setVisibleColorPlate] = useState(false);
    useClickOutside(showColorPlate, () => setVisibleColorPlate(false));
    useClickOutside(showMoreContainer, () => setVisibleShowMore(0));
    const colorIcon = "text-slate-600";
    const dispatch = useDispatch();
    const handlePin = (id) => {
        // dispatch(upgradeNote({ _id: id, pin: true }));
    }
    const handleArchive = async (id) => {
        const data = { id, toast };
        dispatch(archiveNote(data))
    }

    const handleDelete = (id) => {
        const data = { id, toast };
        dispatch(deleteNote(data))
    }
    const handleTrashToggle = (id) => {
        let undoTrash = true;
        const data = { id, toast, undoTrash };
        dispatch(deleteNote(data))
    }
    const handleDeleteForever = (id) => {
        const data = { id, toast };
        dispatch(deleteNoteForever(data))
    }
 
    return (
        <motion.div style={editMode ? { background: color?.color || color } : ""} className={`bottom_box ${!noteView && "bg-transparent"} relative z-10 flex justify-between px-4 py-1 rounded rounded-b-lg ${editMode ? "visible" : "invisible"} group-hover:visible transition-all duration-100`}>

            {
                isTrash ? <div className='flex justify-end w-full'>
                    <RoundButton
                        onPress={() => handleTrashToggle(itemId)}
                        small
                        icon={<AiFillDelete
                            className={colorIcon}
                        />}
                        toolTip="UnTrash"
                    />

                    <RoundButton
                        onPress={() => handleDeleteForever(itemId)}
                        small
                        toolTip="Delete"
                        icon={<RiDeleteBin2Fill
                            className={colorIcon}
                        />}
                    />

                </div> : <>
                    <RoundButton
                        reference={showColorPlate}
                        onPress={() => setVisibleColorPlate(!visibleColorPlate)}
                        small
                        icon={<IoMdColorPalette
                            className={colorIcon}
                        />}
                        bottomWrapper={visibleColorPlate && <ColorPlateBox
                            image={image}
                            givenColor={color}
                            setColor={setColor}
                            color={color}
                            setImage={setImage}
                            id={itemId}
                        />}
                    />
                    <RoundButton
                        onPress={() => handleDelete(itemId)}
                        small
                        icon={<AiFillDelete
                            className={colorIcon}
                        />}
                    />

                    <RoundButton
                        onPress={() => handlePin(item?._id)}
                        small
                        icon={pin ? <BsPinFill size={14} /> : <BsPin size={14} />}
                    />
                    {isArchive ? <RoundButton
                        small
                        toolTip={"UnArchive"}
                        onPress={() => handleArchive(item?._id)}
                        icon={<BiArchiveOut
                            className={colorIcon}
                        />}
                    /> : <RoundButton
                        small
                        toolTip={"Archive"}
                        onPress={() => handleArchive(item?._id)}
                        icon={<BiArchiveIn
                            className={colorIcon}
                        />}
                    />}
                    <RoundButton
                        reference={showMoreContainer}
                        onPress={() => setVisibleShowMore((state) => state === 1 ? 0 : 1)}
                        bottomWrapper={visibleShowMore === 1 ? <ShowMore
                            setCheckBox={setCheckBox}
                            checkBox={checkBox}
                            index={index}
                            showDrawingPad={showDrawingPad}
                            setShowDrawingPad={setShowDrawingPad}
                            visableCheckBox={visableCheckBox}
                            setVisibleShowMore={setVisibleShowMore}
                            setVisableCheckBox={setVisableCheckBox} /> : visibleShowMore === 2 ? <AddLabelBox
                                selectedIDs={selectedIDs}
                                setSelectedIDs={setSelectedIDs}
                            /> : ""}
                        small
                        icon={<FiMoreVertical className={colorIcon} />}
                    />
                </>
            }

        </motion.div>
    )
}
