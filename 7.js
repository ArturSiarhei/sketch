const sketch7 = (p) => {
  p.setup = () => {
    const container = document.getElementById('sketch-7');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    p.randomSeed(31415);
    p.noiseSeed(31415);
    p.background('#121212');
    p.noFill();
    p.strokeWeight(1.8);
    p.strokeCap(p.ROUND);

    let base = p.color('#F4F1DE');
    let accent = p.color('#E07A5F');
    let secondary = p.color('#3D405B');
    let highlight = p.color('#81B29A');

    for (let i = 0; i < 60; i++) {
      let angle = p.TWO_PI * i / 60;
      let radius = p.map(i, 0, 60, 60, 350);
      let x = p.width / 2 + Math.cos(angle) * radius;
      let y = p.height / 2 + Math.sin(angle) * radius;

      p.stroke(p.lerpColor(accent, base, i / 60));
      p.ellipse(x, y, 15, 7);

      p.stroke(p.lerpColor(secondary, highlight, 1 - i / 60));
      let lineLen = p.map(i, 0, 60, 10, 1200);
      let x2 = p.width / 2 + Math.cos(angle) * lineLen;
      let y2 = p.height / 2 + Math.sin(angle) * lineLen;
      p.line(x, y, x2, y2);
    }

    p.strokeWeight(3);
    p.stroke(base);
    p.ellipse(p.width / 2, p.height / 2, 180, 180);

    p.noStroke();
    p.fill(accent);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);

    p.strokeWeight(2);
    p.stroke(highlight);
    for (let i = 0; i < 15; i++) {
      let angle = p.random(p.TWO_PI);
      let r = p.random(80, 300);
      let x = p.width / 2 + Math.cos(angle) * r;
      let y = p.height / 2 + Math.sin(angle) * r;
      p.ellipse(x, y, 8, 4);
    }

    p.strokeWeight(1);
    p.stroke(p.lerpColor(base, secondary, 0.5));
    for (let i = 0; i < 100; i++) {
      let angle = p.random(p.TWO_PI);
      let r = p.random(20, 380);
      let x = p.width / 2 + Math.cos(angle) * r;
      let y = p.height / 2 + Math.sin(angle) * r;
      if (p.random() < 0.5) {
        p.ellipse(x, y, 5, 3);
      } else {
        p.push();
        p.translate(x, y);
        p.rotate(p.random(p.TWO_PI));
        p.rectMode(p.CENTER);
        p.rect(0, 0, 6, 6);
        p.pop();
      }
    }
  };

  p.draw = () => {};
};

new p5(sketch7);
