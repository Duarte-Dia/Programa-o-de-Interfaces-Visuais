
Ponto = function(x,y) {
    this.x = x;
    this.y = y;
}

function Estrela (raio) {
  this.x = 0;
  this.y = 0;
  this.raio = raio;
  this.colorFill = "#007700";
  this.colorStroke = "#ffff00";
  this.rotation = 0;
  this.nPontos = 6;
  this.pontos = this.obterVertices();
  this.showFill = true;
}

Estrela.prototype.obterVertices = function(){
    var pts = [];
    var anglo = 0; //-Math.PI/2;

    for(var ponto, i=0;i<this.nPontos;i++){
        ponto = new Ponto(
            this.raio * Math.cos(anglo),
            this.raio * Math.sin(anglo)
        );
        pts.push(ponto);
        anglo += Math.PI*2/this.nPontos;
    }
    return pts;
}

Estrela.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
  
    context.lineWidth = 1;
    context.fillStyle = this.colorFill;
    context.strokeStyle = this.colorStroke;
    for(var j=1;j>=0;j--){
        context.lineWidth = 4-j*2;
        context.beginPath();
        context.moveTo(this.pontos[j].x, this.pontos[j].y);
        for(var i = j; i<this.nPontos; i+=2) {
            context.lineTo(this.pontos[i].x, this.pontos[i].y);
        }  
        context.closePath();
        context.stroke();
        if(this.showFill)
            context.fill();
  
    }
    context.restore();
};
