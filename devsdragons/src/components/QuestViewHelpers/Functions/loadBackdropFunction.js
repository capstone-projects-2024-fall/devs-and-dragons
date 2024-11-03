// With an image, load the backdrop of the quest for the first time

export const loadBackdropFunction = (
  src,
  setBackground,
  resizeCanvasFunction,
  canvasRef
) => {
  const backgroundImg = new Image(); // Create a new Image object
  backgroundImg.src = src; // Load the image

  // Ensure background is loaded
  backgroundImg.onload = () => {
    setBackground(backgroundImg); // Set the loaded image as background
    resizeCanvasFunction(canvasRef, backgroundImg); // function to dynamically resize wallpaper to changed window size
  };
};
