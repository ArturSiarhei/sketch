const sketch11 = (p) => {
  let letters = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  class FloatingLetter {
    constructor(id) {
      this.letter = this.randomLetters();
      this.baseX = p.random(p.width);
      this.baseY = p.random(p.height);
      this.baseSize = p.random(18, 38);
      this.alpha = p.random(60, 130);

      this.phaseX = p.random(p.TWO_PI);
      this.phaseY = p.random(p.TWO_PI);
      this.phaseScale = p.random(p.TWO_PI);

      this.ampX = p.random(5, 10);
      this.ampY = p.random(5, 10);
      this.scaleRange = 0.5;

      this.speedX = 0.02;
      this.speedY = 0.019;
      this.speedScale = 0.018;
    }

    randomLetters() {
      let len = p.floor(p.random(3, 6));
      let str = "";
      for (let i = 0; i < len; i++) {
        let ch = p.random(alphabet);
        if (typeof ch !== "string") {
          console.warn("Non-string character found:", ch);
          ch = "?";
        }
        str += ch;
      }
      return str;
    }

    update() {
      this.phaseX += this.speedX;
      this.phaseY += this.speedY;
      this.phaseScale += this.speedScale;
    }

    display() {
      p.fill(160, 200, 255, this.alpha);

      let scaleFactor = p.map(p.sin(this.phaseScale), -1, 1, 1 - this.scaleRange, 1 + this.scaleRange);
      scaleFactor = p.constrain(scaleFactor, 0.5, 1.5);

      let size = this.baseSize * scaleFactor;
      size = p.max(size, 10);

      let x = this.baseX + p.sin(this.phaseX) * this.ampX;
      let y = this.baseY + p.sin(this.phaseY) * this.ampY;

      if (isNaN(x) || isNaN(y) || isNaN(size)) {
        console.warn("NaN detected in FloatingLetter:", x, y, size);
        return;
      }

      if (typeof this.letter !== "string") {
        console.warn("Letter is not string:", this.letter);
        return;
      }

      p.textSize(size);
      p.text(this.letter, x, y);
    }
  }

  p.setup = () => {
    const container = document.getElementById('sketch-11');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    p.textFont("Georgia");
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();

    for (let i = 0; i < 150; i++) {
      letters.push(new FloatingLetter(i));
    }
  };

  p.draw = () => {
    drawOceanGradient();

    for (let l of letters) {
      l.update();
      l.display();
    }
  };

  function drawOceanGradient() {
    for (let y = 0; y < p.height; y++) {
      let inter = p.map(y, 0, p.height, 0, 1);
      let c = p.lerpColor(p.color(0, 0, 0), p.color(0, 30, 60), inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }
  }
};

new p5(sketch11);
