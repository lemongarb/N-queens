// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n , board, row){
  console.log(this);
  if(n === 0) return 1; 
  var solutionCount = 0;
  var row = row || 0;
  var board = board || new Board({n:n});
  console.log("n is: ", n);
  if(row <= n){
    for(var col = 0; col < n; col++){
      // var boardCopy = {}; 
      // // boardCopy = _.extend(boardCopy, board);
      // var boardCopy = new Board(board.attributes);
      var boardArray = [];
      for (var key in board) {
        boardArray.push(key);
      }
      var boardCopy = new Board(boardArray);
      boardCopy.attributes[row][col] = 1;
      this.countNRooksSolutions(n, boardCopy, row+1);
    }
  } else {
    // !board.hasAnyRookConflicts() && solutionCount++;
    if (board.hasAnyRooksConflicts() === false) {
      solutionCount++;
    }
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
