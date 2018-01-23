function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function Pressed() {
  if(go) {
    go = false;
    btn.html("Start");
  } else {
    go = true;
    btn.html("Stop");
  }
}

function cellPressed(i, j) {
  if(mouseY > j * resolution && mouseY < (j + 1) * resolution && mouseX > i * resolution && mouseX < (i + 1) * resolution) {
    console.log("Changed cell: " + i + ", " + j);
    return true;
  }
  return false;
}

function Reset() {
  go = false;
  btn.html("Start");
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
}


let cnv, btn, rst;
let grid, next;
let cols, rows;
let resolution;
var go;

function setup() {
  //DOOM elements
  cnv = createCanvas(400, 400);
  cnv.parent('canvas_holder');
  btn = select('#start');
  rst = select('#reset');
  //Game_of_life
  resolution = 8;
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  //Controls of the game
  go = false;
  btn.mousePressed(Pressed);
  rst.mousePressed(Reset);
}

function draw() {
  //Draw the cells
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      stroke(210);
      strokeWeight(1);
      fill(255);
      if(grid[i][j]) {
        fill(0);
      }
      rect(i * resolution, j * resolution, resolution-1, resolution-1);
    }
  }
  if(go) {
    //Start the simulation
    next = make2DArray(cols, rows);
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        let s = countNeighbors(grid, i, j);
        //console.log(s);
        if(grid[i][j] == 0 && s == 3) {
          next[i][j] = 1;
        } else if(grid[i][j] == 1 &&  (s < 2 || s > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = grid[i][j];
        }
      }
    }
    grid = next;
  }
}

function mousePressed() {
  if(!go) {
    //We can manipulate the grid
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        if(cellPressed(i, j)) {
          grid[i][j] = (grid[i][j]==1) ? 0:1;
          //console.log("Changed");
        }
      }
    }
  }
}

function countNeighbors(grid, x , y) {
  let s = 0;
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      let col = (i + x + cols) % cols;
      let row = (j + y + rows) % rows;
      s += grid[col][row];
    }
  }
  s -= grid[x][y];
  return s;
}
