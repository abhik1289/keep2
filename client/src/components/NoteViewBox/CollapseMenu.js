import React, { useState } from 'react'
import TodoItem from './TodoItem'
import { BsChevronRight } from 'react-icons/bs';
export default function CollapseMenu({ todo, setTodo, editMode }) {

    const completedTasksCount = todo.filter(todo => todo.isChecked).length;
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            {completedTasksCount !== 0 && <div className="complete_wrapper_title font-main font-semibold flex items-center select-none">
                <div className="icon w-[25px] h-[25px] flex justify-start items-center cursor-pointer" onClick={()=>setIsOpen(!isOpen)}><BsChevronRight className={`${isOpen?'rotate-90':'rotate-0'} transition-all`} /></div> {completedTasksCount} Completed item
            </div>}
            {
            isOpen &&  todo.map((item, index) => <div className='item' key={index}>
                    {item.isChecked === true && <TodoItem
                        setTodo={setTodo}
                        todo={todo}
                        editMode={editMode}
                        title={item.title}
                        checked={item.isChecked}
                        key={index}
                        id={item.id}
                        isLineTrough={true}
                    />}
                </div>
                )
            }
        </div>
    )
}
