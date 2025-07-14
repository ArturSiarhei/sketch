new p5((p) => {
  let font;
  let grid = [];
  let cols, rows;
  let cellSize = 12;
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&";

  p.preload = function() {
    font = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  };

  p.setup = function() {
    const container = p.select('#sketch-19');
    const w = container.width;
    const h = container.height;
    let canvas = p.createCanvas(w, h);
    canvas.parent('sketch-19');

    p.textFont(font);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(cellSize);
    p.noStroke();
    p.fill(255);
    p.background(0);

    cols = p.floor(p.width / cellSize);
    rows = p.floor(p.height / cellSize);

    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        grid[y][x] = null;
      }
    }
  };

  p.draw = function() {
    p.background(0, 40);

    let cx = p.floor(p.mouseX / cellSize);
    let cy = p.floor(p.mouseY / cellSize);

    for (let y = cy - 2; y <= cy + 2; y++) {
      for (let x = cx - 2; x <= cx + 2; x++) {
        if (x >= 0 && y >= 0 && x < cols && y < rows) {
          if (grid[y][x] === null || p.millis() - grid[y][x].createdTime > 5000) {
            if ((x === cx && y === cy) || hasNeighbor(x, y)) {
              grid[y][x] = createCell(x, y);
            }
          }
        }
      }
    }

    p.fill(255);
    for (let y = rows - 1; y >= 0; y--) {
      for (let x = 0; x < cols; x++) {
        let cell = grid[y][x];
        if (cell) {
          if (p.millis() - cell.createdTime > 3000) {
            cell.vel.y += 0.05;
            cell.pos.add(cell.vel);
          }
          p.text(cell.char, cell.pos.x, cell.pos.y);
        }
      }
    }
  };

  function hasNeighbor(x, y) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!(dx === 0 && dy === 0)) {
          let nx = x + dx;
          let ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
            if (grid[ny][nx] !== null) return true;
          }
        }
      }
    }
    return false;
  }

  function createCell(x, y) {
    return {
      char: p.random(chars),
      pos: p.createVector(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2),
      vel: p.createVector(0, 0),
      createdTime: p.millis()
    };
  }
}, 'sketch-19');
