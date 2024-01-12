const X_CLASS="x"
const CIRCLE_CLASS="circle"
const cellElements=document.querySelectorAll('[data-box]')
const board=document.getElementById('board')
const winningMessageElement=document.getElementById('winningMessage')
const restartButton=document.getElementById('restratButton')
const newGameBtn=document.getElementById('newGame')
var playerx=0;
var playero=0;
const playerXSpan = document.querySelector('#playerx span');
const playerOSpan = document.querySelector('#playero span');
const WINNING_COMBINATIONS=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click',startGame)
newGameBtn.addEventListener('click',newGame)
function newGame(){
  playerx=0
  playero=0
  playerXSpan.textContent = playerx;
  playerOSpan.textContent = playero;
  circleTurn=false
  cellElements.forEach(box=> {
    box.classList.remove(X_CLASS)
    box.classList.remove(CIRCLE_CLASS)
    box.removeEventListener('click',handleClick)
    box.addEventListener('click', handleClick, {once:true})
    winningMessageElement.classList.remove('show')
  })
  setBoardHover()
}
function startGame(){
  circleTurn=false
  cellElements.forEach(box=> {
    box.classList.remove(X_CLASS)
    box.classList.remove(CIRCLE_CLASS)
    box.removeEventListener('click',handleClick)
    box.addEventListener('click', handleClick, {once:true})
    winningMessageElement.classList.remove('show')
  })
  setBoardHover()
}

function handleClick(e){
  const box=e.target
  const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS
  placeMarker(box,currentClass)
  if(checkWin(currentClass)){
    endGame(false)
  }else if (isDraw()){
    endGame(true)
  }else{
    switchTurns()
    setBoardHover()
  }
  
}
function placeMarker(box,currentClass){
  box.classList.add(currentClass)
}
function switchTurns(){
  circleTurn=!circleTurn
}
function setBoardHover(){
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if(circleTurn){
    board.classList.add(CIRCLE_CLASS)
  }else{
    board.classList.add(X_CLASS)
  }
}
function checkWin(currentClass){
  return WINNING_COMBINATIONS.some(combination=>{
    return combination.every(index=>{
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
function isDraw(){
  return [...cellElements].every(box=>{
    return box.classList.contains(X_CLASS)||box.classList.contains(CIRCLE_CLASS)
  })
}

function endGame(draw){
  if (draw){
    winningMessageTextElement.innerText='Draw!'
  }else{
    winningMessageTextElement.innerText=`${circleTurn? "O's":"X's"} Wins!`
    if(circleTurn){
      playero++
      playerOSpan.textContent = playero;
    
    }else{
      playerx++
      playerXSpan.textContent = playerx;
    }
  }
  winningMessageElement.classList.add('show')
}