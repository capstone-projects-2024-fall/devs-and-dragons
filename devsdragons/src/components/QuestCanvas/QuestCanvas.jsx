import { useEffect, useState, useRef } from "react";
import backgroundImgSrc from "./black-screen.jpg"; // Cast the image as a variable to be used

const QuestCanvas = () => {
    const canvasRef = useRef(null);
    const [background, setBackground] = useState(new Image()); // Correctly use array destructuring

    useEffect(() => {
        const backgroundImg = new Image(); // Create a new Image object
        backgroundImg.src = backgroundImgSrc; // Load the image

        // Ensure background is loaded
        backgroundImg.onload = () => {
            setBackground(backgroundImg); // Set the loaded image as background
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

        return () => cancelAnimationFrame(render);
    }, [background]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{ border: '1px solid #000' }}
            />
        </div>
    );
};

export default QuestCanvas;
