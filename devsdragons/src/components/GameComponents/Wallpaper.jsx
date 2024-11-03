import { useEffect } from "react";

const Wallpaper = ({ canvasRef, backgroundSrc }) => {
    
    useEffect = () => {
        const backgroundImg = new Image(); // Create a new Image object
        backgroundImg.src = backgroundSrc; // Load the image, supplied path to asset is the one chosen for quest's wallpaper
        
        // Ensure background is loaded
        backgroundImg.onload = () => {

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');


            // Draw background image only when it's loaded
            if (backgroundImg.src) {
                context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
            }
        };
    }, [canvasRef, backgroundSrc];


    return null; // Wallpaper is to be used by a higher level component, it doesn't return anything
}

export default Wallpaper;