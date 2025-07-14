new p5((p) => {
  const phrases = [
    "Electric", "Dreams", "Neon", "Lights", "Cyber", "Pulse", "Digital",
    "Rain", "Synthetic", "Soul", "Future", "Shock", "Chrome", "Glow",
    "Dark", "Circuit", "Pixel", "Fade", "Laser", "Edge", "Quantum",
    "Flux", "Shadow", "Net"
  ];
  let movers = [];
  let particles = [];

  p.setup = function() {
    const container = p.select('#sketch-22');
    let w = container.width;
    let h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-22');

    p.textFont('Courier New');
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();
    p.frameRate(60);

    for (let i = 0; i < 120; i++) {
      let phrase = p.random(phrases);
      movers.push(new Mover(p.random(p.width), p.random(p.height), phrase));
    }
  };

  p.draw = function() {
    p.background(5, 10, 20, 180);

    for (let m of movers) {
      m.update();
      m.display();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }
  };

  p.mousePressed = function() {
    for (let i = movers.length - 1; i >= 0; i--) {
      let m = movers[i];
      let w = p.textWidth(m.phrase) * (m.size / 16);
      let h = m.size * 1.2;

      p.push();
      p.translate(m.pos.x, m.pos.y);
      p.rotate(m.angle);
      let dx = p.mouseX - m.pos.x;
      let dy = p.mouseY - m.pos.y;
      let localX = p.cos(-m.angle) * dx - p.sin(-m.angle) * dy;
      let localY = p.sin(-m.angle) * dx + p.cos(-m.angle) * dy;
      p.pop();

      if (localX > -w / 2 && localX < w / 2 && localY > -h / 2 && localY < h / 2) {
        particles.push(...m.scatter());
        movers.splice(i, 1);
        setTimeout(() => {
          movers.push(new Mover(p.random(p.width), p.random(p.height), p.random(phrases)));
        }, 1000);
        break;
      }
    }
  };

  class Mover {
    constructor(x, y, phrase) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(0.1, 0.5));
      this.phrase = phrase;
      this.baseSize = p.random(14, 26);
      this.size = this.baseSize;
      this.angle = p.random(p.TWO_PI);
      this.angleSpeed = p.random(-0.015, 0.015);
      this.opacity = 0;
      this.fadeInSpeed = p.random(1, 3);
    }

    update() {
      this.pos.add(this.vel);
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;

      this.angle += this.angleSpeed;

      this.opacity += this.fadeInSpeed;
      this.opacity = p.constrain(this.opacity, 0, 255);

      this.size = this.baseSize + 3 * p.sin(p.frameCount * 0.15 + this.pos.x);
    }

    display() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);
      p.drawingContext.shadowBlur = 20;
      p.drawingContext.shadowColor = `rgba(100, 150, 255, ${this.opacity / 255})`;
      p.fill(100, 150, 255, this.opacity);
      p.textSize(this.size);
      p.text(this.phrase, 0, 0);
      p.pop();
    }

    scatter() {
      let pieces = [];
      let chars = this.phrase.split('');
      let angleStep = p.TWO_PI / chars.length;
      for (let i = 0; i < chars.length; i++) {
        let angle = i * angleStep + this.angle;
        let offset = p5.Vector.fromAngle(angle).mult(this.size * 0.5);
        let pos = p5.Vector.add(this.pos, offset);
        pieces.push(new Particle(pos.x, pos.y, chars[i], angle));
      }
      return pieces;
    }
  }

  class Particle {
    constructor(x, y, c, angle) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(2, 4));
      this.c = c;
      this.angle = p.random(p.TWO_PI);
      this.angleSpeed = p.random(-0.1, 0.1);
      this.life = 255;
      this.size = p.random(14, 22);
    }

    update() {
      this.pos.add(this.vel);
      this.angle += this.angleSpeed;
      this.life -= 4;
    }

    display() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);
      p.fill(100, 150, 255, this.life);
      p.noStroke();
      p.textSize(this.size);
      p.text(this.c, 0, 0);
      p.pop();
    }

    isDead() {
      return this.life <= 0;
    }
  }
}, 'sketch-22');
