console.log("hello");

// initial direction of snake
let inputDir = {
  x: 0,
  y: 0,
};

// Game constants
let foodSound = new Audio("music/food.mp3");
let gameOverSound = new Audio("music/gameover.mp3");
let moveSound = new Audio("music/move.mp3");
let musicSound = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];
let food = {
  x: 6,
  y: 7,
};

// Game main functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  //   this will run the game
  gameEngine();
}

function isCollide(snake) {
  //   return false;
  //   if snake bumps into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //   if you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //  Part 1 : Updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over, Press any key to play again!");
    //   new game start here
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  //   if you have eaten the food, increase the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    // for setting the hiscore part 2
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //  Part 2 : Display the snake and food
  board.innerHTML = "";
  //   Display the snake
  // this will add squares whenever the snake eats a square
  snakeArr.forEach((e, index) => {
    //   new element
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    // if there is no snake then just add a head
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic
// for setting the hiscore part 1
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //Start the game
  moveSound.play();
  // detect which key is pressed
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      // when you wanna move up direction (vertically upward)
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      // when you wanna move down direction (vertically downward)
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      // when you wanna move left direction (horizontaly left)
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      // when you wanna move right direction (horizontaly right)
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

// for controlling the speed levels
function speedDown() {
  speed--;
  console.log("speed decrease", speed);
}
function speedUp() {
  speed++;
  console.log("speed increase", speed);
}

function reset() {
  scoreBox.innerHTML = "Score: " + 0;
  hiscoreBox.innerHTML = "HiScore: " + 0;
  let rest = localStorage?.clear();
}
