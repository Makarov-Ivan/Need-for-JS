const score = document.querySelector(".score"),
    start = document.querySelector(".start"),
    btn1 = document.querySelector(".dif1"),
    btn2 = document.querySelector(".dif2"),
    btn3 = document.querySelector(".dif3"),
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
const dificulty = {
    dificultu: 1,
    scoreRate: 500
};
const bestScore = {
    BS: 0
};
car.classList.add("car");
// start.addEventListener("click", startGame);
btn1.addEventListener("click", function () {
    setDificulty(1);
}, false);
btn2.addEventListener("click", function () {
    setDificulty(2);
}, false);
btn3.addEventListener("click", function () {
    setDificulty(3);
}, false);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

function setDificulty(el) {
    dificulty.dificultu = el;
    startGame();
}

function startGame() {
    start.classList.add("hide");
    score.style.top = "";
    gameArea.innerHTML = "";
    car.style.left = "125px";
    car.style.top = "auto";
    for (let index = 0; index < getQuantityElements(100); index++) {
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.top = ((index++) * 75) + "px";
        line.y = index * 100;
        gameArea.appendChild(line);
    }
    for (let i = 0; i < getQuantityElements(100 * setting.trafic); i++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = -100 * setting.trafic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
        enemy.style.top = enemy.y + "px";
        enemy.style.background = enemyRandomiser();
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.speed=3;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    setting.score =Math.floor( setting.score + setting.speed);
    score.innerHTML = "SCORE:<br>" + setting.score;
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

        if (setting.score % dificulty.scoreRate == 0 && dificulty.dificultu == 1) {
            setting.speed *= 1.5;
        }
        if (setting.score % dificulty.scoreRate == 0 && dificulty.dificultu == 2) {
            setting.speed *= 2;
        }
        if (setting.score % dificulty.scoreRate == 0 && dificulty.dificultu == 3) {
            setting.speed *= 2.5;
        }
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

function moveRoad() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(
        function (line) {
            line.y += setting.speed;
            line.style.top = line.y + "px";
            if (line.y >= document.documentElement.clientHeight) {
                line.y = -75;
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
                setting.start = false;
                if (setting.score >= bestScore.BS) {
                    bestScore.BS = setting.score;
                    score.innerHTML = "Congratulations!<br>The new best score:<br>" + setting.score;
                    start.classList.remove("hide");
                } else {
                    score.innerHTML = "SCORE:<br>" + setting.score;
                    start.classList.remove("hide");
                }
                score.style.top = start.offsetHeight + "px";
                console.log("bestScore.BS: ", bestScore.BS);
            }
            item.y += setting.speed / 2;
            item.style.top = item.y + "px";
            if (item.y >= document.documentElement.clientHeight) {
                item.y = -100 * setting.trafic;
                item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
                item.style.background = enemyRandomiser();
            }
        }
    );
}

function enemyRandomiser() {
    if (Math.random() > 0.5) {
        return ("transparent url('./image/enemy.png') center / cover no-repeat");
    } else {
        return ("transparent url('./image/enemy2.png') center / cover no-repeat");
    }
}