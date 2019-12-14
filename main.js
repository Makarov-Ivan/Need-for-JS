const score = document.querySelector(".score"),
    start = document.querySelector(".start"),
    gameArea = document.querySelector(".gameArea"),
    car = document.createElement("div");
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};
const setting = {
    start: false,
    score: 0,
    speed: 3,
};
car.classList.add("car");
start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

function startGame() {
    start.classList.add("hide");
    for (let index = 0; index < 20; index++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (index * 75) + 'px';
        line.y = index * 100;
        gameArea.appendChild(line);
    }
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    moveRoad();
    if (setting.start) {
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        car.style.left = setting.x + "px";
        car.style.top = setting.y + "px";

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

function moveRoad() {
    let lines = document.querySelectorAll('.line')
    lines.forEach(
        function (line) {
            line.y += setting.speed;
            line.style.top = line.y + 'px';
            if (line.y >= document.documentElement.clientHeight) {
                line.y = -100;
            }
        }
    )
}