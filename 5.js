const s5 = (p) => {
  let waves = [];
  let colors;

  p.setup = function () {
    let container = document.getElementById('sketch-5');
    let c = p.createCanvas(container.offsetWidth, container.offsetHeight);
    c.parent(container);

    colors = [
      p.color('#023E8A'),
      p.color('#0077B6'),
      p.color('#0096C7'),
      p.color('#00B4D8'),
      p.color('#90E0EF')
    ];
    p.noStroke();

    let spacingX = 30;
    let spacingY = 15;

    for (let y = 0; y < p.height; y += spacingY) {
      for (let x = 0; x < p.width; x += spacingX) {
        let sizeFactor = p.map(y, 0, p.height, 0.3, 1.5);
        let sizeX = 30 * sizeFactor;
        let sizeY = sizeX * 0.6;
        let colorIndex = (p.floor(y / spacingY) + p.floor(x / spacingX)) % colors.length;
        waves.push({ x, y, sizeX, sizeY, colorIndex });
      }
    }

    p.background(colors[0]);
    p.drawWaves = function () {
      for (let w of waves) {
        p.fill(colors[w.colorIndex]);
        p.ellipse(w.x, w.y, w.sizeX, w.sizeY);
      }
    };

    p.drawWaves();
    p.noLoop();
  };

  p.draw = function () {};
};

new p5(s5);
