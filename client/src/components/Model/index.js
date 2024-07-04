import { useState, useRef } from 'react';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import { FiCornerDownLeft } from 'react-icons/fi';
import useClickOutside from './../../helpers/useClickOutside';
import LabelItem from './LabelItem';
import { addLable, deleteLable } from '../../redux/features/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';



function Model({ setVissable }) {
    const editModel = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state);
    const [focus, setfocus] = useState(false);
    const handleBlur = () => setfocus(false);
    const handleFocus = () => setfocus(true);
    useClickOutside(editModel, () => setVissable(false))
    const [labelText, setlabelsText] = useState("");
    const labelLIst = data.user.lables;
    const id = data.user.auth.id;
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 12);

    const handleSubmit = async () => {
        try {
            if (labelText.length === 0) return;
            const res = await fetch(`/addLabels/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: labelText, labelID: small_id })
            });
            const labels = await res.json();

            if (res.status === 200) {
                dispatch(addLable(labels))
                setlabelsText("");
                Cookies.set("labels", JSON.stringify(labelLIst));
            } else {
                toast.error("Couldn't add labels");
            }
        } catch (error) {
            console.log(error);
        }


    }
    const handleDelete = async (Lid) => {
        try {
            const res = await fetch(`/removeLabels/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ labelID: Lid })
            });
            const data = await res.json();
            console.log(res.status);
            if (res.status === 200) {
                dispatch(deleteLable(Lid));
                Cookies.set("labels", JSON.stringify(labelLIst));
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }
    return (<div

        className={`absolute top-0 left-0 bg-blur-background w-screen h-screen flex justify-center items-center z-[1500]`}>
        <div ref={editModel} className="main_wrapper w-[300px] min-h-[100px] bg-white rounded-md shadow-xl">
            <div className="upper_wrapper p-3 border-b border-slate-300">
                <div className="header font-main font-semibold">
                    Edit labels
                </div>
                <div className="form flex items-center px-3 mt-2 my-3" >
                    <div className="add_close_toogle w-[30px] h-[25px] flex justify-center items-center border border-white rounded-full hover:border-slate-500 mr-3">
                        {focus ? <IoIosClose
                            onClick={handleBlur}
                            className='text-xl text-slate-500 cursor-pointer' /> : <IoIosAdd
                            onClick={handleFocus}
                            className='text-xl text-slate-500 cursor-pointer' />}
                    </div>
                    <div className="input_box w-full relative">
                        <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={labelText}
                            onKeyDown={handleKeyDown}
                            onChange={
                                (e) => setlabelsText(e.target.value)
                            }
                            type="text"
                            placeholder='Create new label'
                            className='w-full outline-none
                    border border-white
                    focus:border-b focus:border-b-slate-300'
                        />
                        {<div className="add w-[30px] h-[30px] flex justify-center absolute items-center right-1 bottom-0"
                            onClick={handleSubmit}
                        >
                            <FiCornerDownLeft
                                className=' text-slate-500 cursor-pointer' />
                        </div>}
                    </div>

                </div>
                <div className="labels min-h-[60px] max-h-[200px] overflow-scroll">
                    {
                        labelLIst && labelLIst.map((item) => {
                            return <LabelItem
                                onPressDelete={() => handleDelete(item.labelID)}
                                key={item.labelID}
                                labelID={item.labelID}
                                text={item.title}
                            />
                        })
                    }
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="bottom_part flex justify-end p-3">
                <button className='px-2 mt-3 font-main font-semibold'
                    onClick={() => navigate("/")}
                >Done</button>
            </div>
        </div>
    </div>);
}
export default Model;