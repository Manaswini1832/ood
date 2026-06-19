var GameState;
(function (GameState) {
    GameState[GameState["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    GameState[GameState["WON"] = 1] = "WON";
    GameState[GameState["DRAW"] = 2] = "DRAW";
})(GameState || (GameState = {}));
var GameSymbol;
(function (GameSymbol) {
    GameSymbol[GameSymbol["X"] = 0] = "X";
    GameSymbol[GameSymbol["O"] = 1] = "O";
    GameSymbol[GameSymbol["N"] = 2] = "N";
})(GameSymbol || (GameSymbol = {})); //N represents None
var Cell = /** @class */ (function () {
    function Cell(row, col) {
        this.gameSymbol = GameSymbol.N;
        this.row = row;
        this.col = col;
    }
    Cell.prototype.mark = function (newSymbol) {
        this.gameSymbol = newSymbol;
    };
    Cell.prototype.display = function () {
        if (this.gameSymbol === GameSymbol.X) {
            return "X";
        }
        else if (this.gameSymbol === GameSymbol.O) {
            return "O";
        }
        else {
            return "-";
        }
    };
    return Cell;
}());
var Board = /** @class */ (function () {
    function Board() {
        this.cells = [];
        for (var row = 0; row < 3; row++) {
            var thisRow = [];
            for (var idx = 0; idx < 3; idx++) {
                thisRow.push(new Cell(row, idx));
            }
            this.cells.push(thisRow);
        }
    }
    Board.prototype.displayBoard = function () {
        for (var row = 0; row < 3; row++) {
            console.log(this.cells[row][0].display() +
                "," +
                this.cells[row][1].display() +
                "," +
                this.cells[row][2].display());
        }
    };
    return Board;
}());
var board = new Board();
board.displayBoard();
