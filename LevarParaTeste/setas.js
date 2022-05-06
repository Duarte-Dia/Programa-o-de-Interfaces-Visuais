Ponto = function(x,y) {
    this.x = x;
    this.y = y;
}

function Seta (a, b) {
  this.altura = a;
  this.base= b;
  this.x = Math.floor(Math.random() * (600 - 0 + 1)) + 0;
  this.y = Math.floor(Math.random() * (500 - 0 + 1)) + 0;
  this.colorFill = "#007700";
  this.colorStroke = "#ffff00";
  this.rotation = 0;
  this.nPontos = 3;
  this.pontos = this.obterVertices();
  this.showFill = true;
  this.vx = Math.floor(Math.random() * (2.5 - 0 + 1)) + 0;
  this.vy = Math.floor(Math.random() * (2.5 - 0 + 1)) + 0;
  this.gr = 0.1;
  this.anima = false;
}

Seta.prototype.obterVertices = function(){
    var pts = [];

    ponto = new Ponto( 0, this.base/2);
    pts.push(ponto);
    ponto = new Ponto( this.altura, 0);
    pts.push(ponto);
    ponto = new Ponto( 0, -this.base/2);
    pts.push(ponto);
    return pts;
}

Seta.prototype.getBounds = function () {
    return {
        x: this.x - this.altura,
        y: this.y - this.base,
        width: this.altura * 2,
        height: this.base * 2
    };
  };

Seta.prototype.move = function() {
    this.vy += this.gr;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation = Math.atan2(this.vy, this.vx);
}

Seta.prototype.render = function(context) {
    if(this.anima) this.move();
    this.draw(context);
}

Seta.prototype.atualizaPosicao = function () {
    
    
    this.x += this.vx;
    this.y += this.vy;
    this.rotation = Math.atan2(this.vy, this.vx);
  }

Seta.prototype.draw = function (context) {
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
