import { useEffect, useRef } from "react";
import backgroundImgSrc from "../../assets/black-screen.jpg";
import Wallpaper from "./Wallpaper";

const QuestCanvas = () => {
    // Canvas reference
    const canvasRef = useRef(null);

    // Function to resize canvas to full window size
    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    // Resize canvas and redraw background on load and window resize
    useEffect(() => {
        resizeCanvas(); // Initial resize

        // Function to handle window resize
        const handleResize = () => {
            resizeCanvas(); // Resize canvas
            if (canvasRef.current) {
                const context = canvasRef.current.getContext("2d");
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        };

        // Attach and clean up resize listener
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} style={{ border: "1px solid #000" }} />
            <Wallpaper canvasRef={canvasRef} backgroundSrc={backgroundImgSrc} />
        </div>
    );
};

export default QuestCanvas;