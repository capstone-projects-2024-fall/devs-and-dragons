import { useEffect, useState, useRef } from "react";
import backgroundImgSrc from "./black-screen.jpg"; // Cast the image as a variable to be used

const QuestCanvas = () => {
    
    // Canvas reference
    const canvasRef = useRef(null);

    // Background reference
    const [background, setBackground] = useState(new Image());

    useEffect(
      () => {
        const backgroundImg = new Image(); // Create a new Image object
        backgroundImg.src = backgroundImgSrc; // Load the image

        // Ensure background is loaded
        backgroundImg.onload = () => {
            setBackground(backgroundImg); // Set the loaded image as background
            resizeCanvas(); // function to dynamically resize wallpaper to changed window size
        };

        const render = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Clear the previous canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background image only when it's loaded
            if (background.src) {
                context.drawImage(background, 0, 0, canvas.width, canvas.height);
            }

            requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);

        return () => cancelAnimationFrame(render);
    }, [background]
  );

  // set variable respresenting full amount of screen real estate
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  return (
      <div>
          <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              style={{ border: '1px solid #000' }}
          />
      </div>
  );
};

export default QuestCanvas;
