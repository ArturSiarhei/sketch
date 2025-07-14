new p5((p) => {
  let path = [];
  let particles = [];
  const maxLength = 400;
  const eraseTime = 5000;
  let hueStart = 0;
  const hueChangeSpeed = 0.6;

  p.setup = function() {
    const container = p.select('#sketch-23');
    let w = container.width;
    let h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-23');

    p.colorMode(p.HSL, 360, 100, 60, 1);
    p.background(10);
    p.noFill();
    p.frameRate(60);
  };

  p.draw = function() {
    p.background(10, 0.12);

    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      let pos = p.createVector(p.mouseX, p.mouseY);
      if (path.length === 0 || p5.Vector.dist(pos, path[path.length - 1].pos) > 1.5) {
        let thickness = p.map(p.sin(p.frameCount * 0.1), -1, 1, 1.5, 5);
        let hueVal = (hueStart + 360) % 360;
        path.push({
          pos,
          time: p.millis(),
          thickness,
          hue: hueVal
        });
        if (path.length > maxLength) {
          let removed = path.shift();
          createParticles(removed);
        }
      }
    }

    p.beginShape();
    for (let i = 0; i < path.length; i++) {
      let pt = path[i];
      if (i === path.length - 1) {
        p.stroke(pt.hue, 80, 65, 1);
        p.strokeWeight(pt.thickness);
      } else {
        let t = i / (path.length - 1);
        let hueVal = (hueStart + t * 360) % 360;
        let thick = p.lerp(path[0].thickness, path[path.length - 2]?.thickness || 1.5, t);
        p.stroke(hueVal, 80, 65, 1);
        p.strokeWeight(thick);
      }
      p.curveVertex(pt.pos.x, pt.pos.y);
    }
    p.endShape();

    eraseOldPoints();

    for (let i = particles.length - 1; i >= 0; i--) {
      let pa = particles[i];
      pa.update();
      pa.show();
      if (pa.isDead()) {
        particles.splice(i, 1);
      }
    }

    hueStart = (hueStart + hueChangeSpeed) % 360;
  };

  function eraseOldPoints() {
    let now = p.millis();
    while (path.length > 0 && now - path[0].time > eraseTime) {
      let removed = path.shift();
      createParticles(removed);
    }
  }

  function createParticles(point) {
    let count = p.floor(p.random(5, 12));
    for (let i = 0; i < count; i++) {
      let angle = p.random(p.TWO_PI);
      let speed = p.random(0.5, 3);
      let velocity = p5.Vector.fromAngle(angle).mult(speed);
      particles.push(new Particle(point.pos.x, point.pos.y, velocity, point.hue, point.thickness));
    }
  }

  class Particle {
    constructor(x, y, velocity, hue, thickness) {
      this.pos = p.createVector(x, y);
      this.vel = velocity;
      this.hue = hue;
      this.life = 255;
      this.thickness = thickness / 2;
    }

    update() {
      this.pos.add(this.vel);
      this.vel.mult(0.92);
      this.life -= 1.5;
    }

    show() {
      p.stroke(this.hue, 80, 65, this.life / 255);
      p.strokeWeight(this.thickness);
      p.point(this.pos.x, this.pos.y);
    }

    isDead() {
      return this.life <= 0;
    }
  }
}, 'sketch-23');
