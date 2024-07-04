import React, { useState, useRef } from 'react'
import RoundButton from '../UI/HeaderButton/RoundButton'
import { BsFileEarmarkImage } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { RiInboxArchiveLine } from 'react-icons/ri';
import { MdArchive } from 'react-icons/md';
import { IoMdColorPalette } from 'react-icons/io';
import { BiRedo, BiUndo } from 'react-icons/bi';
import ShowMore from './ShowMore';
import useClickOutside from '../../helpers/useClickOutside';
import ColorPlateBox from './ColorPlateBox';
import AddLabelBox from './AddLabelBox';
import PulseLoader from "react-spinners/PulseLoader";

export default function BottomContainer({ setPreviousValues, setText, previousValues, nextValues, setNextValues, text, addNoteRef, setColor, setImage, color, fileUploadBtn, setVisableCheckBox, visableCheckBox, selectedIDs, setSelectedIDs, setVisibleShowMore, visibleShowMore, archive, setArchive, showDrawingPad, setShowDrawingPad, onClosePress, setCheckBox, loading,setDrawing }) {
  const buttonColor = "text-slate-500";
  const showMoreContainer = useRef(null);
  const showColorPlate = useRef(null);



  useClickOutside(showMoreContainer, () => setVisibleShowMore(0));
  useClickOutside(showColorPlate, () => setVisibleColorPlate(false));

  const [visibleColorPlate, setVisibleColorPlate] = useState(false);
  const handleUndo = () => {
    if (previousValues.length > 0) {
      const previousValue = previousValues[previousValues.length - 1];
      setPreviousValues(previousValues.slice(0, -1));
      setNextValues([...nextValues, text]);
      setText(previousValue);
    }
  };
  const handleRedo = () => {
    if (nextValues.length > 0) {
      const nextValue = nextValues[nextValues.length - 1];
      setNextValues(nextValues.slice(0, -1));
      setText(nextValue);
    }
  };
  return (
    <div className='bottom_main_wrapper flex items-center justify-between relative px-2'
      style={{
        backgroundColor: color?.color
      }}
    >
      <div className="icon_buttons flex ">
        <RoundButton
          toolTip="Image"
          onPress={() => fileUploadBtn.current.click()}
          icon={<BsFileEarmarkImage className={buttonColor} />}
        />
        <RoundButton
          toolTip="Background"
          reference={showColorPlate}
          onPress={() => setVisibleColorPlate(!visibleColorPlate)}
          bottomWrapper={visibleColorPlate && <ColorPlateBox
            addNoteRef={addNoteRef}
            setColor={setColor}
            setImage={setImage}
          />}
          icon={<IoMdColorPalette className={buttonColor} />}
        />
        <RoundButton
          toolTip={archive ? "UnArchive" : "Archive"}
          onPress={() => setArchive(!archive)}
          icon={!archive ? <RiInboxArchiveLine className={buttonColor} /> : <MdArchive className={buttonColor} />}
        />
        <RoundButton
          toolTip="More"
          reference={showMoreContainer}
          onPress={() => setVisibleShowMore((state) => state === 1 ? 0 : 1)}
          bottomWrapper={visibleShowMore === 1 ? <ShowMore
            setDrawing={setDrawing}
            setCheckBox={setCheckBox}
            showDrawingPad={showDrawingPad}
            setShowDrawingPad={setShowDrawingPad}
            visableCheckBox={visableCheckBox}
            setVisibleShowMore={setVisibleShowMore}
            setVisableCheckBox={setVisableCheckBox} /> : visibleShowMore === 2 ? <AddLabelBox
              selectedIDs={selectedIDs}
              setSelectedIDs={setSelectedIDs}
            /> : ""}
          icon={<FiMoreVertical className={buttonColor} />}
        />
        <RoundButton
          toolTip="Undo"
          onPress={handleUndo}
          icon={<BiUndo
            className={buttonColor} />}
        />
        <RoundButton
          toolTip="Redo"
          onPress={handleRedo}
          icon={<BiRedo className={buttonColor} />}
        />
      </div>
      <div className="closeBtn cursor-pointer select-none" onClick={onClosePress}>
        {loading ? <PulseLoader size={10} color="#fed330" /> : "Close"}
      </div>
    </div>
  )
}
