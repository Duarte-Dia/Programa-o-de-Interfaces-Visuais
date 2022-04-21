var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'); 
// o stx e sty são o numero de vezes que queremos dividir o x e o Y
function drawGrid(stX, stY, cor){
    context.strokeStyle = cor;
    context.lineWidth = 0.5;

    for(var i = stX + 0.5; i < canvas.width; i +=stX) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
    }
    for(var i = stY + 0.5; i < canvas.height; i +=stY) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
    }
}
