import React, { useState, useEffect } from 'react'
import MainContentBox from './MainContentBox';
import PinNoteArea from './PinNoteArea';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, filteredNote, searchNotes } from '../../redux/features/NoteSlice';



export default function NoteViewBox() {
  let notes;
  const listView = useSelector((state) => state.note.isListView);
  const [showPinContainer, setShowPinContainer] = useState(false);
  const noteData = useSelector((state) => state.note.notes);
  const searchNote = useSelector((state) => state.note.searchNotes);

  notes = noteData;
  const searchText = useSelector((state) => state.search.text);
  const dispatch = useDispatch();
  // notes = noteData;
  const displayPinNotes = [];
  const getAllNotes = async () => {
    try {
      const res = await fetch("/getNotes", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
      });
      const data = await res.json();

      const notesData = data.getNotes;
      if (res.status === 200) {
        dispatch(createNote(notesData));
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getSearchNote = async () => {
    try {
      const res = await fetch(`/serach/${searchText}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
      });
      const data = await res.json();

      const searchData = data.getNotes;
      if (res.status === 200) {
        dispatch(searchNotes(searchData));
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    noteData.find((note) => {
      if (note.pin === true) {
        displayPinNotes.push(note);
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteData]);

  let updatedList;
  useEffect(() => {
    const query = searchText;
    if (query?.length > 0) {
      getSearchNote();
      // updatedList = [...noteData];
      // updatedList = updatedList.filter((item) => {
      //   return item.title.toLowerCase().includes(query.toLowerCase());
      // });

    } else {
      console.log(0);
    }
  }, [searchText])

  
    // console.log("Row is",i);
  return (
    <div className={`${listView && "md:w-6/12 w-full mx-auto"} px-2`}>
      {showPinContainer && <PinNoteArea setShowPinContainer={setShowPinContainer} notes={displayPinNotes} />}
      {showPinContainer && <div className="heading title pl-5 font-secondary text-slate-500 text-[14px]">
        OTHERS
      </div>}
      {
        <div
          className='flex flex-wrap pt-2 px-2'>
          {searchText?.length > 0 ? searchNote?.map((item, i) => <MainContentBox
            item={item}
            key={i}
            index={i}
          />) : notes?.map((item, index) => {
         
              return <MainContentBox
                item={item}
                key={index}
                index={index}
                // row={i}
              />    
          })}
        </div>
      }
    </div>
  )
}
