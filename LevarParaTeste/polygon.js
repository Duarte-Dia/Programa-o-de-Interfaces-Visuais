function Polygon(x, y,width,height) {
    this.x = x;
    this.y = y;
    this.width= width;
    this.height= height;
    this.r = 20;
    this.sides = 4;
    this.rotation = 0;
    this.strokeColor = "#ffff00";
    this.fillColor = "#007700";
   
    this.img = new Image();
    this.lineWidth=2;
    
    this.img.src = "./image/Tex04.jpg"
   
       
    
}

Polygon.prototype.drawP1 = function (context) {
    const a = (2 * Math.PI) / this.sides;
    context.save();
    // x=300 y=250
   
        context.translate(this.x -50, this.y);
    
    context.rotate(this.rotation);
    context.strokeSize= this.lineWidth;
    context.strokeStyle = "blue";
    context.fillStyle = context.createPattern(this.img, "repeat");


    context.beginPath();

     context.lineTo(this.x / 6, 0);
     context.lineTo(-this.x / 6, -this.y *2/ 5);
     context.lineTo(-this.x / 6, this.y *2/ 5);

    context.lineTo(this.x / 2, -this.y *2/ 5);
     context.lineTo(this.x / 2, this.y *2/ 5);
     context.lineTo(this.x / 6, 0);

    // context.lineTo(-this.width / 2, -this.height / 2);
    // context.lineTo(this.width / 2, -this.height / 2);
    // context.lineTo(this.width / 2, this.height / 2);
    // context.lineTo(-this.width / 2, this.height / 2);

    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}



Polygon.prototype.drawP2 = function (context) {
    const a = (2 * Math.PI) / this.sides;
    context.save();
    context.translate(this.x, this.y-50);
    context.rotate(this.rotation);
    context.strokeSize= this.lineWidth;
    context.strokeStyle = "blue";
    context.fillStyle = context.createPattern(this.img, "repeat");


    context.beginPath();

     context.lineTo(this.x / 6, 0);
     context.lineTo(-this.x / 6, -this.y *2/ 5);
     context.lineTo(-this.x / 6, this.y *2/ 5);

     context.lineTo(this.x / 2, -this.y *2/ 5);
     context.lineTo(this.x / 2, this.y *2/ 5);
     context.lineTo(this.x / 6, 0);

    // context.lineTo(-this.width / 2, -this.height / 2);
    // context.lineTo(-this.width / 2, this.height / 2);
    // context.lineTo(this.width / 2, -this.height / 2);
    // context.lineTo(this.width / 2, this.height / 2);

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