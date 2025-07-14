new p5((p) => {
  let shapes = [];
  let colors;
  let letters = ['Ў', 'Ё'];

  p.setup = function() {
    let container = p.select('#sketch-13');
    let w = container.width;
    let h = container.height;

    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-13');

    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();
    p.textFont('monospace');
    p.textAlign(p.CENTER, p.CENTER);

    colors = [
      p.color(260, 60, 85),
      p.color(190, 70, 90),
      p.color(340, 65, 90)
    ];

    let cols = 5;
    let rows = 3;
    let spacingX = p.width / cols;
    let spacingY = p.height / rows;
    let size = spacingX * 0.7;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let px = spacingX * (x + 0.5);
        let py = spacingY * (y + 0.5);
        let idx = x + y * cols;
        shapes.push({
          x: px,
          y: py,
          baseY: py,
          size: size,
          colorIndex: idx % colors.length,
          letter: letters[idx % letters.length],
          pulsePhase: p.random(p.TWO_PI),
          floatAmplitude: p.random(10, 20),
          floatSpeed: p.random(0.01, 0.03),
          blinkPhase: p.random(p.TWO_PI)
        });
      }
    }
  };

  p.draw = function() {
    p.background(240, 20, 15);

    for (let s of shapes) {
      let floatOffset = p.sin(p.frameCount * s.floatSpeed + s.pulsePhase) * s.floatAmplitude;
      let blinkAlpha = p.map(p.sin(p.frameCount * 0.1 + s.blinkPhase), -1, 1, 50, 100);

      p.fill(p.hue(colors[s.colorIndex]), p.saturation(colors[s.colorIndex]), p.brightness(colors[s.colorIndex]), blinkAlpha);

      let gfx = p.createGraphics(s.size * 1.2, s.size * 1.2);
      gfx.pixelDensity(1);
      gfx.textFont('monospace');
      gfx.textAlign(p.CENTER, p.CENTER);
      gfx.textSize(s.size);
      gfx.fill(255);
      gfx.noStroke();
      gfx.background(0, 0, 0, 0);
      gfx.text(s.letter, gfx.width / 2, gfx.height / 2);

      let step = 8;
      for (let y = 0; y < gfx.height; y += step) {
        for (let x = 0; x < gfx.width; x += step) {
          let c = gfx.get(x, y);
          if (c[3] > 128) {
            p.ellipse(
              s.x + x - gfx.width / 2,
              s.baseY + y - gfx.height / 2 + floatOffset,
              1.5,
              1.5
            );
          }
        }
      }
    }
  };
}, 'sketch-13');
