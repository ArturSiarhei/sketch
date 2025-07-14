new p5((p) => {
  let particles = [];

  p.setup = function() {
    const container = p.select('#sketch-20');
    const w = container.width;
    const h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-20');

    for(let i = 0; i < 100; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-1, 1),
        vy: p.random(-1, 1)
      });
    }
  };

  p.draw = function() {
    p.background(20, 30, 50, 50);

    p.stroke(255, 150);
    for(let pObj of particles) {
      pObj.x += pObj.vx;
      pObj.y += pObj.vy;

      if(pObj.x < 0 || pObj.x > p.width) pObj.vx *= -1;
      if(pObj.y < 0 || pObj.y > p.height) pObj.vy *= -1;

      let dx = p.mouseX - pObj.x;
      let dy = p.mouseY - pObj.y;
      let distSq = dx * dx + dy * dy;
      if(distSq < 10000) {
        pObj.vx += dx * 0.001;
        pObj.vy += dy * 0.001;
      }

      p.noFill();
      p.ellipse(pObj.x, pObj.y, 4);

      let dMouse = p.dist(pObj.x, pObj.y, p.mouseX, p.mouseY);
      if(dMouse < 100) {
        p.stroke(255, p.map(dMouse, 0, 100, 255, 0));
        p.line(pObj.x, pObj.y, p.mouseX, p.mouseY);
      }
    }
  };
}, 'sketch-20');
