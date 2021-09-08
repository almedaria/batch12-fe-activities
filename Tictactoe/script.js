//gets the container of the tiles in HTML
const board = document.getElementById("container");
//gets the entire board
const tictactoe = document.getElementById("board");
//gets the div of each tile in HTML
const tile = document.getElementById("tile");
//gets the winner announcer container in HTML
const announcer = document.getElementById("announcer");
// gets the winner announcer div in HTML
const announceWinner = document.getElementById("announce-winner");
// gets the value of player-turn div
const playerTurn = document.getElementById("player-turn");
// gets the value of reset button in HTML
const resetButton = document.getElementById("reset");
// gets the value of next button in HTML
const nextButton = document.getElementById("next");
//gets the value of previous button in HTML
const previousButton = document.getElementById("previous");
// gets the value of all divs with class tile in HTML - to be used in for Loop
const tiles = document.querySelectorAll(".tile");
// current player display
const playerDisplay = document.querySelector(".display-player");
// states that player x starts the game
let playerX = true;
//checks if there is a winner or if it's a tie - initial state is 0, end state is 9
let drawCounter = 0;
// all possible winning conditions for the game
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let xMark = "X";
let oMark = "O";
let isGameActive = true;
let hasWinner = false;
let storedTilesArray = [];
let currentTileDisplayedIndex = 0;

// Player chooser code - if player chooses an option, the player-choose id will be hidden
let playerChoose = document.getElementById("player-choose");
let oButton = document.getElementById("o");
let xButton = document.getElementById("x");

// click listeners for all tiles - if the tile is clicked, value should be added
// handle click - used to check if the element is clicked (e) is the event
// if target is not blank, return e.prevent default - used to avoid duplications
function tilesClickListeners() {
  const handleClick = (e) => {
    if ((e.target.innerText != "" && isGameActive) || hasWinner) {
      return e.preventDefault();
    }
    console.log(e.target.innerText != ""); // logs the value of false because value of inner text is not blank
    const mark = playerX ? xMark : oMark; // mark assigns the value of player X to "x" string which will be logged in the box, if not player X it will log "o"
    e.target.classList.remove(xMark);
    e.target.classList.remove(oMark);
    e.target.innerText = mark; // targets inntertext of the tile div and adds the value 'x' or 'o' respectively
    e.target.classList.add(mark); // adds a classlist of mark to all divs - will assign value to them and will be useful for game history
    playerX = !playerX; // checks if player x is not player x so player o can take a turn
    const winner = checkWinner(mark); // checks if there's a winner based on mark history
    console.log(winner); // logs the winner in the console - update this to reflect in HTML doc
    // let currentPlayer = document.getElementById("currentPlayer");
    // currentPlayer.innerText = mark;
    turnCheck();
  };
  // adds event listener for EACH tile  (click is the action, handle click runs the code to log items when clicked)
  tiles.forEach((tile) => {
    tile.addEventListener("click", handleClick);
  });
}

function turnCheck() {
  if (playerX) {
    currentPlayer.innerText = xMark;
  } else {
    currentPlayer.innerText = oMark;
  }
}

tilesClickListeners(); // runs the function tilesClickListeners

//function to check winner - using mark to call game history
// draw counter is = 0 at the start of the game
function checkWinner(mark) {
  drawCounter = 0;
  // loops over tile elements - continues loop if i is lessthan the length of tiles (9)
  for (let i = 0; i < tiles.length; i++) {
    //loops over loop over all the winning conditons - per array (j)
    for (let j = 0; j < winningConditions.length; j++) {
      // loops over individual winning conditions - per array per tile - starts with index 0
      for (let k = 0; k < winningConditions[j].length; k++) {
        const tile1 = tiles[winningConditions[j][0]].classList;
        const tile2 = tiles[winningConditions[j][1]].classList;
        const tile3 = tiles[winningConditions[j][2]].classList;
        // if statement to check if there's a winner - if there's a match with 'mark', it should return (mark) is the winner
        if (
          tile1.contains(mark) &&
          tile2.contains(mark) &&
          tile3.contains(mark)
        ) {
          //return `${mark} is the winner`;
          isGameActive = false;
          hasWinner = true;
          announceWinner.innerText = `${mark} is the winner`;
          announceWinner.style.color = "#ffffff";
          announceWinner.style.textAlign = "center";
          announceWinner.style.paddingTop = "10px";
        }
      }
    }

    //draw counter - checks if there's a tie - counts if there are 9 moves in total and returns a tie if there's no winner
    let tileClass = tiles[i].classList;
    //if statement that adds 1 everytime a value of x and a value of o has been logged
    if (tileClass.contains(xMark) || tileClass.contains(oMark)) {
      drawCounter++;
    }
  }
  //return `its a tie` if there's no winner and draw counter reaches 9
  if (drawCounter == 9 && hasWinner == false) {
    announceWinner.innerText = "it's a tie";
    announceWinner.style.color = "#ffffff";
    announceWinner.style.textAlign = "center";
    announceWinner.style.paddingTop = "10px";
    storeTiles();
  }
  if (hasWinner) {
    storeTiles();
  }
}

// get the tiles after game is over and store in storedTilesArray
function storeTiles() {
  let tileRecord = [];
  tiles.forEach((tile) => {
    tileRecord.push(tile.innerText);
  });
  storedTilesArray.push(tileRecord);
  currentTileDisplayedIndex++;
  showNavigationButtons();
}

function showNavigationButtons() {
  nextButton.classList.remove("hide");
  previousButton.classList.remove("hide");
}
//resets the board back to original state
const resetBoard = () => {
  let currentPlayer = document.getElementById("currentPlayer");
  playerX = true;
  hasWinner = false;
  isGameActive = true;
  announceWinner.innerText = "";

  playerTurn.classList.remove("not-visible");
  playerChoose.classList.remove("hide");
  tictactoe.classList.add("hide");
  nextButton.classList.add("hide");
  previousButton.classList.add("hide");
  //currentPlayer.innerText = xMark;
  // removes the marks on the board
  if (playerX) {
    currentPlayer.innerText = oMark;
  }
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove(xMark);
    tile.classList.remove(oMark);
    drawCounter = 0;
  });
};
// resets the board to original state - no game history
resetButton.addEventListener("click", function () {
  resetBoard();
  storedTilesArray = [];
  currentTileDisplayedIndex = 0;
});

//added function is still not working - does not hide the player-choose statement and does not update the x or o player
function selectPlayerO() {
  playerChoose.classList.add("hide");
  playerX = false;
  currentPlayer.innerText = oMark;
  playerTurn.classList.remove("not-visible");
  tictactoe.classList.remove("hide");
}
oButton.addEventListener("click", selectPlayerO);

function selectPlayerX() {
  playerChoose.classList.add("hide");
  playerX = true;
  currentPlayer.innerText = xMark;
  playerTurn.classList.remove("not-visible");
  tictactoe.classList.remove("hide");
}
xButton.addEventListener("click", selectPlayerX);
// previous button - will show the previous win state of the game
function onPreviousButtonClicked() {
  if (currentTileDisplayedIndex - 1 <= 0) {
    return;
  }
  currentTileDisplayedIndex--;
  fillTiles();
}
previousButton.addEventListener("click", onPreviousButtonClicked);

function onNextButtonClicked() {
  if (currentTileDisplayedIndex < storedTilesArray.length) {
    currentTileDisplayedIndex++;
    fillTiles();
  } else {
    resetBoard();
  }
}
//will add next click listener - next will automatically start a new game
nextButton.addEventListener("click", onNextButtonClicked);

function fillTiles() {
  tiles.forEach((tile, index) => {
    tile.classList.remove(xMark);
    tile.classList.remove(oMark);
    const mark = storedTilesArray[currentTileDisplayedIndex - 1][index];
    tile.innerHTML = mark;
    if (!!mark) {
      // if not empty string, dont add class;
      tile.classList.add(mark);
    }
  });
  playerTurn.classList.add("not-visible");
  announceWinner.innerText = "";
}
