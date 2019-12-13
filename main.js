const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}
const setting = {
    start: false,
    score: 0,
    speed: 3,
}
car.classList.add('car')
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car)
    requestAnimationFrame(playGame);
}

function playGame() {
    console.log('playGame!');
    if (setting.start) {
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}