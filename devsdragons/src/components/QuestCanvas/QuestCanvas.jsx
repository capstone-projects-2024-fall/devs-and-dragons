import { useEffect, useState } from "react"

const QuestCanvas = () => {

  const canvasRef = useRef(null);
  const [background, setBackground] = useState(new Image())

  useEffect( () => {
    
    // Load image, background of quest, example black screen
    background.src = "../../assets/black-screen.jpg"

    // Render background
    const render = () => {

      // Previous canvas's context should be cleared and new canvas should be loaded in each time
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Reset canvas upon loading to clear previously loaded background
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Load quest background wallpaper
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      requestAnimationFrame(render);

    };
    
    render();

    // Exiting quest game canvas, end game button should perform this function eventually
    return () => cancelAnimationFrame(render);
  
  }, [background] )

  

  return (
    <div>QuestCanvas</div>
  )
}

export default QuestCanvas