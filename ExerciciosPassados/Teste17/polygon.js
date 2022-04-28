function Polygon() {
  this.x = 0;
  this.y = 0;
  this.r = 20;
  this.sides = 3;
  this.rotation = 0;
  this.strokeColor = "#ffff00";
  this.fillColor = "#007700";
  this.img = new Image();
  this.img.src = "./Malabar.jpg"
}

Polygon.prototype.draw = function (context){
  const a = (2 * Math.PI) / this.sides;
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  //context.fillStyle = this.fillColor;
  context.fillStyle = context.createPattern(this.img, "repeat");
  context.strokeStyle = this.strokeColor;

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

Polygon.prototype.getBounds = function () {
  return {
    x: this.x - this.r,
    y: this.y - this.r,
    width: this.r * 2,
    height: this.r * 2
  };
};
