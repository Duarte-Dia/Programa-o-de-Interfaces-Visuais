
//NEEDS TO BE WORKED ON 
function Triangle(x, y, base, altura) {

    this.altura = altura;
    this.base = base;
    this.x = x;
    this.y = y;
    this.strokeColor = "#ffff00";
    this.fillColor = "#007700";
    this.lineWidth = 3;
    this.rotacao = 0;
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

  // context.moveTo( this.altura,   this.base / 2);
    // context.lineTo(  0,   this.base );
    // context.lineTo(  0 , 0);
    // context.lineTo(  this.altura ,  this.base/2);

 //context.moveTo( this.altura/2,   this.base / 2);
     context.lineTo(  this.altura,   this.base/2 );
     context.lineTo(  -this.altura/2,   0 );
    context.lineTo(  -this.altura/2 ,  this.base);

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
    this.rotacao = angle;
}






