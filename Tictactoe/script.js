//gets the container of the tiles in HTML
const board = document.getElementById("container");
//gets the div of each tile in HTML
const tile = document.getElementById("tile");
//gets the winner announcer container in HTML
const announcer = document.getElementById("announcer");
// gets the winner announcer div in HTML
const announceWinner = document.getElementById("announce-winner");
// gets the value of reset button in HTML
const reset = document.getElementById("reset");
// gets the value of next button in HTML
const next = document.getElementById("next");
//gets the value of previous button in HTML
const previous = document.getElementById("previous");
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

// click listeners for all tiles - if the tile is clicked, value should be added
// handle click - used to check if the element is clicked (e) is the event
// if target is not blank, return e.prevent default - used to avoid duplications
// console.log - logs the
function tilesClickListeners() {
  const handleClick = (e) => {
    if (e.target.innerText != "") {
      return e.preventDefault();
    }
    console.log(e.target.innerText != ""); // logs the value of false because value of inner text is not blank
    const mark = playerX ? "x" : "o"; // mark assigns the value of player X to "x" string which will be logged in the box, if not player X it will log "o"
    e.target.innerText = mark; // targets inntertext of the tile div and adds the value 'x' or 'o' respectively
    e.target.classList.add(mark); // adds a classlist of mark to all divs - will assign value to them and will be useful for game history
    playerX = !playerX; // checks if player x is not player x so player o can take a turn
    const winner = checkWinner(mark); // checks if there's a winner based on mark history
    console.log(winner); // logs the winner in the console - update this to reflect in HTML doc
  };
  // adds event listener for EACH tile  (click is the action, handle click runs the code to log items when clicked)
  tiles.forEach((tile) => {
    tile.addEventListener("click", handleClick);
  });
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
          return `${mark} is the winner`;
        }
      }
    }
    //draw counter - checks if there's a tie - counts if there are 9 moves in total and returns a tie if there's no winner
    let tileClass = tiles[i].classList;
    //if statement that adds 1 everytime a value of x and a value of o has been logged
    if (tileClass.contains("x") || tileClass.contains("o")) {
      drawCounter++;
    }
  }
  if (drawCounter == 9) {
    return `its a tie`;
  }
}