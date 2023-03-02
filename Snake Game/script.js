// Game Constants & Variables
let inputDir = { x : 0 , y : 0} ;
const foodSound = new Audio('music/food.mp3') ;
const gameOverSound = new Audio('music/gameover.mp3') ;
const moveSound = new Audio('music/move.mp3') ;
const gameSound = new Audio('music/music.mp3') ;
let speed = 10 ;
let score = 0 ;
let lastPaintTime = 0 ;
let snakeArr = [
    {x : 9 , y : 9}
]
let food = {x : 3 , y : 3}

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main) ;
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime ;
    gameEngine() ;
}

function isColloide(snake){
    // if Snake collide with Itself
    for (let i = 1 ; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true ;
        }
    }
    // If you collide with wall
    if(snake[0].x < 0 || snake[0].x > 18 || snake[0].y < 0 || snake[0].y > 18){
        return true ;
    }
}

function gameEngine(){
    // Part 1 : Updating the Snake array and Food
    if(isColloide(snakeArr)){
        gameOverSound.play() ;
        gameSound.pause() ;
        inputDir = { x : 0 , y : 0} ;
        alert("Game Over! Press any key to play again") ;
        snakeArr = [{x : 9 , y : 9}]
        gameSound.play() ;
        score = 0 ;
    }

    // If food has been Eaten and New food Generates
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play() ;
        score++ ;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Highest Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score ;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y}) ;
        food = {x : Math.round(1 + 17*Math.random()) , y : Math.round(1 + 17*Math.random())} ;
    }

    // Movement of Snake
    for (let i = snakeArr.length-2 ; i>=0 ; i--) {
        // (...) is Spread Opertor in JS.
        snakeArr[i+1] = {...snakeArr[i]} ;
    }
    snakeArr[0].x+=inputDir.x ;
    snakeArr[0].y+=inputDir.y ;

    // Part 2 : Display the snake and Food
    // Display the snake
    board.innerHTML = "" ;
    snakeArr.forEach((e,index)=>{
        snakeElement =  document.createElement('div') ;
        snakeElement.style.gridRowStart = e.y ;
        snakeElement.style.gridColumnStart = e.x ;
        board.appendChild(snakeElement) ;
        if(index===0){
            snakeElement.classList.add('head') ;
        }
        else{
            snakeElement.classList.add('snake') ;
        }
    })

    // Display the food
    foodElement =  document.createElement('div') ;
    foodElement.style.gridRowStart = food.y ;
    foodElement.style.gridColumnStart = food.x ;
    foodElement.classList.add('food') ;
    board.appendChild(foodElement) ;
}

// High Score
// To remove Highest Score -> click inspect and go in console and write 'localStorage.clear()' .
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest Score: " + hiscore;
}

// Main Logic
window.requestAnimationFrame(main) ;
window.addEventListener('keydown' , e =>{
    inputDir = {x : 1 , y : 0} ;   //Game Starts
    gameSound.play() ;
    moveSound.play() ;
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp") ;
            inputDir.x = 0 ;
            inputDir.y = -1 ;
            break;
        case "ArrowDown":
            console.log("ArrowDown") ;
            inputDir.x = 0 ;
            inputDir.y = 1 ;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft") ;
            inputDir.x = -1 ;
            inputDir.y = 0 ;
            break;
        case "ArrowRight":
            console.log("ArrowRight") ;
            inputDir.x = 1 ;
            inputDir.y = 0 ;
            break;
    }
})