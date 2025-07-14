const sketch8 = (p) => {
  p.setup = () => {
    const container = document.getElementById('sketch-8');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    p.background('#0D1117');
    p.noFill();
    p.strokeCap(p.ROUND);

    let baseColors = [
      p.color('#58A6FF'),
      p.color('#1F6FEB'),
      p.color('#3B82F6'),
      p.color('#0A84FF'),
      p.color('#8AB4F8'),
    ];

    let cx = p.width / 2 - 150;
    let cy = p.height / 2 - 150;

    for (let layer = 0; layer < 6; layer++) {
      let alpha = p.map(layer, 0, 5, 180, 40);
      let c = baseColors[layer % baseColors.length];
      c.setAlpha(alpha);
      p.strokeWeight(1.5 + layer * 0.5);

      for (let i = 0; i < 60; i++) {
        let angle = p.TWO_PI * i / 60 + layer * 0.1;
        let radius = 120 + layer * 70 + Math.sin(i * 0.3 + layer) * 30;
        let x = cx + Math.cos(angle) * radius;
        let y = cy + Math.sin(angle) * radius;

        p.stroke(c);
        p.point(x, y);

        if (i % 5 === 0) {
          p.strokeWeight(0.7 + layer * 0.3);
          let x2 = cx + Math.cos(angle) * (radius + 40);
          let y2 = cy + Math.sin(angle) * (radius + 40);
          p.line(x, y, x2, y2);
        }
      }
    }

    p.noStroke();
    let spiralCount = 10;
    let spiralRings = 10;
    for (let i = 0; i < spiralCount * spiralRings; i++) {
      let angle = i * p.PI / 12;
      let radius = p.map(i, 0, spiralCount * spiralRings, 150, 350);
      let x = cx + Math.cos(angle) * radius;
      let y = cy + Math.sin(angle) * radius;
      let size = p.map(i % spiralRings, 0, spiralRings, 5, 15);

      p.fill(p.lerpColor(p.color('#58A6FF'), p.color('#8AB4F8'), (i % spiralRings) / spiralRings));
      p.ellipse(x, y, size, size * 0.6);
    }

    p.strokeWeight(1);
    p.stroke('#1F6FEB');
    let gridCols = 18;
    let gridRows = 18;
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        let x = p.map(col, 0, gridCols - 1, 0, p.width);
        let y = p.map(row, 0, gridRows - 1, 0, p.height);
        let w = p.map(col % 3, 0, 2, 3, 7);
        let h = p.map(row % 2, 0, 1, 1, 3);
        p.push();
        p.translate(x, y);
        p.rotate(((col + row) % 4) * p.PI / 8);
        p.rectMode(p.CENTER);
        p.rect(0, 0, w, h, 2);
        p.pop();
      }
    }
  };

  p.draw = () => {};
};

new p5(sketch8);
