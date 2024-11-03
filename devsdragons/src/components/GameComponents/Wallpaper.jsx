import { useEffect } from "react";

const Wallpaper = ({ canvasRef, backgroundSrc }) => {
    
    useEffect = () => {
        const backgroundImg = new Image(); // Create a new Image object
        backgroundImg.src = backgroundImgSrc; // Load the image, supplied path to asset is the one chosen for quest's wallpaper
        
    };


    return null; // Wallpaper is to be used by a higher level component, it doesn't return anything
}

export default Wallpaper;