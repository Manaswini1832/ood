# Requirements

1. Players should be able to view the game board
2. Players should be able to select their choice of cell on their turn
3. Players should be able to see win/draw messages as and when the game progresses

Out of scope

1. Other users can subscribe to a game to get updates of progress of the game
2. Support for multiple grid sizes but 3x3 for this simple design

# Some methods

1. viewBoard()
2. whoseTurn() -> Player whose turn it is now
3. makeMove(Player, Board, Cell) -> GAME STATE(won, draw, in_progress)
4. checkMove() -> GAME STATE

# Core entities

1. Game -> Orchestrator of our tic tac toe game
2. Player : has a symbol associated with them
3. Board : associated with 2 Player objects, int filled = 0
4. Cell
5. Symbol : X, O, -

# Few flows to elaborate

1. viewBoard()
   - Resides inside Board class. Contains 3x3 = 9 Cell objects inside it, each with their index from 1-9 and Symbol:(X,O or -)
   - should print the board in a nice format to screen

2. Game.whoseTurn() -> Player
   - this method is associated to Game not Board. Board should only hold info about what symbol each cell has. Game should be the class that holds info about which player is playing now, is the board in a valid position etc
   - can switch between Board.Player1 and Board.Player2 alternately

3. makeMove(Player p, Board b, cellIndex idx)
   - if Game.whoseTurn != p return saying its not your turn now
   - if b.idx != '-' return since we can't put symbol in an already occupied cell
   - b[idx] = p.symbol
   - return checkMove(b)

4. checkMove(b) -> GameState
   - if any of the following methods return true, return GameState.WON
     - RowWinningStrategy.check()
     - ColumnWinningStrategy.check()
     - DiagonalWinningStrategy.check()
   - else if all squares are b.filled = 9, return GameState.DRAW
   - else return GameState.IN_PROGRESS

# Design patterns

1. Strategy pattern to check for different winning strategies
2. If we had a Bot option, we can have MoveGeneration strategies too : BruteForceMoveGenStrategy, FocusedMoveGenStrategy etc
3. To notify users of updates to games, we can use Pub/Sub pattern
