// import Cookies from "js-cookie";
// import NoteView from "../NoteView";
import AddNote from "./AddNote";
// import { useEffect, useState } from 'react';
import {  useSelector } from "react-redux";
// import { addTrashNote, createNote } from "../../redux/features/NoteSlice";
// import { DUMMY_NOTE } from "../NoteViewBox/DUMMY_NOTE";
// import MainNoteWrapper from "../NoteViewBox/MainNoteWrapper";
import NoteViewBox from "../NoteViewBox/NoteViewBox";
// import PinNoteArea from "../NoteViewBox/PinNoteArea";

function HomeContent({ listView, setListView }) {
  const searchText = useSelector((state) => state.search.text);
  const isListView = useSelector((state) => state.note.isListView);


  // const getSearchNotes = async () => {
  //   try {
  //     const res = await fetch(`/serach/${searchText}`, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       method: "get",
  //     });
  //     const data = await res.json();
  //     const notesData = data.getNotes;
  //     console.log(notesData, res.status);
  //     if (res.status === 200) {
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const getTrashNotes = async () => {
  //   try {
  //     const res = await fetch("/trashNote", {
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       method: "GET",
  //     });
  //     const data = await res.json();
  //     const notesData = data.notes;
  //     if (res.status === 200) {
  //       notesData.map((note) => {
  //         const { _id, title, text, userID, color, background, pin, archive, trash, createdAt, updatedAt } = note;
  //         let image = note.image ? note.image : null;
  //         return dispatch(addTrashNote({ _id, title, image, text, userID, color, background, pin, archive, trash, createdAt, updatedAt }))
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (<div className="home_wrapper  w-screen">
    <AddNote />
    <NoteViewBox isListView={isListView}/>
  </div>);
}

export default HomeContent;