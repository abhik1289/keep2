/* eslint-disable array-callback-return */
import React from 'react'
import MainContentBox from './MainContentBox';



export default function PinNoteArea({ notes, setShowPinContainer }) {
console.log(notes);
    // const refreshTigger = useSelector((state)=>state.note.notes);

    // useEffect(() => {
    //     notes.find((item) => {
    //         if (item.pin === true) {
    //             console.log(true);
    //         } else {
    //             console.log(false);
    //         }
    //     })
    // }, [refreshTigger])


    return (
        <div className={''}>
            <div className="heading title font-secondary text-slate-500 text-[14px] pl-5">
                PINNED
            </div>
            <div className={`flex flex-wrap `}>
                {notes.map((item, index) => <MainContentBox
                    key={index} item={item} />)}
            </div>

        </div>
    )
}
