function Ball (x,y) {
   
    this.x = x;
    this.y = y;
    this.radius = Math.floor(Math.random() * (30-15+1)) + 15;
    this.color ="#00bbff";
    this.lineWidth = 2;
  }
  
  Ball.prototype.draw = function (context) {
    context.save();
   
    context.translate(this.x, this.y);
    context.lineWidth = this.lineWidth;
    context.lineStyle="#ff0000";
    context.fillStyle = this.color;
    context.beginPath();
    
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    
    context.closePath();
    
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  };

  Ball.prototype.drawText = function (context) {
    context.save();
   
    context.translate(this.x, this.y);
    context.font = "12pt Arial";
    context.textAlign = "right"
    context.textBaseline = "hanging"
   context.fillStyle = "red"
    context.fillText("num ",0, 0); 
    
    
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  };

  Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
    };
  };