import { useEffect, useState, useRef } from "react";
import backgroundImgSrc from "../../assets/black-screen.jpg"; // Cast the image as a variable to be used
import Wallpaper from "./Wallpaper";

const QuestCanvas = () => {
    
    // Canvas reference
    const canvasRef = useRef(null);

    // Background reference
    const [background, setBackground] = useState(new Image());

    useEffect(() => {
        
        

        const render = () => {
            
            

            // Clear the previous canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background image only when it's loaded
            

            requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize) // remove when game is exited
            cancelAnimationFrame(render);
        };

    }, [background]);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;

        // if canvas exists
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Update context and background
            const context = canvas.getContext('2d');
            if (background.src) {
                context.drawImage(background, 0, 0, canvas.width, canvas.height);
            }
        }

    };
    

    

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid #000' }}
            />
        </div>
    );

};

export default QuestCanvas;
