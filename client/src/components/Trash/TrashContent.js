import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import NoteView from '../NoteView';
import { addTrashNote } from '../../redux/features/NoteSlice';
import MainContentBox from './../NoteViewBox/MainContentBox';
export default function TrashContent() {
  useEffect(() => {
    getTrashNote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const dispatch = useDispatch();
  const isListView = useSelector((state) => state.note.isListView);

  const getTrashNote = async () => {
    try {
      const res = await fetch("/trashNote", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
      });
      const data = await res.json();
      const notesData = data.notes;
      if (res.status === 200) {
          dispatch(addTrashNote(notesData))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const trash = useSelector((state) => state.note.trashNote);
  
  return (
    <div className={`flex flex-wrap my-4 ${isListView && "md:w-6/12 w-full mx-auto"} px-2 w-full`}>
     {trash?.map((item, i) => <MainContentBox
          item={item}
          key={i}
        />)}
    </div>
  )
}
