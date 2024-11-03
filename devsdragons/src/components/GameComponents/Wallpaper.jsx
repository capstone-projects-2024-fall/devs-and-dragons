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

        // Draw the background when the image is loaded initially
        backgroundImg.onload = drawBackground;

        // Redraw the background when the canvas size changes
        drawBackground(); // Ensure it's drawn if resized after mount

        // Set up an observer to detect canvas resizing
        const resizeObserver = new ResizeObserver(drawBackground);
        if (canvasRef.current) {
            resizeObserver.observe(canvasRef.current);
        }

        return () => {
            if (canvasRef.current) {
                resizeObserver.unobserve(canvasRef.current);
            }
        };
    }, [canvasRef, backgroundSrc]);

    return null;
};

export default Wallpaper;