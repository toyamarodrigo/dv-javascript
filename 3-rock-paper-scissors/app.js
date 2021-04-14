const playerChoiceElement = document.getElementById('playerChoice');
const computerChoiceElement = document.getElementById('computerChoice');

const resultElement = document.getElementById('result');
const counterElement = document.getElementById('counter');
const numCounterElement = document.getElementById('num-counter');
const finalResultElement = document.getElementById('final-result');

const buttons = document.querySelectorAll('button');

// Variables contador
var wonCounter = 0;
var lostCounter = 0;

buttons.forEach((button) => button.addEventListener('click', startGame));

function startGame(event) {
  finalResultElement.textContent = '';

  // Obtener elección del jugador
  const button = event.currentTarget;
  const playerChoice = button.dataset.choice;

  // Obtener elección de la computadora
  const computerChoice = getComputerChoice();

  // Calcular ganador
  const winner = setWinner(playerChoice, computerChoice);

  // Mostrar resultado
  playerChoiceElement.setAttribute('src', `images/${playerChoice}.png`);
  computerChoiceElement.setAttribute('src', `images/${computerChoice}.png`);

  // You won N times. You lost N times
  resultElement.textContent = `You ${winner} with ${playerChoice} against ${computerChoice}`;
  counterElement.textContent = `You won ${wonCounter} times. You lost ${lostCounter} times`;
  numCounterElement.textContent = `${wonCounter} - ${lostCounter}`;
  finalResultElement.style.background = 'transparent';

  // Ganador / Perdedor
  if (wonCounter === 3) {
    modalResult('WON');
    resetGame();
  } else if (lostCounter === 3) {
    modalResult('LOST');
    resetGame();
  }
}

const possibleChoices = ['rock', 'paper', 'scissor'];

function getComputerChoice() {
  // Obtener un valor aleatorio
  const computerChoice = Math.floor(Math.random() * 3);

  // Retornar elección
  return possibleChoices[computerChoice];
}

// Antes: isPlayerWinner
function setWinner(playerChoice, computerChoice) {
  if (
    (playerChoice === 'rock' && computerChoice === 'scissor') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissor' && computerChoice === 'paper')
  ) {
    wonCounter++;
    return 'WON';
  } else if (playerChoice === computerChoice) {
    return 'DRAW';
  } else {
    lostCounter++;
    return 'LOST';
  }
}

// Funcion reseteo
function resetGame() {
  wonCounter = 0;
  lostCounter = 0;
  startGame;
}

function modalResult(result) {
  if (result !== 'LOST') {
    emoji = '😁';
    backColor = 'green';
    fontColor = 'white';
  } else {
    emoji = '😭';
    backColor = 'red';
    fontColor = 'black';
  }
  finalResultElement.style.transition = 'all 0.5s';
  finalResultElement.textContent = `${emoji} You ${result} ${emoji}`;
  finalResultElement.style.backgroundColor = `${backColor}`;
  finalResultElement.style.color = `${fontColor}`;
  finalResultElement.style.padding = '40px';
  finalResultElement.style.borderRadius = '5px';
}
