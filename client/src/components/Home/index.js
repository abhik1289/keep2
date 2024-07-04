import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Header from '../Header';
import Body from '../Body';
import { useSelector } from 'react-redux';

export default function Home() {
  const location = useLocation();
  if (location.state?.accountActivated === true) {
    toast.success("Account activated now")
  } 
  const noteView = useSelector(state => state.note.isListView);
  const [listView, setListView] = useState(noteView);
  return (
    <div className=''>
      <Header listView={listView} setListView={setListView}/>
      <Body listView={listView} setListView={setListView}/>
     
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  )
}
