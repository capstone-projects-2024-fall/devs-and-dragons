// If browser window dimensions are modified, resize the quest view as needed

export const resizeCanvas = (canvasRef, background) => {
    const canvas = canvasRef.current

    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground(canvasRef, background); // Draw the background after resizing
      }
}