

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    tiras = [],
    nTiras = 8,
    pontos = [],
    nPontos = 3,
    img = new Image(),
    padrao,
    animRequest = null;

window.onload = function() {
    context.font = 'bold 12pt Helvetica';
    context.textAlign = 'start';
    context.textBaseline = 'top';
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    img.src = 'Malabar.jpg';
    img.onload = function() {
        padrao = context.createPattern(img,'repeat');
        context.fillStyle = padrao;
    }

    canvas.addEventListener('mousedown', clicaRato, false);
    obterPontos(new Ponto(canvas.width/2, canvas.height/2), canvas.width/4);
    criaTrias(30);
    drawFrame();
}

/* */

function posTira(i){
    var step = canvas.width / (nTiras+1);

    tiras[i].x = (i+1)*step;
    tiras[i].y = canvas.height;
}

function criaTrias(altura) {
    for(i=0;i<nTiras;i++){
        tira = new Tira(altura, i);
        tiras.push(tira);
        posTira(i);
    }
}

function angleTira(i) {
    dx = mouse.x - tiras[i].x;
    dy = mouse.y - tiras[i].y;
    angle = Math.atan2(dy, dx);
    tiras[i].rotation = angle;
}

function animaTira(i) {
    if (tiras[i].y > canvas.height) {
        tiras[i].anima = false;
        posTira(i);
    }
}

function drawTiras() {
    var dx, dy, angle;

    for(var i=0; i< nTiras; i++) {
        if(!tiras[i].anima) angleTira(i);
        else animaTira(i);
        tiras[i].render(context);
    }
}

function clicaRato() {
    var velo; 
    for(var i=0; i< nTiras; i++) {
        if(!tiras[i].anima) {
            velo = Math.random() * 7 + 7;
            tiras[i].vx = velo * Math.cos(tiras[i].rotation);
            tiras[i].vy = velo * Math.sin(tiras[i].rotation);
            tiras[i].anima = true;
        }
    }
}


function obterPontos(centro, raio) {
    var anglo = -Math.PI/2;

    for(var ponto, i=0;i<nPontos;i++){
        ponto = new Ponto(
            centro.x + raio * Math.cos(anglo),
            centro.y + raio * Math.sin(anglo)
        );
        pontos.push(ponto);
        anglo += Math.PI*2/nPontos;
    }
}

function drawPoligono() {
    context.beginPath();
    context.moveTo(pontos[0].x, pontos[0].y);
    for(var i = 1; i< nPontos; i++) {
        context.lineTo(pontos[i].x, pontos[i].y);
    }
    context.closePath();
    context.fillStyle = padrao;
    context.fill();
    context.stroke();
}

function drawFrame () {
    animRequest = window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPoligono();
    drawTiras();

    context.fillStyle = '#a0700a';
    context.fillText('Luís Romero', 0, 0);
}





