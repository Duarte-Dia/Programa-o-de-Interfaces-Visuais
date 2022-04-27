function drawPolygon(ctx,x, y,faces) {
    ctx.beginPath();
    const r = 50;
    const a = 2 * Math.PI / faces;
    for (var i = 0; i < faces; i++) {
      ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
  }