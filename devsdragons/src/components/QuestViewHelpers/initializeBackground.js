// With an image, intialize the background for the first time

export const intializeBackground = (
  src,
  setBackground,
  resizeCanvas,
  canvasRef
) => {
  const backgroundImg = new Image();
  backgroundImg.src = src;

  backgroundImg.onload = () => {
    setBackground(backgroundImg);
    resizeCanvas(canvasRef, backgroundImg);
  };
};
