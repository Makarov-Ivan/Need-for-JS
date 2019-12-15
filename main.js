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
    trafic: 3,
};
car.classList.add("car");
start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

function startGame() {
    start.classList.add("hide");
    for (let index = 0; index < getQuantityElements(100); index++) {
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.top = (index * 75) + "px";
        line.y = index * 100;
        gameArea.appendChild(line);
    }
    for (let i = 0; i < getQuantityElements(100 * setting.trafic); i++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = -100 * setting.trafic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + "px";
        enemy.style.background = 'transparent url(\'./image/enemy.png\') center / cover no-repeat';
        gameArea.appendChild(enemy);
    }
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    moveRoad();
    moveEnemy();
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

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}
console.log(getQuantityElements(200));

function moveRoad() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(
        function (line) {
            line.y += setting.speed;
            line.style.top = line.y + "px";
            if (line.y >= document.documentElement.clientHeight) {
                line.y = -100;
            }
        }
    );
}

function moveEnemy() {
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(
        function (item) {
            let carRect = car.getBoundingClientRect();
            let enemyRect = item.getBoundingClientRect();
            if (carRect.top <= enemyRect.bottom && 
                carRect.right >= enemyRect.left && 
                carRect.left <= enemyRect.right && 
                carRect.bottom >= enemyRect.top) {
                setting.start=false;
                alert('столкновение');

            }
            item.y += setting.speed / 2;
            item.style.top = item.y + "px";
            if (item.y >= document.documentElement.clientHeight) {
                item.y = -100 * setting.trafic;
                item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            }
        }
    );
}