import { useEffect, useState, useRef } from "react";
import backgroundImgSrc from "../../assets/black-screen.jpg"; // Cast the image as a variable to be used
import Wallpaper from "./Wallpaper";

const QuestCanvas = () => {
    // Canvas reference
    const canvasRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize) // remove when game is exited
        };

    }, []);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;

        // if canvas exists
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    useEffect(() => {
        resizeCanvas(); // Initial resize
    }, []);
    

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid #000' }}
            />
            <Wallpaper canvasRef={canvasRef} backgroundSrc={backgroundImgSrc} />
        </div>
    );

};

export default QuestCanvas;
