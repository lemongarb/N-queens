// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var possibleBoards = findPossibleBoards(n);
  var result;
  for (var i = 0; i < possibleBoards.length; i++) {
    if (!possibleBoards[i].hasAnyRooksConflicts()) {
      result = possibleBoards[i];
      break;
    }
  }
  return result;
};

window.findPossibleBoards = function(n, row, board, columnConflicts) {
  row = row || 0;
  board = board || new Board({'n': n});
  var possibleBoards = [];
  columnConflicts = columnConflicts || [];

  for (var col = 0; col < n; col++) {
    debugger;
    if(columnConflicts[col] !== 1){
      var boardCopy = new Board({'n': n});
      for (var i = 0; i < n; i++) {
        boardCopy.attributes[i] = board.attributes[i].slice();
      }
      boardCopy.attributes[row][col] = 1;
      var columnConflictsCopy = columnConflicts.slice();
      columnConflictsCopy[col] = 1;
    if (row === (n - 1)) {
      possibleBoards.push(boardCopy);
    } else {
      possibleBoards = possibleBoards.concat(findPossibleBoards(n, row + 1, boardCopy, columnConflictsCopy));
    }
    }
  }

  return possibleBoards;
};


window.countNRooksSolutions = function(n){
  var possibleBoards = findPossibleBoards(n);
  var solutions = [];
  _.each(possibleBoards, function(board) {
    if (!board.hasAnyRooksConflicts()) {
      solutions.push(board);
    }
  });
  return n === 0 ? 1 : solutions.length;
};

window.findNQueensSolution = function(n){
  var possibleBoards = findPossibleBoards(n);
  var result;
  for (var i = 0; i < possibleBoards.length; i++) {
    if (!possibleBoards[i].hasAnyQueensConflicts()) {
      result = possibleBoards[i];
      break;
    }
  }
  return result;
};

window.countNQueensSolutions = function(n){
  var possibleBoards = findPossibleBoards(n);
  var solutions = [];
  _.each(possibleBoards, function(board) {
    if (!board.hasAnyQueensConflicts()) {
      console.log(board);
      solutions.push(board);
    }
  });
  return n === 0 ? 1 : solutions.length;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
