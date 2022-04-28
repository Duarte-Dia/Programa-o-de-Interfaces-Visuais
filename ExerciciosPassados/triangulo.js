//NEEDS TO BE WORKED ON 
function Triangle(x, y, base, altura) {
    this.altura = altura;
    this.base = base;
    this.x = x;
    this.y = y;
    this.strokeColor = "#ffff00";
    this.fillColor = "#007700";
    this.rotation = 0;
    this.anima=false;

    this.max = 0.0005;
    this.min = 0;
    this.spring = ((Math.random() * (this.max - this.min)) + this.min);
    this.vx = 3;
    this.vy = 3;
    this.velocidadeDefeito = 3;
}


Triangle.prototype.draw = function (context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.fillColor;
   
    context.beginPath();
    context.lineTo(this.altura/2, 0);
    context.lineTo(-this.altura/2, -this.base/2);
    context.lineTo(-this.altura/2 , this.base/2);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
}

Triangle.prototype.atualizaPosicao= function(pontoClique) {
    var dx = pontoClique.x - this.x,
        dy = pontoClique.y - this.y,
        ax = dx * this.spring,
        ay = dy * this.spring,
        angle = Math.atan2(dx, dy);

    this.vx += ax;
    this.vy += ay;
    this.x += this.vx;
    this.y += this.vy;

    // atualiza rotação
    this.rotation = angle;
}
Triangle.prototype.getBounds = function () {
    return {
        x: this.x - this.altura,
        y: this.y - this.base,
        width: this.altura * 2,
        height: this.base * 2
    };
  };





