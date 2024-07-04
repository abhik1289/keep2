import React, { useEffect } from 'react'
import { getArchiveNotes } from '../../redux/features/NoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import MainContentBox from '../NoteViewBox/MainContentBox';
export default function ArchiveContent() {
  useEffect(() => {
    getNotes();
  }, []);
  const dispatch = useDispatch();
  const getNotes = async () => {
    try {
      const res = await fetch("/archiveNote", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
      });
      const data = await res.json();
      const notesData = data.notes;
      console.log(notesData);
      if (res.status === 200) {
       dispatch(getArchiveNotes(notesData)) 
      }
    } catch (error) {
      console.log(error)
    }
  }
  const notes = useSelector((state)=>state.note.archiveNotes)
  return (
    <div className='flex flex-wrap pt-2 px-2'>
      {notes.map((item,i) => <MainContentBox key={i} item={item}/>)}
    </div>
  )
}
