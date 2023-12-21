const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 

// function to initialise the game
function initGame(){
    // initialize the default value of currentPlayer
    currentPlayer="X";
    // creating empty gameGrid
    gameGrid=["","","","","","","","",""];
    // empty the ui of the boxes
    boxes.forEach((box)=>{
        box.innerText="";
        // pointer-Event will tell wheather the element will react to the click events or not 
        box.style.pointerEvents="auto";
        box.classList.remove("win");
    }); 
    // set the up of the gameInfo
    gameInfo.textContent=`Current Player - ${currentPlayer}`;
}
 
initGame();

function handleClick(index){
    if(gameGrid[index]===""){
        // updating the grid 
        gameGrid[index]=currentPlayer;
        // upodating the UI 
        boxes[index].innerText=currentPlayer;
        // cursor not to change 
        boxes[index].style.pointerEvents="none";
        // swaping the value of current Player 
        if(currentPlayer==="X"){
            currentPlayer="O";
        }        
        else{
            currentPlayer="X";
        }
        gameInfo.innerText=`Current Player - ${currentPlayer}`;
        // checking if game is over or not 
        checkGameOver();
    }
}

function checkGameOver(){
    let ans="";
    // go to every winning position and check if either of them is true or not 
    winningPositions.forEach((pos)=>{
        if((gameGrid[pos[0]]!=="" && gameGrid[pos[1]]!=="" && gameGrid[pos[2]]!=="")
            && (gameGrid[pos[0]] ===  gameGrid[pos[1]]) && (gameGrid[pos[1]]=== gameGrid[pos[2]])
        ){
            if(gameGrid[pos[0]]==="X"){
                ans="X";
            }
            else{
                ans="O";
            }
            gameEnd();
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });
    if(ans!==""){
        gameInfo.innerText=`Winner Player - ${ans}`;
    }
    let emptyCount=0;
    gameGrid.forEach((ele)=>{
        if(ele==="") emptyCount++;
    });
    if(emptyCount==0){
        gameInfo.innerText=`Tie`;
        gameEnd();
    }
}

function gameEnd(){
    boxes.forEach((box)=>{
        box.style.pointerEvents="none";
    });
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);





