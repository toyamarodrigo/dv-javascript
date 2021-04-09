const playerChoiceElement = document.getElementById('playerChoice');
const computerChoiceElement = document.getElementById('computerChoice');

const resultElement = document.getElementById('result');
const counterElement = document.getElementById('counter');
const numCounterElement = document.getElementById('num-counter');

const buttons = document.querySelectorAll('button');

var wonCounter = 0;
var lostCounter = 0;

buttons.forEach((button) => button.addEventListener('click', startGame));

function startGame(event) {
  // Obtener elección del jugador
  const button = event.currentTarget;
  const playerChoice = button.dataset.choice;

  // Obtener elección de la computadora
  const computerChoice = getComputerChoice();

  // Calcular ganador
  const winner = setWinner(playerChoice, computerChoice);

  if (winner === 'WON') {
    wonCounter++;
  } else if (winner === 'LOST') {
    lostCounter++;
  }

  // Mostrar resultado
  playerChoiceElement.setAttribute('src', `imgs/${playerChoice}.png`);
  computerChoiceElement.setAttribute('src', `imgs/${computerChoice}.png`);

  // You won N times. You lost N times
  counterElement.textContent = `You won ${wonCounter} times. You lost ${lostCounter} times`;
  resultElement.textContent = `You ${winner} with ${playerChoice} against ${computerChoice}`;
  numCounterElement.textContent = `${wonCounter} - ${lostCounter}`;

  if (wonCounter === 3) {
    numCounterElement.textContent = `You WON :D ${wonCounter} - ${lostCounter}`;
    resetGame();
  } else if (lostCounter === 3) {
    numCounterElement.textContent = `You LOST :( ${lostCounter} - ${wonCounter}`;
    resetGame();
  }
}

const possibleChoices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  // Obtener un valor aleatorio
  const computerChoice = Math.floor(Math.random() * 3);

  // Retornar elección
  return possibleChoices[computerChoice];
}

// Antes: isPlayerWinner
function setWinner(playerChoice, computerChoice) {
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'WON';
  } else if (playerChoice === computerChoice) {
    return 'DRAW';
  } else {
    return 'LOST';
  }
}

function resetGame() {
  wonCounter = 0;
  lostCounter = 0;
  startGame;
}
