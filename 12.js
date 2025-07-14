const sketch12 = (p) => {
  let particles = [];
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let wordCount = 300;

  p.setup = () => {
    const container = document.getElementById('sketch-12');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('monospace');
    p.noStroke();

    for (let i = 0; i < wordCount; i++) {
      particles.push(createParticle());
    }
  };

  p.draw = () => {
    p.blendMode(p.BLEND);
    p.background(0, 0, 0, 8);

    p.blendMode(p.ADD);
    for (let pArt of particles) {
      pArt.x += pArt.dx;
      pArt.y += pArt.dy;
      pArt.angle += pArt.rotSpeed;

      if (pArt.y < -50 || pArt.x < -100 || pArt.x > p.width + 100 || pArt.y > p.height + 100) {
        Object.assign(pArt, createParticle());
      }

      p.fill((pArt.hue + p.frameCount * 0.5) % 360, 90, 100, pArt.opacity);
      p.push();
      p.translate(pArt.x, pArt.y);
      p.rotate(pArt.angle);
      p.textSize(pArt.size);
      p.text(pArt.text, 0, 0);
      p.pop();
    }
  };

  function createParticle() {
    return {
      text: generateWord(),
      x: p.random(p.width),
      y: p.random(p.height),
      dx: p.random(-0.5, 0.5),
      dy: p.random(-1.5, 1.5),
      size: p.random(18, 46),
      hue: p.random(360),
      opacity: p.random(50, 100),
      rotSpeed: p.random(-0.015, 0.015),
      angle: p.random(p.TWO_PI)
    };
  }

  function generateWord() {
    let len = p.floor(p.random(2, 6));
    let w = '';
    for (let i = 0; i < len; i++) {
      w += alphabet.charAt(p.floor(p.random(alphabet.length)));
    }
    return w;
  }
};

new p5(sketch12);
