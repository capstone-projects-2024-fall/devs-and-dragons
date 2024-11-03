import { useEffect, useState, useRef } from "react";
import backgroundImgSrc from "../../assets/black-screen.jpg"; // Cast the image as a variable to be used
import { loadBackdropFunction } from "../../components/QuestViewHelpers/Functions/loadBackdropFunction";
import { drawBackgroundFunction } from "../../components/QuestViewHelpers/Functions/drawBackgroundFunction";
import { resizeCanvasFunction } from "../../components/QuestViewHelpers/Functions/resizeCanvasFunction";

const QuestView = () => {
  // Canvas reference
  const canvasRef = useRef(null);

  // Background reference
  const [background, setBackground] = useState(new Image());

  useEffect(() => {
    // Initialize background image and set state
    loadBackdropFunction(backgroundImgSrc, setBackground, resizeCanvasFunction, canvasRef)

    const render = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Clear the previous canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawBackgroundFunction(canvasRef, background);

      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => { resizeCanvasFunction(canvasRef, background); };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // remove when game is exited
      cancelAnimationFrame(render);
    };
  }, [background]);

  return (
    <div className="my-games-page">
      <canvas ref={canvasRef} style={{ border: "1px solid #000" }} />
    </div>
  );
};

export default QuestView;
