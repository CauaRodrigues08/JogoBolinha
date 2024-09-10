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
let ballSpeedY = 4;

//Controles
let rightPressed = false;
let leftPressed = false;

//Gameover
let isGameOver = false;

//Desenho da raquete
function drawPaddle() {
    contexto.beginPath();
    contexto.rect(paddleX, telaCanvas.height - paddleHeight- 10, paddleWidth, paddleHeight)
    contexto.fillStyle = "#fff";
    contexto.fill();
    contexto.closePath()
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
ballY += ballSpeedY;

//Colisão da bola
    if (ballY + ballRadius > telaCanvas.height - paddleHeight - 10 && ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballY =telaCanvas.height - paddleHeight - 10 - ballRadius;
        ballSpeedY = -ballSpeedY 
}

//Detectar Gameover
    if (ballY + ballRadius > telaCanvas.height){
        isGameOver = true;
    }
}

//Desenho do jogo
