const sketch10 = (p) => {
  let cols, rows;
  let spacing = 30;
  let phaseOffsets = [];
  let letters = ['А','Б','В','Г','Д','Е','Ё','Ж','З','І','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ў','Ф','Х','Ц','Ч','Ш','Ы','Ь','Э','Ю','Я'];

  p.setup = () => {
    const container = document.getElementById('sketch-10');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    p.createCanvas(w, h).parent(container);
    cols = Math.floor(p.width / spacing);
    rows = Math.floor(p.height / spacing);

    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('monospace');
    p.noFill();
    p.stroke(255);
    p.strokeWeight(1.2);

    for (let i = 0; i < cols * rows; i++) {
      phaseOffsets[i] = p.random(p.TWO_PI);
    }
  };

  p.draw = () => {
    p.background(15, 15, 25, 40);
    p.translate(spacing / 2, spacing / 2);
    p.fill(255);
    p.noStroke();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let px = x * spacing;
        let py = y * spacing;

        let offset = phaseOffsets[index];
        let wave = p.sin(p.frameCount * 0.05 + offset) * 8;

        let letter = letters[(x + y) % letters.length];
        p.textSize(8 + wave);
        p.text(letter, px, py);
      }
    }
  };
};

new p5(sketch10);
