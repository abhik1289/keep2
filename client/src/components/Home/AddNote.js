import React, { useRef, useState } from 'react'
import RoundButton from './../UI/HeaderButton/RoundButton';
import { IoMdCheckbox } from 'react-icons/io'
import { FaPaintBrush } from 'react-icons/fa'
import { BiImageAlt } from 'react-icons/bi'
import { BsPin, BsPinFill } from 'react-icons/bs'
import toast from 'react-hot-toast';
import useClickOutside from './../../helpers/useClickOutside';
import BottomContainer from './BottomContainer';
import { FaTrash } from 'react-icons/fa';
import CheckBoxArea from './CheckBoxArea';
import DrawingCanvas from './DrawingCanvas';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addNote } from '../../redux/features/NoteSlice';
export default function AddNote() {

  const iconColor = "text-slate-800";
  const textRef = useRef(null);
  const addNoteRef = useRef(null);
  const AddNoteTitle = useRef(null);
  const fileUploadBtn = useRef(null);
  const dispatch = useDispatch();

  const [visibleInput, setVisibleInput] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [height, setHeight] = useState('40px');
  const [previousValues, setPreviousValues] = useState([]);
  const [nextValues, setNextValues] = useState([]);
  const [color, setColor] = useState(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [visableCheckBox, setVisableCheckBox] = useState(false);
  const [checkBox, setCheckBox] = useState([]);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [visibleShowMore, setVisibleShowMore] = useState(0);
  const [pin, setPin] = useState(false);
  const [archive, setArchive] = useState(false);
  const [showDrawingPad, setShowDrawingPad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawing, setDrawing] = useState(null)


  const handleTextChange = (e) => {
    setText(e.target.value);
    setPreviousValues([...previousValues, text]);
    setHeight(`${e.target.scrollHeight}px`);
  }
  useClickOutside(addNoteRef, () => setVisibleInput(false));
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      textRef.current.focus()
    }
  }
  const handleTextKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      AddNoteTitle.current.focus();
    }
  }
  const handleImageDelete = () => {
    setFile(null);
    setImageUrl(null);
  }
  const handleFileUpload = (even) => {
    const file = even.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      toast.error(`Uploading ${file.type} not supported`);
    }
  }
  const onClosePress = async () => {
    try {
      if (file || drawing) {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("color", color?.color);
        formData.append("pin", pin);
        formData.append("archive", archive);
        formData.append("background", image?.image);
        selectedIDs.length > 0 && formData.append("labels", selectedIDs);
        drawing ? formData.append("drawing", drawing) : formData.append("image", file);
        axios.post("/addNote", formData).then((res) => {
          const note = res.data.message;

          if (res.status === 200) {
            setTitle(""); setText(); setColor(""); setPin(false); setArchive(false); setImage(null); setVisableCheckBox(false); setFile(null);
            setSelectedIDs([]); setVisibleInput(false);
            dispatch(addNote(note));

          }
          setLoading(false);
        }).catch((err) => {
          console.log(err);
        })
      } else if ((file && checkBox) || (drawing && checkBox)) {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("color", color?.color);
        formData.append("pin", pin);
        formData.append("archive", archive);
        formData.append("background", image?.image);
        selectedIDs.length > 0 && formData.append("labels", selectedIDs);
        drawing ? formData.append("drawing", drawing) : formData.append("image", file);
        axios.post("/addNote", formData).then((res) => {
          const note = res.data.message;
          if (res.status === 200) {
            setTitle(""); setCheckBox([]); setColor(""); setPin(false); setArchive(false); setImage(null); setVisableCheckBox(false); setFile(null);
            setSelectedIDs([]); setVisibleInput(false);
            dispatch(addNote(note));

          }
          setLoading(false);
        }).catch((err) => {
          console.log(err);
        })
      } else if (checkBox.length > 0) {
        setLoading(true);
        const res = await fetch("/addNote", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            title, todo: checkBox, color: color?.color, pin, archive, background: image?.image, labels: selectedIDs.length > 0 && selectedIDs, drawing
          })
        });
        const data = await res.json();
        const note = data.message;
        if (res.status === 200) {
          setTitle(""); setCheckBox([]); setColor(""); setPin(false); setArchive(false); setImage(null); setVisableCheckBox(false);
          setSelectedIDs([]); setVisibleInput(false);
          setLoading(false);
          dispatch(addNote(note))
        }
      } else {
        setLoading(true);
        const res = await fetch("/addNote", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            title, text, color: color?.color, pin, archive, background: image?.image, labels: selectedIDs.length > 0 && selectedIDs
          })
        });
        const data = await res.json();
        const note = data.message;
        if (res.status === 200) {
          setTitle(""); setText(""); setColor(""); setPin(false); setArchive(false); setImage(null); setVisableCheckBox(false);
          setSelectedIDs([]); setVisibleInput(false);
          setLoading(false);
          dispatch(addNote(note))

        }
      }
    } catch (error) {
      console.log(error);
    }
    setVisibleInput(false);
  }
  const handleDeleteImage = () => setDrawing(null);

  return (
    <>
      <div className='main_wrapper flex justify-center w-full py-6'>
        <input ref={fileUploadBtn} onChange={handleFileUpload} type="file" name="image" hidden />
        <div
          style={{
            backgroundColor: color?.color,
            backgroundImage: `url(${process.env.PUBLIC_URL + image?.image})`,
            backgroundSize: 'cover',
          }}
          ref={addNoteRef}
          className={`container w-[390px] md:w-[550px] rounded-md ${visibleInput ? "min-h-[200px]" : "h-[50px]"} shadow-lg border border-slate-300 flex ${!visibleInput && "items-center"} font-main font-medium cursor-text justify-between transition-all`}
          onClick={() => setVisibleInput(true)}
        >
          {!visibleInput && <><div className="text p-2">
            Take a note..
          </div>
            <div className="iconBox flex">
              <RoundButton
                onPress={() => setVisableCheckBox(true)}
                icon={<IoMdCheckbox className={iconColor} />}
              />
              <RoundButton
                icon={<FaPaintBrush className={iconColor} />}
              />
              <RoundButton
                onPress={() => fileUploadBtn.current.click()}
                icon={<BiImageAlt className={`text-xl ${iconColor}`} />}
              />
            </div></>}
          {
            visibleInput && <div className='content_wrapper  w-full flex justify-between flex-col'>
              <div className="wrapper">
                {file && <div className='image_wrapper relative'>
                  <img src={imageUrl} alt='note_image' />
                  <div
                    onClick={handleImageDelete}
                    className="deleteButton absolute bottom-2 right-2 w-[35px] h-[35px] rounded-md bg-slate-600 flex cursor-pointer justify-center items-center">
                    <FaTrash className='text-slate-900' />
                  </div>
                </div>}
                {drawing && <div style={{
                  background: `url(${drawing})`,
                  backgroundSize: "cover"
                }} className='image_wrapper relative w-[full] h-[300px]'>
                  <div
                    onClick={handleDeleteImage}
                    className="deleteButton absolute bottom-2 right-2 w-[35px] h-[35px] rounded-md bg-slate-600 flex cursor-pointer justify-center items-center">
                    <FaTrash className='text-slate-900' />
                  </div>
                </div>}
                <div className="input_taking_box">
                  <div className="titleBox relative p-2">
                    <input
                      type="text"
                      ref={AddNoteTitle}
                      className='w-full font-main outline-none p-1 bg-transparent text-slate-900 placeholder:text-slate-600 placeholder:font-normal placeholder:text-[16px] font-semibold text-xl'
                      placeholder='Title'
                      onKeyDown={handleInputKeyDown}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="pin_button  absolute right-3 top-0">
                      <RoundButton
                        onPress={() => setPin(!pin)}
                        small
                        icon={!pin ? <BsPin className={iconColor} /> : <BsPinFill className={iconColor} />}
                      />
                    </div>
                  </div>
                  <div className="text mt-2">
                    {visableCheckBox ? <CheckBoxArea
                      visableCheckBox={visableCheckBox}
                      checkBox={checkBox} setCheckBox={setCheckBox} /> : <textarea
                        value={text}
                        onChange={handleTextChange}
                        ref={textRef}
                        onKeyDown={handleTextKeyDown}
                        className={`w-full outline-none placeholder:text-slate-700 resize-none p-2 bg-transparent text-slate-900`}
                        style={{ height }}
                        placeholder='Take a note' ></textarea>}
                  </div>
                </div>
              </div>
              <BottomContainer
                addNoteRef={addNoteRef}
                setPreviousValues={setPreviousValues}
                previousValues={previousValues}
                setText={setText}
                nextValues={nextValues}
                setNextValues={setNextValues}
                text={text}
                setColor={setColor}
                setImage={setImage}
                color={color}
                setCheckBox={setCheckBox}
                setFile={setFile}
                setImageUrl={setImageUrl}
                fileUploadBtn={fileUploadBtn}
                setVisableCheckBox={setVisableCheckBox}
                visableCheckBox={visableCheckBox}
                selectedIDs={selectedIDs}
                setSelectedIDs={setSelectedIDs}
                visibleShowMore={visibleShowMore}
                setVisibleShowMore={setVisibleShowMore}
                archive={archive}
                setArchive={setArchive}
                showDrawingPad={showDrawingPad}
                setShowDrawingPad={setShowDrawingPad}
                onClosePress={onClosePress}
                loading={loading}
                setLoading={setLoading}
                setDrawing={setDrawing}
              />
            </div>
          }
        </div>
      </div>
      {showDrawingPad && <DrawingCanvas visibleInput={visibleInput} setDrawing={setDrawing} setShowDrawingPad={setShowDrawingPad} />}
    </>
  )
}
