import { useEffect, useRef } from "react";
import backgroundImgSrc from "../../assets/black-screen.jpg"; // Cast the image as a variable to be used
import Wallpaper from "./Wallpaper";

const QuestCanvas = () => {
    // Canvas reference
    const canvasRef = useRef(null);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;

        // if canvas exists
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };



    useEffect(() => {
        resizeCanvas();

        // For any future resizing of window that will prompt image to be resized
        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener('resize', handleResize) // remove when game is exited

    }, []);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{ border: "1px solid #000" }}
            />
            <Wallpaper canvasRef={canvasRef} backgroundSrc={backgroundImgSrc} />
        </div>
    );

};

export default QuestCanvas;