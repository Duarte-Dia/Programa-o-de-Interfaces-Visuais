
  function desenhaNome(context){
    context.save();
    context.font = "12pt Arial";
    context.textAlign = "right"
    context.textBaseline = "hanging"
    context.fillStyle = "cornflowerblue"
    context.fillText("Insert Name Here!!! ", canvas.width, 0); 
    context.restore();}