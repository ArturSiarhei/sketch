const s4 = (p) => {
  let windows = [];
  let colors;

  p.setup = function () {
    let container = document.getElementById('sketch-4');
    let c = p.createCanvas(container.offsetWidth, container.offsetHeight);
    c.parent(container);

    colors = [
      p.color('#FFD700'),
      p.color('#FFA500'),
      p.color('#FF8C00'),
      p.color('#FFFFE0'),
      p.color('#FFFACD')
    ];
    p.randomSeed(777);
    p.noiseSeed(777);

    for (let i = 0; i < 120; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height * 0.5, p.height);
      let w = p.random(10, 30);
      let h = p.random(20, 60);
      let c = p.random(colors);
      let lit = p.random() < 0.6;
      windows.push({ x, y, w, h, c, lit });
    }

    p.noStroke();
    p.rectMode(p.CENTER);
    p.background('#0B1D2F');

    for (let i = 0; i < p.width; i += 50) {
      let bHeight = p.random(p.height * 0.3, p.height * 0.8);
      p.fill('#112F41');
      p.rect(i + 25, p.height - bHeight / 2, 50, bHeight);
    }

    for (let w of windows) {
      if (w.lit) {
        p.fill(w.c);
      } else {
        p.fill(20, 20, 20, 100);
      }
      p.rect(w.x, w.y, w.w, w.h, 2);
    }

    for (let i = 20; i < p.width; i += 100) {
      p.fill(255, 220, 100, 80);
      p.ellipse(i, p.height - p.random(80, 150), 15, 15);
      p.fill(255, 200, 100, 100);
      p.rect(i, p.height - p.random(80, 150) / 2, 2, p.random(80, 150));
    }
  };
};

new p5(s4);
