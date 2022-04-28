var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    log = document.getElementById('log'),
    estrelas = [],
    pontos = [],
    nPontos = 6,
    friction = 0.98,
    bounce = -0.8,
    gravity = 0.1,
    vx = 0,
    vy = 0,
    movePonto = false,
    pontoAtivo = 0;
    animRequest = null;


/* */

function criaEstrelas(raio) {
    for(var ponto, i=0;i<nPontos;i++){
        estr = new Estrela(raio);
        estrelas.push(estr);
    }
}

function obterPontos(centro, raio) {
    var anglo = 0;

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
    context.fill();
    context.stroke();
}

function drawEstrelas() {
    var dx, dy, angle;

    for(var i=0; i< nPontos; i++) {
        estrelas[i].x = pontos[i].x;
        estrelas[i].y = pontos[i].y;
        dx = mouse.x - estrelas[i].x;
        dy = mouse.y - estrelas[i].y;
        angle = Math.atan2(dy, dx);
        estrelas[i].rotation = angle;
        estrelas[i].draw(context);
    }
}

function drawFrame () {
    animRequest = window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var vm = Math.sqrt(vx * vx + vy * vy);
    //log.value = 'Ponto ativo = ' + pontoAtivo+'\n' + vm;
    
    bouncing();
    drawPoligono();
    drawEstrelas();
    context.fillText('Luís Romero', canvas.width, 0);
}

window.addEventListener('keydown', function (event) {
    if(event.keyCode>=48 && event.keyCode<=53) {
        pontoAtivo = event.keyCode - 48;
        movePonto = true;
        log.value = 'Ponto ativo = ' + pontoAtivo;
        vx = Math.random() * 20 - 10;
    }
    if(event.keyCode == 54) {
        for(var i=0; i<nPontos; i++) 
            pontos.pop();
            obterPontos(new Ponto(canvas.width/2, canvas.height/2), canvas.width/4);
            movePonto = false;
    }
}, false);

/*
canvas.addEventListener('mousedown', function () {
    movePonto = true;
    alvo.x = mouse.x;
    alvo.y = mouse.y;
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    if(animRequest==null) animRequest = window.requestAnimationFrame(drawFrame, canvas);
}, false);

function onMouseUp () {
    movePonto = false;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
}

function onMouseMove (event) {
    alvo.x = mouse.x;
    alvo.y = mouse.y;
}
*/


function bouncing () {
    var left = 0,
        right = canvas.width,
        top = 0,
        bottom = canvas.height;
    
    if(!movePonto) return;
    log.value = ' ';
    vy += gravity;
    vx *= friction;
    vy *= friction;
    pontos[pontoAtivo].x += vx;
    pontos[pontoAtivo].y += vy;

    if (pontos[pontoAtivo].x + 20 > right) {
        pontos[pontoAtivo].x = right - 20;
        vx *= bounce;
    } else if (pontos[pontoAtivo].x - 20 < left) {
        pontos[pontoAtivo].x = left + 20;
        vx *= bounce;
    }
    if (pontos[pontoAtivo].y + 20 > bottom) {
        pontos[pontoAtivo].y = bottom - 20;
        vy *= bounce;
    }
}


context.font = '12pt Arial';
context.textAlign = 'end';
context.textBaseline = 'top';
context.lineWidth = 2;
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'brown';

obterPontos(new Ponto(canvas.width/2, canvas.height/2), canvas.width/4);
criaEstrelas(20);
drawFrame();

// (function drawFrame () {
//     animRequest = window.requestAnimationFrame(drawFrame, canvas);
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     spring();
//     drawPoligono();
//     drawBolas();
// }());


