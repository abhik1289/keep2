import React, { useEffect, useState, useLayoutEffect } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import { useParams } from 'react-router-dom'
import MainContentBox from '../NoteViewBox/MainContentBox';
import { useSelector } from 'react-redux';
// import NoteView from './../NoteView/index';

export default function ViewArea() {
    const { id } = useParams();
    const isListView = useSelector((state) => state.note.isListView);
    useLayoutEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const [note, setNote] = useState([]);
    const getData = async () => {
        try {
            const res = await fetch(`/labelNote/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "get",
            });
            const data = await res.json();
            if (res.status === 200) {
                setNote(data.getNote);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>
            <Header />
            <div className="main_wrapper flex">
                <SideBar />
                <div className={`${isListView && "md:w-6/12 w-full mx-auto"} px-2`}>
                    {
                        note.map((item, index) => <MainContentBox item={item} key={index} />)
                    }
                </div>
            </div>
        </section>)
}
