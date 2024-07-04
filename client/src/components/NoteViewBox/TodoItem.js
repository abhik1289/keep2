import React, { useState } from 'react'

export default function TodoItem({ checked, title, editMode, id, todo, setTodo, isLineTrough }) {

    const [textTitle, setTextTitle] = useState(title);
    const [checkedBox, setCheckedBox] = useState(checked);


    const handleCheckBox = () => {
        setCheckedBox(!checkedBox);
        const updatedTodo = [...todo];
        // Find the index of the todo with the given id
        const todoIndex = updatedTodo.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            // Update the desired properties of the todo
            updatedTodo[todoIndex] = {
                ...updatedTodo[todoIndex],
                isChecked: updatedTodo[todoIndex].isChecked === true ? false : true
            };

            // Update the state with the updated array
            setTodo(updatedTodo);
            console.log(todo);
        }
    }
    const handleChange = (e, id) => {
        setTextTitle(e.target.value);
        const updatedTodo = [...todo];
        // Find the index of the todo with the given id
        const todoIndex = updatedTodo.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            // Update the desired properties of the todo
            updatedTodo[todoIndex] = {
                ...updatedTodo[todoIndex],
                title: textTitle
            };

            // Update the state with the updated array
            setTodo(updatedTodo);
            console.log(todo);
        }
    }
    let textLineThrough = {
        textDecoration: isLineTrough ? 'line-through' : '',
        color: isLineTrough ? '#7f8c8d' : '',

    }
    return (
        <div>
            <div className={`wrapper flex items-center gap-2 font-secondary`}>
                <div className="checkBox">
                    <input
                        readOnly={!editMode}
                        type="checkbox"
                        className='accent-[#7f8c8d]'
                        onChange={handleCheckBox}
                        checked={checkedBox}
                    />
                </div>
                <div className={`title`} style={textLineThrough}>
                    <input
                        readOnly={!editMode}
                        type="text" className={`outline-none bg-transparent ${isLineTrough && 'line-through select-none'}`}
                        value={textTitle}
                        onChange={(e) => handleChange(e, id)}
                    />
                </div>
            </div>
        </div>
    )
}
