const s3 = (p) => {
  let shapes = [];
  let colors;

  p.setup = function () {
    let container = document.getElementById('sketch-3');
    let c = p.createCanvas(container.offsetWidth, container.offsetHeight);
    c.parent(container);
    p.noLoop();

    colors = [
      p.color('#0D3B66'),
      p.color('#FAF0CA'),
      p.color('#F4D35E'),
      p.color('#EE964B'),
      p.color('#F95738')
    ];
    p.noStroke();

    let cols = 16;
    let rows = 12;
    let spacingX = p.width / cols;
    let spacingY = p.height / rows;
    let margin = 0.1;
    let shapeSizeX = spacingX * (1 - margin);
    let shapeSizeY = spacingY * (1 - margin);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * spacingX + spacingX / 2;
        let y = j * spacingY + spacingY / 2;
        let sizeX = shapeSizeX;
        let sizeY = shapeSizeY;
        let angle = ((i + j) % 2) * p.HALF_PI;
        let shapeType = (i + j) % 3;
        let colorIndex = (i + j) % colors.length;

        shapes.push({ x, y, sizeX, sizeY, angle, shapeType, colorIndex });
      }
    }

    drawComposition();
  };

  function drawComposition() {
    p.background('#1B262C');
    for (let s of shapes) {
      p.push();
      p.translate(s.x, s.y);
      p.rotate(s.angle);
      p.fill(colors[s.colorIndex]);
      switch (s.shapeType) {
        case 0:
          p.ellipse(0, 0, s.sizeX, s.sizeY);
          break;
        case 1:
          p.rectMode(p.CENTER);
          p.rect(0, 0, s.sizeX, s.sizeY);
          break;
        case 2:
          p.triangle(
            -s.sizeX / 2, s.sizeY / 2,
            0, -s.sizeY / 2,
            s.sizeX / 2, s.sizeY / 2
          );
          break;
      }
      p.pop();
    }
  }
};

new p5(s3);
