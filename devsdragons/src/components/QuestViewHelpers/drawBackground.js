// Draw the background on the given canvas with the given background

export const drawBackground = (canvasRef, background) => {
  const canvas = canvasRef.current;

  if (canvas && background.src) {
    const context = canvas.getContext("2d");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  }
};
