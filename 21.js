new p5((p) => {
  const words = [
    "Blade", "Runner", "Future", "Neon", "Cyber", "City", "Light", "Shadow", "Code", "Dream",
    "Pulse", "Edge", "Electric", "Glass", "Night", "Wire", "Chrome", "Laser", "Synth", "Void"
  ];
  let particles = [];

  p.setup = function() {
    const container = p.select('#sketch-21');
    const w = container.width;
    const h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-21');

    p.textFont('Courier New');
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();

    for (let i = 0; i < 150; i++) {
      particles.push(new Particle(p.random(p.width), p.random(p.height), p.random(words)));
    }
  };

  p.draw = function() {
    p.background(10, 15, 30, 150);
    p.blendMode(p.ADD);

    for (let particle of particles) {
      particle.update();
      particle.display();
    }

    p.blendMode(p.BLEND);
  };

  class Particle {
    constructor(x, y, word) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(0.2, 0.7));
      this.word = word;
      this.baseSize = p.random(12, 28);
      this.size = this.baseSize;
      this.angle = p.random(p.TWO_PI);
      this.angleSpeed = p.random(-0.01, 0.01);
    }

    update() {
      let mouse = p.createVector(p.mouseX, p.mouseY);
      let dir = p5.Vector.sub(mouse, this.pos);
      let dist = dir.mag();
      dir.normalize();

      if (dist < 150) {
        let force = p.map(dist, 0, 150, 2, 0);
        this.vel.sub(dir.mult(force * 0.1));
      } else {
        this.vel.add(p5.Vector.random2D().mult(0.02));
        this.vel.limit(1);
      }

      this.pos.add(this.vel);

      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;

      this.angle += this.angleSpeed;

      this.size = this.baseSize + p.map(dist, 0, 200, 8, 0);
      this.size *= 0.9 + 0.2 * p.sin(p.frameCount * 0.1 + this.pos.x);
    }

    display() {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.angle);

      let distToMouse = p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY);
      let c1 = p.color(90, 150, 255, p.map(distToMouse, 0, 300, 200, 50));
      let c2 = p.color(160, 80, 255, p.map(distToMouse, 0, 300, 180, 40));

      p.drawingContext.shadowBlur = 12;
      p.drawingContext.shadowColor = c2.toString();

      p.fill(p.lerpColor(c1, c2, 0.5));
      p.textSize(this.size);
      p.text(this.word, 0, 0);
      p.pop();
    }
  }
}, 'sketch-21');
