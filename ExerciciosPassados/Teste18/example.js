window.onload = function () {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    mouse = utils.captureMouse(canvas),
    triangle = new Polygon(),
    tiras = [],
    numTiras = 8,
    gravity = 0.1,
    mouseX,
    mouseY;

  context.lineWidth = 2;

  triangle.x = canvas.width / 2;
  triangle.y = canvas.height / 2;
  triangle.r = canvas.height / 4;
  triangle.sides = 3;
  triangle.rotation = -Math.PI / 2;
  triangle.strokeColor = "red";

  for (var i = 0; i < numTiras; i++) {
    var posX = (canvas.width / (numTiras + 1)) * (i + 1);

    tiras.push(new Triangle(posX, canvas.height - 10, 10, 30));
    tiras[i].sides = 3;
    tiras[i].rotation = 0;
    tiras[i].strokeColor = "#ffff00";
    tiras[i].fillColor = "#007700";
  }

  window.addEventListener(
    "mousedown",
    function () {
      for (var i = 0; i < numTiras; i++) {
        if (!tiras[i].anima) {
          tiras[i].anima = true;
          var velo = rng(7, 14);
          tiras[i].vx = velo * Math.cos(tiras[i].rotation);
          tiras[i].vy = velo * Math.sin(tiras[i].rotation);
        }
      }
    },
    false
  );

  // canvas.addEventListener(
  //   "mousedown",
  //   function () {
  //     stars1.forEach(function (element, index, array) {
  //       if (utils.containsPoint(element.getBounds(), mouse.x, mouse.y)) {
  //         click = true;
  //         console.log("yes, number " + (index + 1));
  //         var randomVel = rng(-10, 10);
  //         vx = randomVel;
  //         vy = randomVel;
  //       }
  //     });
  //   },
  //   false
  // );

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    triangle.draw(context);

    for (var i = 0; i < numTiras; i++) {
      if (!tiras[i].anima) {
        var dx = mouse.x - tiras[i].x,
          dy = mouse.y - tiras[i].y,
          angle = Math.atan2(dy, dx);
          tiras[i].rotation = angle;
      } else {
        // gravidade
        tiras[i].vy += gravity;
        tiras[i].x += tiras[i].vx;
        tiras[i].y += tiras[i].vy;
        tiras[i].rotation = Math.atan2(tiras[i].vy, tiras[i].vx);

        if(tiras[i].y > canvas.height){
          tiras[i].x = (canvas.width / (numTiras + 1)) * (i + 1);
          tiras[i].y = canvas.height - 10
          tiras[i].anima = false
        }
      }


      tiras[i].draw(context);
    }
  })();
};
