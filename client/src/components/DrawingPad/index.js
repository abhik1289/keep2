import React, { useState, useRef, useEffect } from 'react';

export default function DrawingPad() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      context.strokeStyle = '#000000';
      context.lineWidth = 5;
      context.lineCap = 'round';
      
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mouseup', endDrawing);
      canvas.addEventListener('mousemove', draw);
      
      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mouseup', endDrawing);
        canvas.removeEventListener('mousemove', draw);
      };
    }, []);
    
    function startDrawing(event) {
      setIsDrawing(true);
      setPrevPos({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    }
    
    function endDrawing() {
      setIsDrawing(false);
    }
    
    function draw(event) {
      if (!isDrawing) {
        return;
      }
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const { x, y } = prevPos;
      const newX = event.nativeEvent.offsetX;
      const newY = event.nativeEvent.offsetY;
      
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(newX, newY);
      context.stroke();
      
      setPrevPos({ x: newX, y: newY });
    }
  return (
    <canvas ref={canvasRef} width={500} height={500} />
  )
}
