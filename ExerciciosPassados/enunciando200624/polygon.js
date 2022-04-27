function Polygon(x,y,sides,radius,rotation) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.sides = sides;
    this.rotation=rotation;
    this.strokeColor = "#ffff00";
    this.fillColor = "#007700";

    this.img = new Image();
    this.img.src = "./Imagens/tacos.jpg";

    this.img.addEventListener('load', function(){
        this.imgCarregada = true;
        console.log("CARREGADA")
    }.bind(this), false);
    
  }
  
  Polygon.prototype.draw = function (context){
    const a = (2 * Math.PI) / this.sides;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.fillStyle =  context.createPattern(this.img, "repeat");
    context.strokeStyle = this.strokeColor;
  
    
    context.lineWidth = 2;
    context.beginPath();
    for (var i = 0; i < this.sides; i++) {
      var sideX = this.r * Math.cos(a * i),
        sideY = this.r * Math.sin(a * i);
  
      context.lineTo(sideX, sideY);
    }
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }