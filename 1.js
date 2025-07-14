const s1 = (p) => {
  let gridSize = 8;

  p.setup = function () {
    let container = document.getElementById('sketch-1');
    let c = p.createCanvas(container.offsetWidth, container.offsetHeight);
    c.parent(container);

    p.background(10);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('Courier');

    p.randomSeed(42);
    p.noiseSeed(42);

    for (let y = 0; y < p.height; y += gridSize) {
      for (let x = 0; x < p.width; x += gridSize) {
        let noiseVal = p.noise(x * 0.01, y * 0.01);
        if (noiseVal > 0.5) {
          p.push();
          p.translate(x, y);
          p.rotate(p.random(-p.PI / 4, p.PI / 4));

          let r = p.random(1);
          if (r < 0.3) {
            p.fill(255, 100, 0, 200);
            p.ellipse(0, 0, gridSize, gridSize);
          } else if (r < 0.6) {
            p.fill(0, 200, 255, 200);
            p.rectMode(p.CENTER);
            p.rect(0, 0, gridSize, gridSize);
          } else {
            p.fill(180, 0, 255, 200);
            p.textSize(gridSize);
            p.text(p.random(['T', 'I', 'G', 'E', 'R']), 0, 0);
          }
          p.pop();
        }
      }
    }
  };
};

new p5(s1);
