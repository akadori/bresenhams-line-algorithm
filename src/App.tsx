import React, { useState, useRef, MouseEvent, useEffect } from 'react'

function App() {
  const [windowSplitSize, setWindowSplitSize] = useState({ width: window.innerWidth / 2, height: window.innerHeight })
  type Point = {
    x: number,
    y: number
  }
  const [points, setPoints] = useState<Array<Point>>([])
  // window.addEventListener('resize', () => setWindowSplitSize({width: window.innerWidth / 2, height: window.innerHeight })) めっちゃ重い。debounceとかするんだっけ? useLayoutEffect?
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)

  const handleOnclick = (e: MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = e;
    if (points.length === 0) {
      setPoints([{ x: clientX, y: clientY }]);
    } else if (points.length === 1) {
      setPoints(prev => [prev[0], { x: clientX, y: clientY }])
    } else {
      setPoints(prev => [...prev.slice(1), { x: clientX, y: clientY }]);
    }
  }

  useEffect(() => {
    draw(canvasRef.current!)
    draw(canvasRef2.current!)
  }, [points])

  const draw = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d")!;
    context.clearRect(0, 0, windowSplitSize.width, windowSplitSize.height);
    points.forEach((point) => {
      if (point) {
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        context.fill();
      }
    });
    if (points.length === 2) {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      context.lineTo(points[1].x, points[1].y);
      context.stroke();
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <canvas ref={canvasRef} width={windowSplitSize.width} height={windowSplitSize.height} style={{ border: "1px black solid" }} onClick={handleOnclick}></canvas>
      <canvas ref={canvasRef2} width={windowSplitSize.width} height={windowSplitSize.height} style={{ border: "1px black solid" }} onClick={handleOnclick}></canvas>
    </div>
  )
}

export default App
