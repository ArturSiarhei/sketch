new p5((p) => {
  let font;
  let texts = [];
  let blurLayers = [];
  let colors = [];
  let width, height;

  p.preload = function() {
    font = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  };

  p.setup = function() {
    const container = p.select('#sketch-16');
    width = container.width;
    height = container.height;

    let canvas = p.createCanvas(width, height);
    canvas.parent('sketch-16');

    p.textFont(font);
    p.textAlign(p.CENTER, p.CENTER);
    p.frameRate(60);

    let phrases = [
      "BLADE", "RUNNER", "NEON", "CYBER", "SHADOWS", "FUTURE", "MATRIX",
      "HACKER", "CITY", "VIRTUAL", "DREAMS", "LIGHTS", "STREETS", "CODE",
      "SYSTEM", "DATA", "NIGHT", "GLOW", "PHANTOM", "SILENCE", "RUSH"
    ];

    texts = [];
    for (let i = 0; i < 150; i++) {
      texts.push({
        word: p.random(phrases),
        x: p.random(width),
        y: p.random(height),
        baseSize: p.random(15, 50),
        sizeOffset: p.random(0, 8),
        sizePhase: p.random(p.TWO_PI),
        speedX: p.random(-1.5, -0.3),
        angle: p.random(-20, 20),
        angleSpeed: p.random(-0.4, 0.4),
        glowAlpha: p.random(60, 180),
        glowDir: p.random() > 0.5 ? 1 : -1,
        speedPhase: p.random(p.TWO_PI),
        speedAmp: p.random(0.3, 1.2),
      });
    }

    colors = [
      p.color(0, 255, 255, 120),
      p.color(255, 0, 255, 100),
      p.color(0, 255, 128, 80),
      p.color(255, 128, 0, 60)
    ];

    blurLayers = [];
    for (let i = 0; i < colors.length; i++) {
      let g = p.createGraphics(width, height);
      g.textFont(font);
      g.textAlign(p.CENTER, p.CENTER);
      g.noStroke();
      blurLayers.push(g);
    }
  };

  p.draw = function() {
    p.background(5, 5, 15, 230);

    for (let i = 0; i < blurLayers.length; i++) {
      let g = blurLayers[i];
      g.clear();
      g.fill(colors[i]);

      for (let t of texts) {
        let speed = t.speedX + p.sin(p.frameCount * 0.04 + t.speedPhase) * t.speedAmp * 0.6 * (i + 1);
        t.x += speed;
        if (t.x < -150) t.x = width + 150;

        t.angle += t.angleSpeed * 0.3 * (i + 1);

        t.glowAlpha += t.glowDir * 5;
        if (t.glowAlpha > 220) t.glowDir = -1;
        else if (t.glowAlpha < 40) t.glowDir = 1;

        t.sizePhase += 0.06;
        let sizePulse = t.sizeOffset * p.sin(t.sizePhase);

        g.push();
        g.translate(t.x, t.y);
        g.rotate(p.radians(t.angle));
        let scaleAmount = 1 + i * 0.3;
        g.textSize((t.baseSize + sizePulse + 12) * scaleAmount);
        g.fill(p.red(colors[i]), p.green(colors[i]), p.blue(colors[i]), t.glowAlpha);
        g.text(t.word, 0, 0);
        g.pop();
      }

      g.filter(p.BLUR, (30 + i * 20) / 5);
      p.image(g, 0, 0);
    }
  };
}, 'sketch-16');
