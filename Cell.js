class Cell {
    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.isBomb = false;
        this.number = 0;

        this.points = 0;

        this.isClicked = false;

        this.fillColor = "white";
    }


    show() {
        let colWidth = width / cols;
        let rowheight = height / rows;

        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = this.fillColor;
        context.fillRect(this.x * colWidth, this.y * rowheight, colWidth, rowheight);
        context.strokeRect(this.x * colWidth, this.y * rowheight, colWidth, rowheight);
        context.stroke();
        context.closePath();

        if (this.isClicked) {
            this.showPoints();
        }
    }

    showPoints() {
        let colWidth = width / cols;
        let rowheight = height / rows;

        context.font = "20px impact";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText(this.points, this.x * colWidth + (colWidth / 2), this.y * rowheight + (rowheight / 2))
    }

    checkPoints() {
        if (this.isBomb) {
            this.points = "";
            return;
        }

        let neighbors = this.getNeightbors();

        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].isBomb) {
                this.points += 1;
            }
        }
    }

    clickNeightbors() {
        for (let x = 0; x < grid[this.x][this.y].getNeightbors().length; x++) {
            if (grid[this.x][this.y].getNeightbors()[x].isClicked) {
                console.log("mijn neightbor is al gedrukt negeer hem!")
            } else {
                grid[this.x][this.y].getNeightbors()[x].isClicked = true;
                grid[this.x][this.y].getNeightbors()[x].fillColor = "gray";


                /*
                * Dit hieronder zorgt voor de error to much recursion.
                * */
                if (grid[this.x][this.y].getNeightbors()[x].points == 0) {
                    grid[this.x][this.y].getNeightbors()[x].clickNeightbors();
                }

                console.log("Neightbor is now clicked");
            }
        }
    }

    getNeightbors() {
        let neighbors = [];

        if (this.x < cols - 1) {
            neighbors.push(grid[this.x + 1][this.y]);
        }
        if (this.x > 0) {
            neighbors.push(grid[this.x - 1][this.y]);
        }
        if (this.y < rows - 1) {
            neighbors.push(grid[this.x][this.y + 1]);
        }
        if (this.y > 0) {
            neighbors.push(grid[this.x][this.y - 1]);
        }
        if (this.y < rows - 1 && this.x < cols - 1) {
            neighbors.push(grid[this.x + 1][this.y + 1]);
        }
        if (this.x > 0 && this.y > 0) {
            neighbors.push(grid[this.x - 1][this.y - 1]);
        }
        if (this.x > 0 && this.y < rows - 1) {
            neighbors.push(grid[this.x - 1][this.y + 1]);
        }
        if (this.x < rows - 1 && this.y > 0) {
            neighbors.push(grid[this.x + 1][this.y - 1]);
        }

        return neighbors;
    }
}