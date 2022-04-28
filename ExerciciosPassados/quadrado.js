function Square(startX, startY) {

    // if (color === undefined) {
    //     color = "#000000";
    // }
    this.x = startX;
    this.y = startY;
    this.width = 100;
    this.height = 100;
    this.img = new Image();
 //   this.color = utils.parseColor(color);
    this.lineWidth = 3;
    this.lineColor="yellow";

    
    this.img.src = "./Imagens/tacos.jpg"

    this.img.addEventListener('load', function(){
        this.imgCarregada = true;
        console.log("CARREGADA")
    }.bind(this), false);
}

// a maneira como funciona o desenho do retangulo e bastante simples
// ao desenhar o retangulo especifica-se o ponto onde se situa o canto superior esquero dele(x,y)
// de pois define se o comprimento e largura do mesmo
//context.fillRect(x, y, width, height);
Square.prototype.draw = function (context,height) {
    context.save();


    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.lineColor;
    // para repetir a imagem
    context.fillStyle = context.createPattern(this.img, "repeat");
    // desenha um retangulo preenchido com cor 
   context.fillRect(this.x, this.y, height/3, height/3);
    // desenha um o contorno retangulo
  // context.clearRect(this.x, this.y, height/3, height/3);
    // limpa a area especificada metendo tudo transparente
    //context.strokeRect(this.x, this.y, height/3, height/3);

//    context.stroke();
//             context.fill();
//             context.restore();

};