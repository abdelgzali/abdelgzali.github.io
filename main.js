// Debounces resize events
function debounce(func, delay) {
  var inDebounce;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
};

// Particle animation
document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("header");
  var banner = document.getElementById("banner");
  setTimeout(function () {
    banner.classList.add("show");
  }, 200);

  setTimeout(function () {
    header.classList.add("show");
  }, 400);

  var canvas = document.getElementById("points-container");

  var ctx = canvas.getContext("2d");

  var ww = window.innerWidth;
  var wh = window.innerHeight;
  canvas.width = ww;
  canvas.height = wh;
  var partCount = 100;
  var particles = [];

  function particle() {
    this.color = "rgba(255,255,255," + Math.random() + ")";
    this.x = randomInt(0, ww);
    this.y = randomInt(0, wh);
    this.direction = {
      x: -1 + Math.random() * 2,
      y: -1 + Math.random() * 2,
    };
    this.vx = 0.3 * Math.random();
    this.vy = 0.3 * Math.random();
    this.radius = randomInt(2, 3);
    this.float = function () {
      this.x += this.vx * this.direction.x;
      this.y += this.vy * this.direction.y;
    };
    this.changeDirection = function (axis) {
      this.direction[axis] *= -1;
    };
    this.boundaryCheck = function () {
      if (this.x >= ww) {
        this.x = ww;
        this.changeDirection("x");
      } else if (this.x <= 0) {
        this.x = 0;
        this.changeDirection("x");
      }
      if (this.y >= wh) {
        this.y = wh;
        this.changeDirection("y");
      } else if (this.y <= 0) {
        this.y = 0;
        this.changeDirection("y");
      }
    };
    this.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };
  }
  function clearCanvas() {
    ctx.clearRect(0, 0, ww, wh);
  }
  function createParticles() {
    for (i = 0; i < partCount; i++) {
      var p = new particle();
      particles.push(p);
    }
  }
  function drawParticles() {
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      p.draw();
    }
  }
  function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
      p = particles[i];
      p.float();
      p.boundaryCheck();
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function velocityInt(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  createParticles();
  drawParticles();
  function animateParticles() {
    clearCanvas();
    drawParticles();
    updateParticles();
    requestAnimationFrame(animateParticles);
  }
  requestAnimationFrame(animateParticles);

  window.addEventListener(
    "resize",
    debounce(function () {
      console.log('debounced!')
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = ww;
      canvas.height = wh;
      clearCanvas();
      particles = [];
      createParticles();
      drawParticles();
    }, 300)
  );
});
