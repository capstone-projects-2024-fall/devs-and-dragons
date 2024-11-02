import { useEffect } from "react"

const QuestCanvas = () => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  })

  return (
    <div>QuestCanvas</div>
  )
}

export default QuestCanvas