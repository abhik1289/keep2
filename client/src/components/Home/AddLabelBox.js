import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
export default function AddLabelBox({ selectedIDs, setSelectedIDs }) {
    const getLabels = useSelector((state) => state.user.lables
    );
    const [labelList, setLabelList] = useState(getLabels);



    const handleCheckBoId = (id) => {
        const existingId = selectedIDs.find(item => item === id);
        if (existingId) {
            const removeId = selectedIDs.filter(item => item !== id);
            setSelectedIDs(removeId);
        } else {
            setSelectedIDs([...selectedIDs, id ]);
        }
    }
    const handleSearchText = (event) => {
        const query = event.target.value;
        if (query.length > 0) {
            var updatedList = [...labelList];
            updatedList = updatedList.filter((item) => {
                return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
            setLabelList(updatedList);
        } else {
            setLabelList(getLabels)
        }
    }
    return (
        <div className='absolute z-40 bg-white w-[200px] border border-slate-200 rounded-md p-2'>
            <div className="header-part">
                <div className="title">
                    Label note
                </div>
                <div className="searchBoxArea relative">
                    <input
                        onChange={handleSearchText}
                        placeholder='Enter label name'
                        className='w-full outline-none  font-thin'
                        type="text" />
                    <div className="searchIcon absolute right-2 top-[50%] translate-y-[-50%]">
                        <AiOutlineSearch className='text-slate-500' />
                    </div>
                </div>
                <div className="labelList mt-1 h-[70px] overflow-y-scroll">

                    {
                        labelList.map((item, index) => <div
                            key={index}
                            className='labelItem flex items-center'>
                            <div className="checkBox mr-2">
                                <input type="checkbox" onChange={() => handleCheckBoId(item._id, item.title)} />
                            </div>
                            <div className="title">
                                {item.title}
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
