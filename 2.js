const s2 = (p) => {
  let gridSize = 5;

  p.setup = function () {
    let container = document.getElementById('sketch-2');
    let c = p.createCanvas(container.offsetWidth, container.offsetHeight);
    c.parent(container);

    p.background(20);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('Courier');

    p.randomSeed(123);
    p.noiseSeed(123);

    for (let y = 0; y < p.height; y += gridSize) {
      for (let x = 0; x < p.width; x += gridSize) {
        let nx = p.map(x, 0, p.width, -1, 1);
        let ny = p.map(y, 0, p.height, -1, 1);
        let r = p.sqrt(nx * nx + ny * ny);

        if (r < 0.6) {
          p.push();
          p.translate(x, y);
          p.rotate(p.PI / 4);

          let prob = p.random();
          if (prob < 0.4) {
            p.fill(255, 140, 0, 220);
            p.rect(0, 0, gridSize, gridSize);
          } else if (prob < 0.7) {
            p.fill(0, 0, 0, 220);
            p.ellipse(0, 0, gridSize, gridSize);
          } else {
            p.fill(255, 255, 255, 220);
            p.textSize(gridSize);
            p.text('♦', 0, 0);
          }
          p.pop();
        }
      }
    }
  };
};

new p5(s2);
