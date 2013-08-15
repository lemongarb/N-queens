// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.findPossibleBoards = function(n, row, board) {
  row = row || 0;
  board = board || new Board({'n': n});
  var possibleBoards = [];

  for (var col = 0; col < n; col++) {
    var boardCopy = {};
    $.extend(true, boardCopy, board);
    boardCopy.attributes[row][col] = 1;
    if (row === (n - 1)) {
      possibleBoards.push(boardCopy);
    } else {
      possibleBoards = possibleBoards.concat(findPossibleBoards(n, row + 1, boardCopy));
    }
  }

  return possibleBoards;
}

window.countNRooksSolutions = function(n){
  var possibleBoards = findPossibleBoards(n);
  var solutions = [];
  _.each(possibleBoards, function(board) {
    if (!board.hasAnyRooksConflicts()) {
      solutions.push(board);
    }
  })
  return n === 0 ? 1 : solutions.length;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
