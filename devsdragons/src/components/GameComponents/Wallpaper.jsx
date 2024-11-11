import { useEffect } from "react";

const Wallpaper = ({ canvasRef, backgroundSrc }) => {
    useEffect(() => {
        const backgroundImg = new Image();
        backgroundImg.src = backgroundSrc;

        // Function to draw the background image on the canvas
        const drawBackground = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
            }
        };

        // Draw the background when the image loads
        backgroundImg.onload = drawBackground;
    }, [canvasRef, backgroundSrc]);

    return null; // Wallpaper component doesn't render any DOM elements
};

export default Wallpaper;