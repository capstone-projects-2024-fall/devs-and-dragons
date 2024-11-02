import { useEffect, useState, useRef } from "react";
import "./black-screen.jpg";


const QuestCanvas = () => {

  const canvasRef = useRef(null);
  const {background, setBackground} = useState(new Image());

  useEffect( () => {

    const backgroundImg = new Image();
    backgroundImg.src = "black-screen.jpg"; // Load image, background of quest, example black screen

    // Ensure background is loaded
    backgroundImg.onload = () => {
      setBackground(backgroundImg);
    };
    

    // Render background
    const render = () => {

      // Previous canvas's context should be cleared and new canvas should be loaded in each time
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Reset canvas upon loading to clear previously loaded background
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Load quest background wallpaper only when available
      // Draw background image only when it's loaded
      if (background.src) {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

      requestAnimationFrame(render);

    };
    
    render();

    // Exiting quest game canvas, end game button should perform this function eventually
    return () => cancelAnimationFrame(render);
  
  }, [background] );

  

  return (
    <div>
      QuestCanvas
      <canvas
        ref = {canvasRef}
        width={800}
        height={400}
        style={{ border: '1 px solid #000' }}
      />
    </div>
  )
}

export default QuestCanvas;