let player = { speed: 5, score: 0, start: false };
let car;
let gameArea = document.querySelector(".gameArea");
let scoreEl = document.querySelector(".score");

document.addEventListener("keydown", keyDown);
document.getElementById("leftBtn").addEventListener("touchstart", () => moveLeft = true);
document.getElementById("leftBtn").addEventListener("touchend", () => moveLeft = false);

document.getElementById("rightBtn").addEventListener("touchstart", () => moveRight = true);
document.getElementById("rightBtn").addEventListener("touchend", () => moveRight = false);

let moveLeft = false;
let moveRight = false;

function keyDown(e) {
    if (e.key === "ArrowLeft") moveLeft = true;
    if (e.key === "ArrowRight") moveRight = true;
}

function keyUp(e) {
    if (e.key === "ArrowLeft") moveLeft = false;
    if (e.key === "ArrowRight") moveRight = false;
}
document.addEventListener("keyup", keyUp);

function startGame() {
    player.start = true;

    // Create car
    car = document.createElement("div");
    car.classList.add("car");
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // Create enemy cars
    for (let i = 0; i < 3; i++) {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.style.top = (i * -200) + "px";
        enemy.style.left = Math.random() * 250 + "px";
        gameArea.appendChild(enemy);
    }

    window.requestAnimationFrame(playGame);
}

function playGame() {
    if (player.start) {
        let enemies = document.querySelectorAll(".enemy");

        enemies.forEach(enemy => {
            if (collision(car, enemy)) {
                player.start = false;
                alert("Game Over! Your Score: " + player.score);
                window.location.reload();
            }

            enemy.style.top = enemy.offsetTop + player.speed + "px";

            if (enemy.offsetTop > window.innerHeight) {
                enemy.style.top = "-200px";
                enemy.style.left = Math.random() * 250 + "px";
                player.score++;
                scoreEl.innerText = "Score: " + player.score;
            }
        });

        if (moveLeft && player.x > 0) player.x -= player.speed;
        if (moveRight && player.x < 250) player.x += player.speed;

        car.style.left = player.x + "px";

        window.requestAnimationFrame(playGame);
    }
}

function collision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

startGame();
