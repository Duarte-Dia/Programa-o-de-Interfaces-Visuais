
Ponto = function(x,y) {
    this.x = x;
    this.y = y;
}

function Tira (a, n) {
  this.altura = a;
  this.x = 0;
  this.y = 0;
  this.colorFill = "#007700";
  this.colorStroke = "#ffff00";
  this.rotation = 0;
  this.nPontos = 3;
  this.pontos = this.obterVertices();
  this.showFill = true;
  this.vx = 1;
  this.vy = -12;
  this.gr = 0.1;
  this.anima = false;
}

Tira.prototype.obterVertices = function(){
    var pts = [];

    ponto = new Ponto( 0, 5);
    pts.push(ponto);
    ponto = new Ponto( this.altura, 0);
    pts.push(ponto);
    ponto = new Ponto( 0, -5);
    pts.push(ponto);
    return pts;
}

Tira.prototype.move = function() {
    this.vy += this.gr;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation = Math.atan2(this.vy, this.vx);
}

Tira.prototype.render = function(context) {
    if(this.anima) this.move();
    this.draw(context);
}

Tira.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
  
    context.lineWidth = 2;
    context.fillStyle = this.colorFill;
    context.strokeStyle = this.colorStroke;
    context.beginPath();
    context.moveTo(this.pontos[0].x, this.pontos[0].y);
    for(var i = 0; i<this.nPontos; i+=1) {
        context.lineTo(this.pontos[i].x, this.pontos[i].y);
    }  
    context.closePath();
    context.stroke();
    if(this.showFill)
        context.fill();
  
    context.restore();
};
