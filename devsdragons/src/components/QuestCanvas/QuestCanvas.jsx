import { useEffect, useState } from "react"

const QuestCanvas = () => {

  const canvasRef = useRef(null);
  const [background, setBackground] = useState(new Image())

  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

      // Render background
    const render = () => {
      // Previous canvas's context should be cleared and new canvas should be loaded in each time
      context.clear
    }
  
  } )

  

  return (
    <div>QuestCanvas</div>
  )
}

export default QuestCanvas