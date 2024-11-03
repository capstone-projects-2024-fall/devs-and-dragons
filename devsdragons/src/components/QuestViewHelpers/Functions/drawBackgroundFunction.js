// Draw the background on the given canvas with the given background

export const drawBackgroundFunction = (canvasRef, background) => {
  const canvas = canvasRef.current;

  // Draw background image only when it's loaded
  if (canvas && background.src) {
    const context = canvas.getContext("2d");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  }
};
