window.onload = function () {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    mouse = utils.captureMouse(canvas),
    hexagon = new Polygon(),
    stars1 = [],
    stars2 = [],
    vx = 0,
    vy = 0,
    gravity = 0.1,
    friction = 0.98,
    click = false;

  const a = (2 * Math.PI) / 6;
  hexagon.x = canvas.width / 2;
  hexagon.y = canvas.height / 2;
  hexagon.r = canvas.height / 4;
  hexagon.sides = 6;
  hexagon.rotation = 0;
  hexagon.strokeColor = "brown";
  hexagon.fillColor = "cornflowerblue";

  for (var i = 0; i < hexagon.sides; i++) {
    var sideX = canvas.width / 2 + hexagon.r * Math.cos(a * i),
      sideY = canvas.height / 2 + hexagon.r * Math.sin(a * i);

    stars1.push(new Polygon());
    stars1[i].x = sideX;
    stars1[i].y = sideY;
    stars1[i].r = 20;
    stars1[i].sides = 3;
    stars1[i].rotation = 0;
    stars1[i].strokeColor = "#ffff00";
    stars1[i].fillColor = "#007700";

    stars2.push(new Polygon());
    stars2[i].x = sideX;
    stars2[i].y = sideY;
    stars2[i].r = 20;
    stars2[i].sides = 3;
    stars2[i].rotation = 180;
    stars2[i].strokeColor = "#ffff00";
    stars2[i].fillColor = "#007700";
  }

  window.addEventListener(
    "keydown",
    function () {
      click = true;
      var randomVel = rng(-10, 10);
      vx = randomVel;
      vy = randomVel;
    },
    { once: true }
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

    hexagon.draw(context);

    for (var i = 0; i < hexagon.sides; i++) {
      var dx = mouse.x - stars1[i].x,
        dy = mouse.y - stars1[i].y,
        angle = Math.atan2(dy, dx);

      if (i == 0 && click) {
        // atrito
        if (Math.abs(vx) > 0.001) {
          vx *= friction;
          stars1[i].x += vx;
          stars2[i].x += vx;
        }
        vx *= friction;
        vy *= friction;

        // gravidade
        vy += gravity;

        stars1[i].x += vx;
        stars1[i].y += vy;
        stars2[i].x += vx;
        stars2[i].y += vy;

        // ricochete
        var left = 0,
          right = canvas.width,
          top = 0,
          bottom = canvas.height;

        if (stars1[i].x + stars1[i].r > right) {
          stars1[i].x = right - stars1[i].r;
          stars2[i].x = right - stars2[i].r;
          vx *= -0.8;
        } else if (stars1[i].x - stars1[i].r < left) {
          stars1[i].x = left + stars1[i].r;
          stars2[i].x = left + stars2[i].r;
          vx *= -0.8;
        }
        if (stars1[i].y + stars1[i].r > bottom) {
          stars1[i].y = bottom - stars1[i].r;
          stars2[i].y = bottom - stars2[i].r;
          vy *= -0.8;
        } else if (stars1[i].y - stars1[i].r < top) {
          stars1[i].y = top + stars1[i].r;
          stars2[i].y = top + stars2[i].r;
          vy *= -0.8;
        }
      }

      stars1[i].rotation = angle;
      stars2[i].rotation = angle + Math.PI / 3;

      stars1[i].draw(context);
      stars2[i].draw(context);
    }
  })();
};
