const canvas = document.getElementById('mandelbrotCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function drawMandelbrot(maxIter, scale, xOffset, yOffset) {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;

  for (let x = 0; x < width; x++) {
    const normalizedX = (x - centerX + xOffset) / (scale * width) + 0.5;
    for (let y = 0; y < height; y++) {
      const normalizedY = (y - centerY + yOffset) / (scale * height) + 0.5;
      let cReal = normalizedX;
      let cImag = normalizedY;
      let iteration = 0;

      while (iteration < maxIter && Math.pow(cReal, 2) + Math.pow(cImag, 2) <= 4) {
        const cRealTemp = cReal * cReal - cImag * cImag + normalizedX;
        cImag = 2 * cReal * cImag + normalizedY;
        cReal = cRealTemp;
        iteration++;
      }

      ctx.fillStyle = getColorBasedOnIteration(iteration);
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function getColorBasedOnIteration(iteration) {
  const hue = iteration % 360;
  return `hsl(${hue}, 100%, 50%)`;
}

document.getElementById('drawButton')
  .addEventListener('click', function() {
    const iterations = parseInt(document.getElementById('iterations')
      .value, 10);
    const scale = parseFloat(document.getElementById('scale')
      .value);
    const xOffset = parseFloat(document.getElementById('xOffset')
      .value);
    const yOffset = parseFloat(document.getElementById('yOffset')
      .value);

    if (!isNaN(iterations) && iterations > 0 && scale > 0) {
      drawMandelbrot(iterations, scale, xOffset, yOffset);
    }
  });

// 初始绘制  
drawMandelbrot(100, 1, 0, 0);