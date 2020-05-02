const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

let isGameOver = false;

let cols = 10;
let rows = 10;

let grid = new Array(cols);


function init_grid() {
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j);
            grid[i][j].show();
        }
    }
}

function place_bombs() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let r = getRandomInt(0, 100);
            if (r < 40) {
                grid[i][j].isBomb = true;
            }
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].checkPoints();
        }
    }
}


function drawGame() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].isClicked == false) {
                grid[i][j].fillColor = "#e36f6f";
            }
            if (grid[i][j].isBomb) {
                grid[i][j].fillColor = "purple";
            }
            grid[i][j].show();
            grid[i][j].showPoints();
        }
    }
    isGameOver = true;
}

init_grid();
place_bombs();
drawGame();


canvas.addEventListener("mousedown", function (e) {
    if (isGameOver == false) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j].x * (width / cols) < e.pageX && grid[i][j].x * (width / cols) + (width / cols) > e.pageX) {
                    if (grid[i][j].y * (height / rows) < e.pageY && grid[i][j].y * (height / rows) + (height / rows) > e.pageY) {
                        grid[i][j].isClicked = true;
                        grid[i][j].fillColor = "gray";

                        if (grid[i][j].isBomb) {
                            gameOver();
                            return;
                        }

                        if (grid[i][j].points == 0) {
                            // als alles eromheen gekleurd mag worden.
                            grid[i][j].clickNeightbors();
                        }
                    }
                }
            }
        }
        drawGame();
    }
});