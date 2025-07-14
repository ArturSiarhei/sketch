new p5((p) => {
  let font;
  let particles = [];
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@";

  p.preload = function() {
    font = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  };

  p.setup = function() {
    const container = p.select('#sketch-18');
    const w = container.width;
    const h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-18');

    p.textFont(font);
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();
    p.background(0);
    p.frameRate(60);
  };

  p.draw = function() {
    p.fill(0, 40);
    p.rect(0, 0, p.width, p.height);

    for (let i = 0; i < 6; i++) {
      particles.push(new Particle(p.mouseX, p.mouseY));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];
      particle.update();
      particle.display();
      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }
  };

  class Particle {
    constructor(x, y) {
      this.char = p.random(chars);
      this.pos = p.createVector(x, y);
      let angle = p.random(p.TWO_PI);
      let speed = p.random(0.5, 2);
      this.vel = p5.Vector.fromAngle(angle).mult(speed);
      this.size = p.random(6, 12);
      this.life = 50;
      this.path = [];
      this.color = p.color(p.random(140, 200), p.random(120, 200), p.random(255));
    }

    update() {
      this.path.push(this.pos.copy());
      if (this.path.length > this.life) {
        this.path.shift();
      }
      this.pos.add(this.vel);
      this.vel.mult(0.98);
      this.life--;
    }

    display() {
      p.noFill();
      p.strokeWeight(1);
      for (let i = 1; i < this.path.length; i++) {
        let alpha = p.map(i, 0, this.path.length, 0, 255);
        p.stroke(
          p.red(this.color), 
          p.green(this.color), 
          p.blue(this.color), 
          alpha * 0.4
        );
        p.line(
          this.path[i - 1].x, this.path[i - 1].y, 
          this.path[i].x, this.path[i].y
        );
      }

      p.noStroke();
      p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), 200);
      p.textSize(this.size);
      p.text(this.char, this.pos.x, this.pos.y);
    }
  }
}, 'sketch-18');
