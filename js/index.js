// Game Constants And Variables ...............
let  inputDir = {x: 0, y: 0}; // Snake position (0, 0)
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const gameSound = new Audio('./music/music.mp3');

let speed = 5;
let lastPaintTime = 0;
let score = 0;


// Snake head position (Game start, head ki position)
let snakeArr = [
  {x: 13, y: 15}
];

// Snake Food 
food = {x: 6, y: 7};


// Game Funcitons ...............

function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed)
  {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

// Function --> Snake Collides To Border
function isCollide(snake){
  // 1) Snake Dead : If Collides with itself 
  for(let i=1; i<snake.length; i++)
  {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
    {
      gameSound.pause();
      return true;
    }
  }

  // 2) Snake Dead : If Collides with Border (All 4 Sides)
  if(snake[0].x<=0 ||snake[0].x >=18 || snake[0].y<=0 ||snake[0].y >=18)
  {
    gameSound.pause();
    return true;
  }
}

function gameEngine(){

  // Part 1: Updating the snake array
  if(isCollide(snakeArr))
  {
    gameOverSound.play();
    gameSound.pause();
    inputDir = {x: 0, y: 0};
    alert("Game-Over. Press Any Key To Play Again !");
    snakeArr = [{x: 13, y:15}];
    score = 0;

  }

  // Snake After Eating .......
  // 1) Increase Score 
  // 2) Regenerate Food
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
  {
    foodSound.play();
    score+=1;
    if(score>hiscoreval)
    {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      highscorebox.innerHTML = "Record : "+ hiscoreval;
    }
    scoreboard.innerHTML = "SCORE : " + score;
    snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x:Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
  }

  // Moving The Snake 
  for(let i=snakeArr.length-2; i>=0; i--)
  {
    snakeArr[i+1] = {...snakeArr[i]};

  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  

  // Part 2: Display The Snake And Food.......
  // Display Snake...
  board.innerHTML = "";
  snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0)
    {
      snakeElement.classList.add('head');
    }
    else
    {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);

  })

  // Display Food....
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);



}













// Main Logic Starts Here .............

// Highest Score Display
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else
{
  hiscoreval = JSON.parse(hiscore);
  highscorebox.innerHTML = "Record : "+ hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
  inputDir = {x: 0, y: 1}; // Start Game 
  gameSound.play();
  moveSound.play();
  // Identifying the key 
  switch(e.key){
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x =  0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y =  0;
      break;

      // Pending
      // Pause and Continue

    default:
      break;
  }
});