function Ball (x,y,radius, color) {
    if (radius === undefined) { radius = 40; }
    if (color === undefined) { color = "#000000"; }
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = utils.parseColor(color);
    this.lineWidth = 3;
  }
  
  Ball.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    
    context.lineWidth = this.lineWidth;
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

  Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
    };
  };