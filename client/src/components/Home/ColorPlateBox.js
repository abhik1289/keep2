/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MdOutlineHideImage, MdInvertColorsOff } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';


export default function ColorPlateBox({ addNoteRef, setColor, setImage, givenColor, image, id, color, background }) {

    const colors = [
        {
            color: "#F28B82",
            id: 1,
        },
        {
            color: "#FBBC04",
            id: 2,
        },
        {
            color: "#FFF475",
            id: 3,
        },
        {
            color: "#CCFF90",
            id: 4
        },
        {
            color: "#A7FFEB",
            id: 5
        },
        {
            color: "#CBF0F8",
            id: 6
        },
        {
            color: "#AECBFA",
            id: 7
        },
        {
            color: "#D7AEFB",
            id: 8
        },

        {
            color: "#E6C9A8",
            id: 9
        },


    ];
    const images = [
        {
            id: 1,
            image: "./images/bg1.svg",
        },
        {
            id: 2,
            image: "./images/bg2.svg",
        },
        {
            id: 3,
            image: "./images/bg3.svg",
        },
        {
            id: 4,
            image: "./images/bg4.svg",
        },
        {
            id: 5,
            image: "./images/bg5.svg",
        },
        {
            id: 6,
            image: "./images/bg6.svg",
        },
        {
            id: 7,
            image: "./images/bg7.svg",
        },
        {
            id: 8,
            image: "./images/bg8.svg",
        },
        {
            id: 9,
            image: "./images/bg9.svg",
        },
    ];

  
    const [colorSelect, setColorSelect] = useState(null);
    console.log("color select is",colorSelect);
    const [selectImage, setSelectImage] = useState(null);
    const handleColorChange = (colorIndex) => {
        setColorSelect(colorIndex);
        setColor(colors[colorIndex]);
    }
    const removeColor = () => {
        setColorSelect(null);
        setColor(null);
    }
    const removeBackground = () => {
        setImage(null);
        setSelectImage(null);
    }
    const handleBackgroundChange = (i) => {
        setSelectImage(i);
        setImage(images[i]);
    }
    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        colors.find((item) => {
            if (item.color === givenColor) {
                setColorSelect(item?.id - 1);
            }
        })
        // eslint-disable-next-line array-callback-return
        images.find((item) => {
            if (item.image === image) {
                setSelectImage(item?.id - 1);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    // useEffect(() => {
    //     console.log("The color is",color);
    //     const data = { id: id, color: "#fff" };
    //     dispatch(colorNote(data));
    // }, [id])
    // useEffect(() => {
    //     const data = { id: id, background: "#fff" };
    //     dispatch(backgroundNote(data));
    // }, [id])

    return (
        <div className='main_wrapper absolute bg-white w-[400px]  md:w-[440px] py-2 left-[-45px] md:left-[-112px] z-[800]'
            style={{
                boxShadow: "#00000057 0px 1px 20px 0px"
            }}>
            <div
                className="pb-1 color_wrapper px-2 border-b border-b-slate-300 flex gap-2">
                <div
                    onClick={removeColor}
                    className={`colorNo md:w-[35px] md:h-[35px] w-[30px] h-[30px] flex justify-center items-center cursor-pointer border relative rounded-full border-slate-500 ${colorSelect === null && "border-violet-600"}`}>
                    {colorSelect === null && <div
                        className='icon absolute top-0 right-[-5px] z-10 bg-violet-600 rounded-full'
                    >
                        <BsCheck className='text-white' /></div>}
                    <MdInvertColorsOff />
                </div>
                {
                    colors.map((item, i) => <div
                        key={i}
                        onClick={() => handleColorChange(i)}
                        className={`md:w-[35px] md:h-[35px] w-[30px] h-[30px] rounded-full cursor-pointer relative  border-2 ${colorSelect === i && "border-violet-600"}`} style={{
                            background: item.color
                        }}>
                        {colorSelect === i && <div
                            className='icon absolute right-[-5px] z-10 bg-violet-600 rounded-full'
                        >
                            <BsCheck className='text-white' /></div>}
                    </div>)
                }
            </div>
            <div className="image_wrapper px-2 mt-1 flex gap-2">

                <div className="ImageNull md:w-[35px] md:h-[35px] w-[30px] h-[30px] flex justify-center items-center cursor-pointer border rounded-full border-slate-500 relative" onClick={removeBackground}>
                    <MdOutlineHideImage />
                    {selectImage === null && <div
                        className='icon absolute top-0 right-[-5px] z-10 bg-violet-600 rounded-full'
                    >
                        <BsCheck className='text-white' /></div>}
                </div>
                <div className="image flex gap-2 rounded-full">
                    {images.map((item, i) => <div
                        onClick={() => handleBackgroundChange(i)}
                        key={i} className={`md:w-[35px] w-[30px] relative md:h-[35px] h-[30px] border-2 rounded-full ${selectImage === i && "border-violet-600"}`}
                    >
                        {selectImage === i && <div
                            className='icon absolute right-[-5px] z-10 bg-violet-600 rounded-full'
                        >
                            <BsCheck className='text-white' /></div>}
                        <img className='rounded-full cursor-pointer' src={process.env.REACT_APP_CLIENT_URL
                            + item.image} alt={`background_image${i}`} />
                    </div>)}
                </div>
            </div>
        </div>
    )
}
