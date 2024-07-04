import React, { useState, useRef, useEffect } from 'react'

import PadHeader from './PadHeader'

import Drawing from './Drawing';
export default function DrawingCanvas({ setShowDrawingPad, setDrawing,visibleInput }) {
  const colors = [
    {
      id: 1,
      color: "#000000",
    },
    {
      id: 2,
      color: "#DF7857",
    },
    {
      id: 3,
      color: "#025464",
    },

    {
      id: 4,
      color: "#D21312",
    },
    {
      id: 5,
      color: "#41644A",
    },
    {
      id: 6,
      color: "#FC4F00",
    },
    {
      id: 7,
      color: "#BE5A83",
    },
    {
      id: 8,
      color: "#19A7CE",
    },
    {
      id: 9,
      color: "#025464",
    },
    {
      id: 10,
      color: "#0C134F",
    },
    {
      id: 11,
      color: "#643843",
    },
    {
      id: 12,
      color: "#E57C23",
    },
  ];
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 10;
    setContext(ctx);
  }, []);
  const [fullBackground, setFullBackground] = useState(false);
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [pencilColor, setPencilColor] = useState("black");
  const [currentActive, setCurrentActive] = useState("pencil");
  const [canvasHistory, setCanvasHistory] = useState([]);
  const handleErase = () => {
    setPencilColor("white");
    setCurrentActive('erase');
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = pencilColor;
  };
  function clearCanvas() {
    setCurrentActive("pencil");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  const saveButton = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    setDrawing(image);
    setShowDrawingPad(false);
    visibleInput(true);
    console.log(image);
  }
  return (
    <div

      className='main_wrapper w-screen overflow-hidden h-screen bg-blur-background fixed z-50 left-0 top-0 flex justify-center items-center'>
      <div className={`DrawingPad rounded-md w-full ${fullBackground ? "w-full h-full" : "md:w-[800px] md:h-[90vh] h-full"} bg-white relative overflow-hidden`}
        style={{
          boxShadow: "33px 57px 129px rgba(0, 0, 0, 0.11)"
        }}
      >
        <PadHeader

          setPencilColor={setPencilColor}
          colors={colors}
          clearCanvas={clearCanvas}
          pencilColor={pencilColor}
          currentActive={currentActive}
          onPressForSave={saveButton}

          setCurrentActive={setCurrentActive}
          setShowDrawingPad={setShowDrawingPad}
          fullBackground={fullBackground}
          setFullBackground={setFullBackground}
          handleErase={handleErase}
        />
        <Drawing
          setIsDrawing={setIsDrawing}
          canvasHistory={canvasHistory}
          setCanvasHistory={setCanvasHistory}
          canvasRef={canvasRef}
          pencilColor={pencilColor}
          setPencilColor={setPencilColor}
          lastY={lastY}
          context={context}
          setContext={setContext}
          setLastY={setLastY}
          lastX={lastX}
          setLastX={setLastX}
          isDrawing={isDrawing}
          fullBackground={fullBackground}
        />
      </div>
    </div>
  )
}
