const sketch9 = (p) => {
  let shapes = [];
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

  p.setup = () => {
    const container = document.getElementById('sketch-9');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    p.noFill();
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('monospace');

    for (let i = 0; i < 30; i++) {
      shapes.push({
        angleOffset: p.random(360),
        radius: p.random(50, Math.min(w, h) / 2 - 20),
        size: p.random(12, 48),
        speed: p.random(0.2, 1),
        letter: p.random(letters),
        strokeColor: p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255), 150)
      });
    }
  };

  p.draw = () => {
    p.background(15, 15, 30, 25);
    p.translate(p.width / 2, p.height / 2);

    for (let s of shapes) {
      let angle = p.frameCount * s.speed + s.angleOffset;
      let x = s.radius * p.cos(angle);
      let y = s.radius * p.sin(angle);

      p.push();
      p.stroke(s.strokeColor);
      p.strokeWeight(1.5);
      p.translate(x, y);
      p.rotate(angle);
      p.textSize(s.size);
      p.noFill();
      p.text(s.letter, 0, 0);
      p.pop();
    }
  };
};

new p5(sketch9);
