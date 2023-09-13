/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */

function checkForBingo(bingoCard, drawnNumbers) {
  // this code for debug purposes, you can remove.
  console.log("Drawn Numbers: " + JSON.stringify(drawnNumbers));

  // save matching card number positions
  let matchedCardPositions = [];
  for (let i = 0, len = bingoCard.length; i < len; i++) {
    let row = Math.floor(i / 5);
    let col = i % 5;
    // console.log(`${row},${col}: ${bingoCard[i]}`);
    // always add FREE space
    if (i === 12) {
      matchedCardPositions.push([row, col]);
    }
    // add matching card positions
    if (drawnNumbers.includes(bingoCard[i])) {
      matchedCardPositions.push([row, col]);
    }
  }

  // check if there are at least 5 matched positions
  if (matchedCardPositions.length < 5) {
    return false;
  }
  // check if bingo for row, all positions have same row
  if (
    checkRow(matchedCardPositions) ||
    checkColumn(matchedCardPositions) ||
    checkDiagonal(matchedCardPositions)
  ) {
    return true;
  }

  return false;
}

function checkRow(matchedCardPositions) {
  let rowPositions = {};
  for (const pos of matchedCardPositions) {
    if (rowPositions[pos[0]]) {
      rowPositions[pos[0]]++;
    } else {
      rowPositions[pos[0]] = 1;
    }
  }
  for (const row in rowPositions) {
    if (rowPositions[row] === 5) {
      return true;
    }
  }
  return false;
}

function checkColumn(matchedCardPositions) {
  let colPositions = {};
  for (const pos of matchedCardPositions) {
    if (colPositions[pos[1]]) {
      colPositions[pos[1]]++;
    } else {
      colPositions[pos[1]] = 1;
    }
  }
  for (const col in colPositions) {
    if (colPositions[col] === 5) {
      return true;
    }
  }
  return false;
}

function checkDiagonal(matchedCardPositions) {
  let bingoCount = 0;
  // check for matches in diagonal positions
  for (let i = 0; i < matchedCardPositions.length; i++) {
    // the row or column position would be the same or the sum of the row and column position would be 5 (the length of the row/column)
    if (
      matchedCardPositions[i][0] === matchedCardPositions[i][1] ||
      matchedCardPositions[i][0] + matchedCardPositions[i][1] + 1 === 5 // we add 1 to the sum because the row and column positions start at 0
    ) {
      bingoCount++;
    }
  }
  return bingoCount === 5 ? true : false;
}

module.exports = checkForBingo;

// here are some samples

// this should return true with diagonal + free
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      "FREE",
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [8, 24, 53, 72]
  )
);

// this should return false
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      "FREE",
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [1, 33, 53, 65, 29, 75]
  )
);

// ADDITIONAL TESTS
// this should return true, row - assuming more than 5 numbers are drawn
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      "FREE",
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [13, 24, 44, 48, 67, 8]
  )
);

// this should return true, column - assuming more than 5 numbers are drawn
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      "FREE",
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [54, 48, 59, 53, 46, 19]
  )
);

// this should return true with diagonal + free - assuming more than 5 numbers are drawn
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      "FREE",
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [8, 24, 53, 72, 54]
  )
);

// this should return false,  assuming more than 5 numbers are drawn
console.log(
  checkForBingo(
    [
      8,
      29,
      35,
      54,
      65,
      13,
      24,
      44,
      48,
      67,
      9,
      21,
      "FREE",
      59,
      63,
      7,
      19,
      34,
      53,
      61,
      1,
      20,
      33,
      46,
      72,
    ],
    [54, 48, 33, 1, 46, 19]
  )
);
