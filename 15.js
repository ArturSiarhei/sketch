new p5((p) => {
  let symbolSize = 26;
  let rows;
  let cols;
  let lines = [];
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

  p.setup = function() {
    const container = p.select('#sketch-15');
    const w = container.width;
    const h = container.height;

    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-15');

    p.textFont('Courier New');
    p.noStroke();

    cols = p.floor(p.width / symbolSize) + 10;
    rows = 9;

    lines = [];
    for (let r = 0; r < rows; r++) {
      let y = p.map(r, 0, rows - 1, symbolSize * 1.2, p.height - symbolSize * 0.8);
      let speed = p.map(r, 0, rows - 1, 0.4, 1.6);
      let amplitude = p.map(r, 0, rows - 1, 6, 18);
      let waveLength = p.random(90, 160);
      let size = p.map(r, 0, rows - 1, symbolSize * 0.75, symbolSize * 1.15);
      let phase = (p.TWO_PI / rows) * r;
      lines.push(new TextLine(y, speed, amplitude, waveLength, size, phase));
    }
  };

  p.draw = function() {
    setGradient(0, 0, p.width, p.height, p.color(2, 30, 10), p.color(0, 5, 0), 'Y');
    p.fill(0, 80);
    p.rect(0, 0, p.width, p.height);

    for (let line of lines) {
      line.update();
      line.show();
    }
  };

  class TextLine {
    constructor(y, speed, amplitude, waveLength, size, phase) {
      this.baseY = y;
      this.speed = speed;
      this.amplitude = amplitude;
      this.waveLength = waveLength;
      this.offset = 0;
      this.size = size;
      this.phase = phase;
      this.textArray = [];
      for (let i = 0; i < cols; i++) {
        this.textArray[i] = randomChar();
      }
    }

    update() {
      this.offset -= this.speed * (0.4 + 0.6 * p.sin(p.frameCount * 0.01 + this.phase));
      if (this.offset < -symbolSize) {
        this.offset += symbolSize;
        this.textArray.shift();
        this.textArray.push(randomChar());
      }
      for (let i = 0; i < this.textArray.length; i++) {
        if (p.random() < 0.03) {
          this.textArray[i] = randomChar();
        }
      }
    }

    show() {
      let globalWave = p.sin(p.frameCount * 0.02 + this.phase) * this.amplitude * 0.6;
      for (let i = 0; i < this.textArray.length; i++) {
        let x = i * symbolSize + this.offset;
        let wave1 = p.sin((x + p.frameCount * this.speed) / this.waveLength * p.TWO_PI) * this.amplitude;
        let wave2 = p.sin((x * 0.5 + p.frameCount * this.speed * 1.5) / (this.waveLength * 0.5) * p.TWO_PI) * this.amplitude * 0.4;
        let y = this.baseY + wave1 + wave2 + globalWave;

        for (let trail = 5; trail >= 0; trail--) {
          let trailAlpha = p.map(trail, 0, 5, 0, 150);
          p.fill(50, 200, 120, trailAlpha * 0.6);
          p.textSize(this.size * (1 - trail * 0.1));
          p.text(this.textArray[i], x, y + trail * symbolSize * 0.3);
        }

        let col = p.color(50, 200, 120);
        if (i % 7 === 0) col = p.color(30, 180, 150);
        if (i % 11 === 0) col = p.color(120, 255, 160);
        col.setAlpha(p.map(wave1 + wave2, -this.amplitude * 1.4, this.amplitude * 1.4, 150, 255));
        p.fill(col);

        p.textSize(this.size);
        p.text(this.textArray[i], x, y);

        if (p.random() < 0.007) {
          p.fill(255, 255, 200, 150);
          p.textSize(this.size * 1.2);
          p.text(this.textArray[i], x + p.random(-1, 1), y + p.random(-1, 1));
        }
      }
    }
  }

  function randomChar() {
    return chars.charAt(p.floor(p.random(chars.length)));
  }

  function setGradient(x, y, w, h, c1, c2, axis) {
    p.noFill();
    if (axis === 'Y') {
      for (let i = y; i <= y + h; i++) {
        let inter = p.map(i, y, y + h, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        p.stroke(c);
        p.line(x, i, x + w, i);
      }
    } else if (axis === 'X') {
      for (let i = x; i <= x + w; i++) {
        let inter = p.map(i, x, x + w, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        p.stroke(c);
        p.line(i, y, i, y + h);
      }
    }
  }
}, 'sketch-15');
