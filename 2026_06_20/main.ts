enum GameState {
  IN_PROGRESS,
  WON,
  DRAW,
  INVALID,
}

enum GameSymbol {
  X,
  O,
  N,
} //N represents None

interface WinningStrategy {
  checkWinner(b: Board): boolean;
}

class RowWinningStrategy implements WinningStrategy {
  checkWinner(b: Board): boolean {
    if (
      (b.getSymbolInCell(0, 0) != GameSymbol.N &&
        b.getSymbolInCell(0, 0) === b.getSymbolInCell(0, 1) &&
        b.getSymbolInCell(0, 1) === b.getSymbolInCell(0, 2)) ||
      (b.getSymbolInCell(1, 0) != GameSymbol.N &&
        b.getSymbolInCell(1, 0) === b.getSymbolInCell(1, 1) &&
        b.getSymbolInCell(1, 1) === b.getSymbolInCell(1, 2)) ||
      (b.getSymbolInCell(2, 0) != GameSymbol.N &&
        b.getSymbolInCell(2, 0) === b.getSymbolInCell(2, 1) &&
        b.getSymbolInCell(2, 1) === b.getSymbolInCell(2, 2))
    )
      return true;

    return false;
  }
}

class ColumnWinningStrategy implements WinningStrategy {
  checkWinner(b: Board): boolean {
    if (
      (b.getSymbolInCell(0, 0) != GameSymbol.N &&
        b.getSymbolInCell(0, 0) === b.getSymbolInCell(1, 0) &&
        b.getSymbolInCell(1, 0) === b.getSymbolInCell(2, 0)) ||
      (b.getSymbolInCell(0, 1) != GameSymbol.N &&
        b.getSymbolInCell(0, 1) === b.getSymbolInCell(1, 1) &&
        b.getSymbolInCell(1, 1) === b.getSymbolInCell(2, 1)) ||
      (b.getSymbolInCell(0, 2) != GameSymbol.N &&
        b.getSymbolInCell(0, 2) === b.getSymbolInCell(1, 2) &&
        b.getSymbolInCell(1, 2) === b.getSymbolInCell(2, 2))
    )
      return true;

    return false;
  }
}

class DiagonalWinningStrategy implements WinningStrategy {
  checkWinner(b: Board): boolean {
    if (
      (b.getSymbolInCell(0, 0) != GameSymbol.N &&
        b.getSymbolInCell(0, 0) === b.getSymbolInCell(1, 1) &&
        b.getSymbolInCell(1, 1) === b.getSymbolInCell(2, 2)) ||
      (b.getSymbolInCell(0, 2) != GameSymbol.N &&
        b.getSymbolInCell(0, 2) === b.getSymbolInCell(1, 1) &&
        b.getSymbolInCell(1, 1) === b.getSymbolInCell(2, 1))
    )
      return true;

    return false;
  }
}

class Cell {
  private gameSymbol: GameSymbol;
  private row: number;
  private col: number;

  constructor(row: number, col: number) {
    this.gameSymbol = GameSymbol.N;
    this.row = row;
    this.col = col;
  }

  getGameSymbol(): GameSymbol {
    return this.gameSymbol;
  }

  mark(newSymbol: GameSymbol) {
    this.gameSymbol = newSymbol;
  }

  display(): string {
    if (this.gameSymbol === GameSymbol.X) {
      return "X";
    } else if (this.gameSymbol === GameSymbol.O) {
      return "O";
    } else {
      return "-";
    }
  }
}

class Board {
  private cells: Cell[][];
  private strategies: WinningStrategy[];
  private filled: number;

  constructor() {
    this.strategies = [
      new RowWinningStrategy(),
      new ColumnWinningStrategy(),
      new DiagonalWinningStrategy(),
    ];
    this.filled = 0;

    this.cells = [];

    for (let row = 0; row < 3; row++) {
      let thisRow = [];

      for (let idx = 0; idx < 3; idx++) {
        thisRow.push(new Cell(row, idx));
      }

      this.cells.push(thisRow);
    }
  }

  displayBoard() {
    for (let row = 0; row < 3; row++) {
      console.log(
        this.cells[row][0].display() +
          "," +
          this.cells[row][1].display() +
          "," +
          this.cells[row][2].display(),
      );
    }
  }

  getSymbolInCell(row: number, col: number): GameSymbol {
    if (row < 0 || row >= 3 || col < 0 || col >= 3) return GameSymbol.N;

    return this.cells[row][col].getGameSymbol();
  }

  setSymbolInCell(row: number, col: number, symb: GameSymbol) {
    if (row < 0 || row >= 3 || col < 0 || col >= 3) return;

    this.cells[row][col].mark(symb);
    this.filled++;

    return;
  }

  checkMove(): GameState {
    this.strategies.forEach((strategy) => {
      if (strategy.checkWinner(this)) return GameState.WON;
    });

    if (this.filled === 9) return GameState.DRAW;

    return GameState.IN_PROGRESS;
  }
}

class Player {
  private playerSymbol: GameSymbol | undefined;

  setSymbol(symb: GameSymbol) {
    this.playerSymbol = symb;
  }

  getSymbol(): GameSymbol | undefined {
    return this.playerSymbol;
  }
}

class Game {
  private board: Board | undefined;
  private currentPlayer: Player | undefined;
  private player1: Player | undefined;
  private player2: Player | undefined;

  setBoard(board: Board) {
    this.board = board;
  }

  setPlayer1(p1: Player) {
    this.player1 = p1;
    this.currentPlayer = p1;
  }

  setPlayer2(p2: Player) {
    this.player2 = p2;
  }

  whoseTurn(): Player | undefined {
    if (this.player1 === undefined || this.player2 === undefined)
      return undefined;

    if (
      this.currentPlayer === undefined ||
      this.currentPlayer === this.player2
    ) {
      this.currentPlayer = this.player1;
    } else {
      this.currentPlayer = this.player2;
    }

    return this.currentPlayer;
  }

  makeMove(p: Player, cellRow: number, cellCol: number): GameState {
    if (this.board === undefined || p.getSymbol() === undefined)
      return GameState.INVALID;

    if (this.currentPlayer != p) return GameState.IN_PROGRESS;

    if (cellRow < 0 || cellRow >= 3 || cellCol < 0 || cellCol >= 3)
      return GameState.IN_PROGRESS;

    if (this.board.getSymbolInCell(cellRow, cellCol) !== GameSymbol.N)
      return GameState.IN_PROGRESS;
    this.board.setSymbolInCell(cellRow, cellCol, p.getSymbol()!);

    return this.board.checkMove();
  }
}

const board = new Board();
board.displayBoard();

const game = new Game();
game.setBoard(board);
