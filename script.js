const gameArea = document.querySelector('.gameArea');
const scoreDisplay = document.querySelector('.score');

let player = { speed: 6, score: 0 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

let car = document.createElement('div');
car.classList.add('car');
gameArea.appendChild(car);

["front", "back"].forEach(pos => {
    ["left", "right"].forEach(side => {
        let w = document.createElement('div');
        w.className = `wheel ${pos} ${side}`;
        car.appendChild(w);
    });
});

function createRoadLines() {
    for (let i = 0; i < 6; i++) {
        let line = document.createElement('div');
        line.classList.add('line');
        line.y = i * 150;
        line.style.top = line.y + 'px';
        gameArea.appendChild(line);
    }
}

function randomLane() {
    const lanes = [30, 130, 230];
    return lanes[Math.floor(Math.random() * lanes.length)];
}

function createEnemies() {
    for (let i = 0; i < 3; i++) {
        let enemy = document.createElement('div');
        enemy.classList.add('enemy');

        ["front", "back"].forEach(pos => {
            ["left", "right"].forEach(side => {
                let w = document.createElement('div');
                w.className = `wheel ${pos} ${side}`;
                enemy.appendChild(w);
            });
        });

        enemy.y = (i * -300) - 200;
        enemy.style.left = randomLane() + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }
}

createRoadLines();
createEnemies();

function moveLines() {
    document.querySelectorAll('.line').forEach(line => {
        line.y += player.speed;
        line.style.top = line.y + 'px';

        if (line.y > 600) line.y = -150;
    });
}

function moveEnemies() {
    let enemies = document.querySelectorAll('.enemy');

    enemies.forEach(enemy => {
        enemy.y += player.speed;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y > 600) {
            enemy.y = -300;
            enemy.style.left = randomLane() + 'px';
            player.score += 10;
        }

        if (isCollide(car, enemy)) endGame();
    });
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

function playGame() {
    let road = gameArea.getBoundingClientRect();

    if (keys.ArrowUp && car.offsetTop > 0)
        car.style.top = car.offsetTop - player.speed + "px";

    if (keys.ArrowDown && car.offsetTop < road.height - 100)
        car.style.top = car.offsetTop + player.speed + "px";

    if (keys.ArrowLeft && car.offsetLeft > 0)
        car.style.left = car.offsetLeft - player.speed + "px";

    if (keys.ArrowRight && car.offsetLeft < road.width - 60)
        car.style.left = car.offsetLeft + player.speed + "px";

    moveLines();
    moveEnemies();

    scoreDisplay.textContent = "Score: " + player.score;

    requestAnimationFrame(playGame);
}

function endGame() {
    alert("Game Over! Your Score: " + player.score);
    location.reload();
}

requestAnimationFrame(playGame);
