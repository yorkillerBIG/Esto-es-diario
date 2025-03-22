const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Tamaño de cada celda del grid
const canvasSize = 400; // Tamaño del canvas
const rows = canvasSize / gridSize;
const cols = canvasSize / gridSize;

let snake = [{ x: 10, y: 10 }]; // Cabeza de la serpiente
let direction = { x: 0, y: 0 }; // Dirección inicial
let food = { x: 5, y: 5 }; // Posición de la comida
let images = []; // Almacena las imágenes de la serpiente
let gameStarted = false;

// Cargar una imagen para la serpiente
function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

// Dibujar la serpiente
function drawSnake() {
    snake.forEach((segment, index) => {
        if (images[index]) {
            ctx.drawImage(images[index], segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
    });
}

// Dibujar la comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Mover la serpiente
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Verificar colisión con los bordes
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        alert("¡Perdiste!");
        resetGame();
        return;
    }

    // Verificar colisión consigo misma
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("¡Perdiste!");
        resetGame();
        return;
    }

    // Verificar si come la comida
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        placeFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }
}

// Colocar comida en una posición aleatoria
function placeFood() {
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
    };
}

// Reiniciar el juego
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    placeFood();
    gameStarted = false;
}

// Actualizar el juego
function update() {
    if (!gameStarted) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    moveSnake();
    drawSnake();
    drawFood();
}

// Controles
document.getElementById("up").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
document.getElementById("down").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});
document.getElementById("left").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});

// Subir imagen
document.getElementById("imageUpload").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        const img = await loadImage(file);
        images.push(img);
    }
});

// Comenzar juego
document.getElementById("startButton").addEventListener("click", () => {
    if (images.length > 0) {
        gameStarted = true;
    } else {
        alert("Sube una imagen primero.");
    }
});

// Bucle del juego
setInterval(update, 100);
