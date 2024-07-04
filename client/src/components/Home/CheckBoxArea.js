import React, { useRef, useState, useEffect } from 'react'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

export default function CheckBoxArea({ checkBox, setCheckBox, visableCheckBox }) {

    const checkListItem = useRef();
    const checkBoxTextInputRef = useRef();
    const [text, setText] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showInputBox, setShowInputBox] = useState(null);
    const [showInputBorder, setShowInputBorder] = useState(false);
    useEffect(() => {
        checkBoxTextInputRef.current.focus();
    }, [visableCheckBox])
    const handleAddCheckBox = (e) => {
        if (text !== "") {

            if (e.key === "Enter") {
                const id = uuid();
                setCheckBox([...checkBox, {
                    id, title: text, isChecked,
                }]);
                setText("");
            }
        }
    }
    const handleUpdateTitle = (id) => {
        setShowInputBox(id);
        setShowInputBorder(false);

    }
    const handleTextEdit = (id, text) => {
        const updateText = checkBox.map((item) => {
            if (item.id === id) {
                return { ...item, title: text }
            } else {
                return item;
            }
        });
        setCheckBox(updateText);
    }
    const handleCheckBoxEdit = (id, check) => {
        const updateText = checkBox.map((item) => {
            if (item.id === id) {
                return { ...item, isChecked: check }
            } else {
                return item;
            }
        });
        setCheckBox(updateText);
    }
    const deleteItem = (id) => {
        const existingItem = checkBox.filter((item) => item.id !== id);
        setCheckBox(existingItem);
    }
    const handleCheckBoxTitleFocus = () => {
        setSelectedItem("");
        setShowInputBox("");
        setShowInputBorder(true);
    }
    return (
        <div className='checkBox_wrapper'>
            <div className="checkBoxList">
                {
                    checkBox.map((item, i) => <div
                        onClick={handleUpdateTitle.bind(this, item.id)}
                        onMouseOver={() => setSelectedItem(item.id)}
                        ref={checkListItem}
                        className={`mainCheckBoxList bg-transparent px-6 flex justify-between items-center ${showInputBox === item.id ? "border-b border-t border-b-slate-300 border-t-slate-300" : "border-transparent"}`} key={i}>
                        <div className="left flex gap-2">
                            <div className="checkBOx">
                                <input type="checkbox"
                                
                                    onChange={() => handleCheckBoxEdit(item.id, item.isChecked ? false : true)}
                                    checked={item.isChecked} 
                                    />
                            </div>
                            {showInputBox === item.id ? <div>
                                <input
                                    onChange={(e) => handleTextEdit(item.id, e.target.value)}
                                    className='bg-transparent outline-none'
                                    type="text" value={item.title} />
                            </div> : <div className="title w-full"  >
                                {item.title}
                            </div>}
                        </div>

                        {selectedItem === item.id && <div className="closeBtn cursor-pointer"
                            onClick={() => deleteItem(item.id)}
                        >
                            <AiOutlineClose />
                        </div>}
                    </div>)
                }
            </div>
            <div
                onMouseOver={() => setSelectedItem("")}
                className={`add_checkBox ${showInputBorder ? "border-t border-b border-t-slate-300 border-b-slate-300" : "border-white"}  px-4 flex items-center justify-between`}>
                <div className="left flex items-center">
                    <div className="addIcon w-[30px] h-[30px] flex justify-center cursor-pointer items-center">
                        {text.length > 0 ? <input

                            className='cursor-pointer'
                            type="checkbox" name="checkbox"
                            value={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        /> : <AiOutlinePlus />}
                    </div>
                    <div className="main_inputBx">
                        <input
                            ref={checkBoxTextInputRef}
                            value={text}
                            onFocus={handleCheckBoxTitleFocus}
                            onKeyDown={handleAddCheckBox}
                            onChange={(e) => setText(e.target.value)}
                            type="text" className='outline-none bg-transparent' />
                    </div>
                </div>
                {text.length > 0 && <div onClick={() => setText("")} className="closeBtn cursor-pointer pr-2">
                    <AiOutlineClose />
                </div>}
            </div>
        </div>
    )
}
