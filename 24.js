new p5((p) => {
  let cols, rows;
  const scl = 20;
  let w, h;
  let flying = 0;

  p.setup = function() {
    const container = p.select('#sketch-24');
    let wCanvas = container.width;
    let hCanvas = container.height;
    let canvas = p.createCanvas(wCanvas, hCanvas);
    canvas.parent('sketch-24');

    cols = p.floor(p.width / scl) + 2;
    rows = p.floor(p.height / scl) + 2;
    w = cols * scl;
    h = rows * scl;

    p.colorMode(p.HSL, 360, 100, 60, 1);
    p.noStroke();
  };

  p.draw = function() {
    p.background(230, 30, 10, 0.12);

    flying -= 0.01;

    let yoff = flying;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let n = p.noise(xoff, yoff);
        let size = p.map(n, 0, 1, scl * 0.3, scl * 1.5);

        let px = x * scl;
        let py = y * scl;

        let angle = p.map(n, 0, 1, 0, p.TWO_PI);

        p.push();
        p.translate(px, py);

        let distToMouse = p.dist(px, py, p.mouseX, p.mouseY);
        let alpha = p.map(distToMouse, 0, p.width / 2, 1, 0);
        alpha = p.constrain(alpha, 0, 1);

        let hue = (p.map(px + py + p.frameCount * 2, 0, p.width + p.height, 200, 270)) % 360;
        p.fill(hue, 80, 60, alpha * 0.8);

        p.rotate(angle + p.frameCount * 0.01);

        p.ellipse(0, 0, size, size * 0.6);
        p.pop();

        xoff += 0.15;
      }
      yoff += 0.15;
    }
  };
}, 'sketch-24');
