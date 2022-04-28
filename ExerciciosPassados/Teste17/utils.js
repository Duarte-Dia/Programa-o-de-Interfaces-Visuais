 /**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}

/**
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelRequestAnimationFrame) {
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
                                        window.webkitCancelRequestAnimationFrame ||
                                        window.mozCancelRequestAnimationFrame ||
                                        window.msCancelRequestAnimationFrame ||
                                        window.oCancelRequestAnimationFrame ||
                                        window.clearTimeout);
}


/* Object that contains our utility functions.
 * Attached to the window object which acts as the global namespace.
 */
window.utils = {};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
window.utils.captureMouse = function (element) {
  var mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', function (event) {
    var x, y;
    
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);
  
  return mouse;
};

/**
 * Keeps track of the current (first) touch position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, isPressed, event
 */
window.utils.captureTouch = function (element) {
  var touch = {x: null, y: null, isPressed: false, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;

  element.addEventListener('touchstart', function (event) {
    touch.isPressed = true;
    touch.event = event;
  }, false);

  element.addEventListener('touchend', function (event) {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  }, false);
  
  element.addEventListener('touchmove', function (event) {
    var x, y,
        touch_event = event.touches[0]; //first touch
    
    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
      y = touch_event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    touch.x = x;
    touch.y = y;
    touch.event = event;
  }, false);
  
  return touch;
};

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
window.utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
window.utils.colorToRGB = function (color, alpha) {
  //number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = (alpha === undefined) ? 1 : alpha;
  //parse hex values
  var r = color >> 16 & 0xff,
      g = color >> 8 & 0xff,
      b = color & 0xff,
      a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb("+ r +","+ g +","+ b +")";
  } else {
    return "rgba("+ r +","+ g +","+ b +","+ a +")";
  }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
window.utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x ||
           x > rect.x + rect.width ||
           y < rect.y ||
           y > rect.y + rect.height);
};

/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
window.utils.intersects = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y);
};

function grausParaRadianos(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}

//
// Converte graus para radianos
//
function radianosParaGraus(radians){
  return radians * (180/Math.PI);
}

//
// Função número aleatorio entre valores
//
function rng(min, max){
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function geraID(tamanho) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < tamanho; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

//
// Função segundos para mm:ss
//
function segundosParaMinutosSegundos(segundos){
  if(!segundos && segundos !== 0){
      return "-1:-1";
  }
  var minutos = Math.floor((segundos/60));
  var segundos = (segundos - Math.floor((segundos/60))*60)
  return "" + minutos + ":" + (segundos < 10 ? "0" + segundos : segundos)
}

//
// Função para obter uma cor aleatória
//
function corAleatoria() {
  return Math.floor(Math.random()*16777215).toString(16);
}


//
// Função para aplicar rotação a um objeto
// -- o objeto deve possuir um método "desenha()" que deve desenhar o objeto
// -- o objeto deve possuir um método getPonto que devolve um Ponto(x,y) com a sua posição
// rotação em graus
//
function aplicaRotacaoObjetoEDesenha(objeto, rotacao, contexto){
  if(typeof objeto.desenha == "function"){
    if(typeof objeto.getPonto == "function"){
      contexto.save();
      //obter Ponto x,y
      var ponto = objeto.getPonto();
      // aplica rotação
      contexto.translate(ponto.x, ponto.y);
      context.rotate(grausParaRadianos(rotacao))
      contexto.translate(-ponto.x, -ponto.y);
      // desenha
      objeto.desenha(contexto);
      contexto.restore();
    } else {
      console.log("O objeto não possui o método getPonto");
    }
  } else {
    console.log("O objeto não possui o método desenha");
  }
}

function aplicaRotacaoCoordenadasObjetoSobrePonto(objeto, angulo, ponto, contexto){
  if(typeof objeto.desenha == "function"){
    if(typeof objeto.getPonto == "function"){

      angulo = grausParaRadianos(angulo);

      var cos = Math.cos(angulo);
      var sin = Math.sin(angulo);

      var x1 = objeto.x - ponto.x,
        y1 = objeto.y - ponto.y,
        x2 = cos * x1 - sin * y1,
        y2 = cos * y1 + sin * x1;


      objeto.x = ponto.x + x2;
      objeto.y = ponto.y + y2;

    } else {
      console.log("O objeto não possui o método getPonto");
    }
  } else {
    console.log("O objeto não possui o método desenha");
  }
}


//
// Função para obter angulo de um Ponto(x,y) a outro Ponto(x,y)
//
function obterAnguloPontoAPonto(ponto1, ponto2){
  return Math.atan2((ponto1.y - ponto2.y), (ponto1.x - ponto2.x))
}