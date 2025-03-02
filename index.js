// Game Constants & Variables

let inputDir = {x: 0, y: 0};
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let highScoreBox = document.getElementById('highScoreBox');
let scoreBox = document.getElementById('scoreBox');
let lastPaintTime = 0;
let board = document.getElementById('board');
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}; 

// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
// If you bump into yourself
for (let i = 1; i < snakeArr.length; i++) {
   if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
   return true;
   } 
}
// if you bump into the wall
   if (snake[0].x >=18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0) {
    return true; 
   }  

}

function gameEngine() {

    // PArt 1: Updating the snake array and food 

    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highScoreval) {
            highScoreval = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreval));
            highScoreBox.innerHTML = "HighScore: " + highScoreval;
        }        
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the Snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and food

    // Display the Snake
    
    board.innerHTML = "";
    snakeArr.forEach((e, index)=> {
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;
       if(index == 0) {
        snakeElement.classList.add('head');
       }
       else {
        snakeElement.classList.add('snake');
       }
         board.appendChild(snakeElement);
        });
       // Display the Food

     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);
}

// Main logic starts here

musicSound.play();
let highScore = localStorage.getItem("highScore");
if(highScore === null) {
    highScoreval = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreval))
}
else {
    highScoreval = JSON.parse(highScore);
    highScoreBox.innerHTML = "HighScore: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}    // Starts the Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})