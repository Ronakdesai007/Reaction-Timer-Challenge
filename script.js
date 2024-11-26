let score = 0;
let lastCell;
let timeUp = false;
const missMessage = document.getElementById('missMessage');

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomCell(cells) {
  const idx = Math.floor(Math.random() * cells.length);
  const cell = cells[idx];
  if (cell === lastCell) {
    return randomCell(cells);
  }
  lastCell = cell;
  return cell;
}

function flash() {
  const cells = document.querySelectorAll('.cell');
  const time = randomTime(400, 750); // Faster timing
  const cell = randomCell(cells);
  cell.classList.add('active');
  setTimeout(() => {
    cell.classList.remove('active');
    if (!timeUp) flash();
  }, time);
}

function startGame() {
  score = 0;
  document.getElementById('score').textContent = score;
  timeUp = false;
  missMessage.style.opacity = '0';
  flash();
  setTimeout(() => timeUp = true, 10000); // Game lasts for 10 seconds
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('active')) {
      score++;
      cell.classList.remove('active');
      document.getElementById('score').textContent = score;
      missMessage.style.opacity = '0'; // Hide miss message on successful hit
    } else {
      score--; // Penalty for clicking inactive cell
      document.getElementById('score').textContent = score;
      missMessage.style.opacity = '1'; // Show miss message
      setTimeout(() => missMessage.style.opacity = '0', 500); // Fade out miss message
    }
  });
});
