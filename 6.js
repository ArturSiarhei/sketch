const sketch6 = (p) => {
  p.setup = () => {
    // Получаем размер контейнера
    const container = document.getElementById('sketch-6');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    // Создаём канвас внутри контейнера
    p.createCanvas(w, h).parent(container);
    p.background(20);
    p.noFill();
    p.strokeCap(p.ROUND);

    let centerX = p.width / 2;
    let centerY = p.height / 2;

    let rings = 10;
    let spokes = 100;

    for (let r = 1; r <= rings; r++) {
      let radius = p.map(r, 1, rings, 0, Math.max(p.width, p.height));
      for (let s = 0; s < spokes; s++) {
        let angle = p.map(s, 0, spokes, 0, p.TWO_PI);

        let x1 = centerX + Math.cos(angle) * radius;
        let y1 = centerY + Math.sin(angle) * radius;
        let x2 = centerX + Math.cos(angle) * (radius + 100);
        let y2 = centerY + Math.sin(angle) * (radius + 100);

        p.stroke(p.lerpColor(p.color('#FF5733'), p.color('#900C3F'), r / rings), 150);
        p.strokeWeight(p.map(s % 7, 0, 6, 1, 2.5));
        p.line(x1, y1, x2, y2);
      }
    }

    let cols = 16;
    let rows = 12;
    let spacingX = p.width / cols;
    let spacingY = p.height / rows;

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        let posX = x * spacingX;
        let posY = y * spacingY;

        let wave = Math.sin(x * 0.6 + y * 0.4) * 30;
        let size = p.map(Math.sin(x * 0.5 + y * 0.3), -1, 1, 30, 80);

        let col = p.lerpColor(p.color('#FFC300'), p.color('#FF5733'), (x + y) / (cols + rows));
        p.stroke(col.levels[0], col.levels[1], col.levels[2], 220);
        p.strokeWeight(1.8);

        p.push();
        p.translate(posX, posY + wave);
        p.rotate(((x * y) % 6) * p.PI / 12);

        if ((x + y) % 3 === 0) {
          p.ellipse(0, 0, size, size * 0.6);
        } else if ((x + y) % 3 === 1) {
          p.rectMode(p.CENTER);
          p.rect(0, 0, size, size * 0.8, 10);
        } else {
          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += p.PI / 3) {
            let px = Math.cos(a) * size * 0.5;
            let py = Math.sin(a) * size * 0.5;
            p.vertex(px, py);
          }
          p.endShape(p.CLOSE);
        }
        p.pop();
      }
    }
  };

  p.draw = () => {};
};

// Инициализируем скетч на div#sketch-6
new p5(sketch6);
