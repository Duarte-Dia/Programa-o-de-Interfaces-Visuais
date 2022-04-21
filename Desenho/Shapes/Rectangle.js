function Rectangle(startX, startY, color) {

    if (color === undefined) {
        color = "#000000";
    }
    this.x = startX;
    this.y = startY;
    this.width = 100;
    this.height = 100;

    this.color = utils.parseColor(color);
    this.lineWidth = 3;
}

// a maneira como funciona o desenho do retangulo e bastante simples
// ao desenhar o retangulo especifica-se o ponto onde se situa o canto superior esquero dele(x,y)
// de pois define se o comprimento e largura do mesmo
//context.fillRect(x, y, width, height);
Rectangle.prototype.draw = function (context) {
    context.save();


    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    // desenha um retangulo preenchido com cor 
    context.fillRect(25, 25, 100, 100);
    // desenha um o contorno retangulo
    context.clearRect(45, 45, 60, 60);
    // limpa a area especificada metendo tudo transparente
    context.strokeRect(50, 50, 50, 50);

};