(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      // debugger;
      var thisRow = this.get(rowIndex).slice();
      thisRow.sort().reverse();
      return thisRow[1] ? true : false;
    },

    hasAnyRowConflicts: function(){
      var foundConflict = false;
      for(var i =0; i < this.rows().length; i++){
        this.hasRowConflictAt(i) && (foundConflict = true);
      }
      return foundConflict;
    },

    hasColConflictAt: function(colIndex){
      var columnArray = [];
      for (var i = 0; i < this.rows().length; i++) {
        columnArray.push(this.get(i)[colIndex]);
      }
      columnArray.sort().reverse();
      return columnArray[1] ? true : false;
    },

    hasAnyColConflicts: function(){
      var foundConflict = false; 
      for(var i = 0; i < this.rows().length; i++){
        if (this.hasColConflictAt(i)) {
          foundConflict = true;
        }
        // this.hasColConflictAt(i) && (foundConflict = true);
      }
      return foundConflict; 
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var oneCount = 0;
      for(var r = 0; r < this.rows().length; r++){
        !!this.get(r)[majorDiagonalColumnIndexAtFirstRow + r] && oneCount++;
      }
      return oneCount > 1 ? true : false;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var foundConflict = false;
      for(var r = 0; r < this.rows().length; r++){
        this.hasMajorDiagonalConflictAt(r) && (foundConflict = true);
      }
      return foundConflict;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var oneCount = 0;
      for (var r = 0; r < this.rows().length; r++) {
        !!this.get(r)[minorDiagonalColumnIndexAtFirstRow - r] && oneCount++;
      }
      return oneCount > 1 ? true : false;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var foundConflict = false;
      for(var r = 0; r < this.rows().length; r++){
        this.hasMinorDiagonalConflictAt(r) && (foundConflict = true);
      }
      return foundConflict;
    }
  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
