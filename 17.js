new p5((p) => {
  let font;
  let particles = [];
  let phrases = "CYBERNEONMATRIXFUTUREDATASTREAM".split("");

  p.preload = function() {
    font = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  };

  p.setup = function() {
    const container = p.select('#sketch-17');
    const w = container.width;
    const h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-17');

    p.textFont(font);
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();
    p.fill(255);
  };

  p.draw = function() {
    p.background(0, 50);

    if (p.mouseIsPressed) {
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(p.mouseX, p.mouseY));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];
      particle.update();
      particle.display();
      if (particle.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
  };

  class Particle {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(0.5, 2));
      this.acc = p.createVector(0, 0.05);
      this.size = p.random(6, 12);
      this.alpha = 255;
      this.char = p.random(phrases);
      this.angle = p.random(p.TWO_PI);
      this.rotateSpeed = p.random(-0.05, 0.05);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.alpha -= 4;
      this.angle += this.rotateSpeed;
    }

    display() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);
      p.fill(100, 200, 255, this.alpha);
      p.textSize(this.size);
      p.text(this.char, 0, 0);
      p.pop();
    }
  }
}, 'sketch-17');
