import React from 'react'
import useClickOutside from '../../helpers/useClickOutside';
import OptionItem from './OptionItem';
import { useMediaQuery } from 'react-responsive'

export default function ShowMore({ boxRef, setVisibleShowMore, setVisableCheckBox, visableCheckBox, selectedIDs, setSelectedIDs, setShowDrawingPad, setCheckBox, index }) {
    const isBigScreen = useMediaQuery({ maxWidth: 1040 });
    let realIndex = index + 1;
    const handleShowCheckBox = () => {
        setVisableCheckBox((state) => !state);
        setCheckBox((state) => {
            if (state) {
                setCheckBox([]);
            }
        })
        setVisibleShowMore(0);
    }
    const handleShowLabel = () => {
        setVisibleShowMore(2);
    }
    const handleDrawingPad = () => {
        setShowDrawingPad(true);
    }
    const items = [
        {
            id: 1,
            title: "Add label",
            onTap: handleShowLabel,
        },
        {
            id: 2,
            title: "Add drawing",
            onTap: handleDrawingPad
        },
        {
            id: 3,
            title: `${!visableCheckBox ? "Show" : "Hide"} checkbox`,
            onTap: handleShowCheckBox,
        },
    ];

    useClickOutside(boxRef, () => setVisibleShowMore(0))
    return (
        <div
            ref={boxRef}
            style={{
                boxShadow: "#00000057 0px 1px 20px 0px"
            }}
            className={`absolute this z-40 left-[-90px] bg-white w-[150px] border border-slate-200 rounded-md ${!isBigScreen && realIndex%4}`} >
            {
                items.map((item, index) => <OptionItem
                    title={item.title}
                    key={index}
                    onPress={item.onTap}
                    selectedIDs={selectedIDs}
                    setSelectedIDs={setSelectedIDs}
                />)
            }
        </div >
    )
}
