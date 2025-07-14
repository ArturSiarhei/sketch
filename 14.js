const sketch14 = (p) => {
  let symbolSize = 20;
  let columns;
  let streams = [];

  p.setup = () => {
    const container = document.getElementById('sketch-14');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    p.background(0);
    columns = Math.floor(w / symbolSize);
    p.textSize(symbolSize);
    p.textFont('monospace');
    p.noStroke();

    for (let i = 0; i < columns; i++) {
      streams[i] = {
        x: i * symbolSize,
        y: p.random(-1000, 0),
        speed: p.random(4, 10),
        length: Math.floor(p.random(10, 30)),
        symbols: []
      };
      for (let j = 0; j < streams[i].length; j++) {
        streams[i].symbols[j] = randomChar();
      }
    }
  };

  p.draw = () => {
    p.background(0, 150);

    streams.forEach(stream => {
      for (let i = 0; i < stream.length; i++) {
        let alpha = p.map(i, 0, stream.length, 255, 0);
        if (i === 0) {
          let glow = p.map(Math.sin(p.frameCount * 0.1), -1, 1, 150, 220);
          p.fill(140, glow, 140, alpha);
          p.stroke(140, glow, 140, alpha);
          p.strokeWeight(1.5);
          p.textSize(symbolSize * 1.2);
        } else {
          p.fill(0, 255, 70, alpha);
          p.noStroke();
          p.textSize(symbolSize);
        }
        p.text(stream.symbols[i], stream.x, stream.y - i * symbolSize);
      }
      stream.y += stream.speed;

      for (let i = 0; i < stream.length; i++) {
        let chance = p.map(i, 0, stream.length, 0.01, 0.2);
        if (p.random() < chance) {
          stream.symbols[i] = randomChar();
        }
      }

      if (stream.y > p.height + stream.length * symbolSize) {
        stream.y = p.random(-1000, 0);
        stream.speed = p.random(4, 10);
        stream.length = Math.floor(p.random(10, 30));
        stream.symbols = [];
        for (let j = 0; j < stream.length; j++) {
          stream.symbols[j] = randomChar();
        }
      }
    });
  };

  function randomChar() {
    const chars = 'アァカサタナハマヤャラワン0123456789abcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(p.random(chars.length)));
  }
};

new p5(sketch14);
