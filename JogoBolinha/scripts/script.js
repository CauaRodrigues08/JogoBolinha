//Selecioando canvas e adquirindo seu contexto
const telaCanvas = document.querySelector('#gameCanvas');
const contexto = telaCanvas.getContext('2d');

//Tamanho do canvas
telaCanvas.width = 800;
telaCanvas.height = 600;

//Tamanho da raquete
let paddleWidth = 100;
let paddleHeight= 20;
//Posição horizontal inicial da raquete
let paddleX = (telaCanvas.width - paddleWidth) / 2;

//Propriedades da bola
let ballRadius = 10;
let ballX = telaCanvas.width / 2;
let ballY = telaCanvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 4;

//Controles
let rightPressed = false;
let leftPressed = false;

//Gameover
let isGameOver = false;

//Função para gerar uma velocidade aleatória
function getRandomSpeed() {
    // Gera um valor aleatório entre 2 e 5 para a velocidade
    return Math.random() * 3 + 2;
}


//Função para inicializar/reiniciar o jogo
function initializeGame() {
    paddleX = (telaCanvas.width - paddleWidth) / 2;
    ballX = telaCanvas.width / 2;
    ballY = telaCanvas.height / 2;
 

     // Gera uma velocidade aleatória para a bola
     ballSpeedX = getRandomSpeed();
     ballSpeedY = getRandomSpeed();
 
     // Garante que a bola não se mova apenas em uma direção
     if (Math.random() < 0.5) {
         ballSpeedX = -ballSpeedX;
     }
     if (Math.random() < 0.5) {
         ballSpeedY = -ballSpeedY;
     }

    isGameOver = false;
}

//Desenho da raquete (Função)
function drawPaddle() {
    contexto.beginPath();
    contexto.rect(paddleX, telaCanvas.height - paddleHeight- 10, paddleWidth, paddleHeight)
    contexto.fillStyle = "#fff";
    contexto.fill();
    contexto.closePath()
}

//Desenho da bola
function drawBall(){
    contexto.beginPath();
    contexto.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    contexto.fillStyle = "#ff0000"
    contexto.fill();
    contexto.closePath();
}

//Função para aumentar a velocidade da bola
function increaseBallSpeed() {
    // Incrementa a velocidade da bola
    ballSpeedX *= 1.1; 
    ballSpeedY *= 1.1; 
}

//Movimento(controles)
function movePaddle(){
    if (rightPressed && paddleX < telaCanvas.width - paddleWidth){
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

//Movimento da bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisão com as bordas do canvas
    if (ballX + ballRadius > telaCanvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }


    //Colisão da bola com a raquete
        if (ballY + ballRadius > telaCanvas.height - paddleHeight - 10 && ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballY =telaCanvas.height - paddleHeight - 10 - ballRadius;
            ballSpeedY = -ballSpeedY 
            increaseBallSpeed();
        }

    //Detectar Gameover
        if (ballY + ballRadius > telaCanvas.height){
            isGameOver = true;
        }
}

//Desenho do jogo
function drawGame(){
    contexto.clearRect(0,0, telaCanvas.width, telaCanvas.height);
    drawPaddle();
    drawBall();

    if (!isGameOver) {
        movePaddle();
        moveBall();
    } else {
        contexto.font = "40px Arial";
        contexto.fillStyle = "#fff";
        contexto.fillText("Game Over", telaCanvas.width / 2 - 100, telaCanvas.height / 2);
        contexto.font = "20px Arial";
        contexto.fillText("Clique para reiniciar", telaCanvas.width / 2 - 90, telaCanvas.height / 2 + 40);
    }

    requestAnimationFrame(drawGame);
}

//Event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
telaCanvas.addEventListener("click", canvasClickHandler);

//Funções dos handlers de controle
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

//Função para reiniciar o jogo ao clicar na tela
function canvasClickHandler(e) {
    if (isGameOver) {
        initializeGame();
    }
}

//Desenho para iniciar o jogo
initializeGame();
drawGame();
