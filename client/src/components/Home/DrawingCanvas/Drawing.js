
function Drawing({ fullBackground, setIsDrawing, setLastX, setLastY, isDrawing, context, lastX, lastY, canvasRef, canvasHistory, setCanvasHistory, pencilColor }) {



  function startDrawing(event) {
    setIsDrawing(true);
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  }

  function continueDrawing(event) {
    if (!isDrawing) return;
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
    context.strokeStyle = pencilColor;
    setLastX(x);
    setLastY(y);
  }

  function stopDrawing() {
    setIsDrawing(false);
  }



  // const handleUndo = () => {
  //   if (canvasHistory.length > 0) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");
  //     context.putImageData(canvasHistory.pop(), 0, 0);
  //     setCanvasHistory([...canvasHistory]);
  //   }
  // };
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
 

 
  return (
    <div className='w-full h-full custom-cursor'
      onContextMenu={handleContextMenu}
    >

      <canvas
        ref={canvasRef}
        width={fullBackground ? 1300 : 800}
        height={fullBackground ? 900 : 900}
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={continueDrawing}
        onTouchEnd={stopDrawing}
      />


    </div>
  );
}

export default Drawing;