const board = document.getElementById("container");
const tile = document.getElementById("tile");
const announcer = document.getElementById("announcer");
const announceWinner = document.getElementById("announce-winner");
const reset = document.getElementById("reset");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const tiles = document.querySelectorAll(".tile");
let playerX = true;
let drawCounter = 0;

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

// code for board tiles
function tilesClickListeners() {
  const handleClick = (e) => {
    if (e.target.innerText != "") {
      return e.preventDefault();
    }
    console.log(e.target.innerText != "");
    const mark = playerX ? "x" : "o";
    e.target.innerText = mark;
    e.target.classList.add(mark);
    playerX = !playerX;
    const winner = checkWinner(mark);
    console.log(winner);
  };
  tiles.forEach((tile) => {
    tile.addEventListener("click", handleClick);
  });
}

tilesClickListeners();

function checkWinner(mark) {
  drawCounter = 0;
  for (let i = 0; i < tiles.length; i++) {
    // loop over tile elements

    for (let j = 0; j < winningConditions.length; j++) {
      //loop over winning conditions ALL
      for (let k = 0; k < winningConditions[j].length; k++) {
        // loop over winning conditions individual
        const tile1 = tiles[winningConditions[j][0]].classList;
        const tile2 = tiles[winningConditions[j][1]].classList;
        const tile3 = tiles[winningConditions[j][2]].classList;

        if (
          tile1.contains(mark) &&
          tile2.contains(mark) &&
          tile3.contains(mark)
        ) {
          return `${mark} is the winner`;
        }
      }
    }

    let tileClass = tiles[i].classList;
    if (tileClass.contains("x") || tileClass.contains("o")) {
      drawCounter++;
    }
  }
  if (drawCounter == 9) {
    return `its a tie`;
  }
}
