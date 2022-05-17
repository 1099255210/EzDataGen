var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var btnDownload = document.getElementById('download');
var btnClear = document.getElementById('clear');
var btnPlus = document.getElementById('plus');
var btnMinus = document.getElementById('minus');
var btnReset = document.getElementById('reset');
var link = document.getElementById('dl');
link.style.visibility = "hidden";

var pointset = [];
var filename = 'output.txt';

var ypos = 10;
var yneg = 0;
var xneg = 0;
var xpos = 10;
var scaleX = xpos - xneg;
var scaleY = ypos - yneg;

// function init() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }

// init();
// window.onresize = init;

canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mousedown', addPoint, false);
btnDownload.addEventListener('click', download, false);
btnClear.addEventListener('click', clearCanvas, false);
btnPlus.addEventListener('click', zoomIn, false);
btnMinus.addEventListener('click', zoomOut, false);
btnReset.addEventListener('click', resetCanvas, false);

function clearCanvas() {
  pointset = [];
  link.style.visibility = "hidden";
}

function resetCanvas() {
  pointset = [];
  ypos = 10;
  yneg = 0;
  xneg = 0;
  xpos = 10;
  scaleX = xpos - xneg;
  scaleY = ypos - yneg;
  link.style.visibility = "hidden";
  info.updateInfo();
}

function addPoint(e) {
  var curserX = xneg + e.offsetX * scaleX / canvas.width;
  var curserY = ypos - e.offsetY * scaleY / canvas.height;
  pointset.push([curserX, curserY]);
  console.log([curserX, curserY]);
}

function zoomIn() {
  ypos = ypos - scaleY / 4;
  yneg = yneg + scaleY / 4;
  xneg = xneg + scaleX / 4;
  xpos = xpos - scaleX / 4;
  scaleX = xpos - xneg;
  scaleY = ypos - yneg;
}

function zoomOut() {
  ypos = ypos + scaleY / 2;
  yneg = yneg - scaleY / 2;
  xneg = xneg - scaleX / 2;
  xpos = xpos + scaleX / 2;
  scaleX = xpos - xneg;
  scaleY = ypos - yneg;
}

// Vue part

var info = new Vue({
  el: '#info',
  data: {
    ypos: ypos,
    yneg: yneg,
    xneg: xneg,
    xpos: xpos,
  },
  methods: {
    zoomIn: function() {
      zoomIn();
      this.updateInfo();
    },
    zoomOut: function() {
      zoomOut();
      this.updateInfo();
    },
    updateInfo: function() {
      this.ypos = ypos;
      this.yneg = yneg;
      this.xneg = xneg;
      this.xpos = xpos;
    },
    updateAxis: function() {
      ypos = parseInt(this.ypos);
      yneg = parseInt(this.yneg);
      xneg = parseInt(this.xneg);
      xpos = parseInt(this.xpos);
      scaleX = xpos - xneg;
      scaleY = ypos - yneg;
    }
  }
});


// Draw functions

function draw(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBg();
  drawCurser(e);
  drawSavedPoints();
  drawPointer();
}

function drawBg() {
  ctx.beginPath();
  ctx.fillStyle = 'rgb(230,230,230)';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();
}

function drawCurser(e) {
  drawPoint([e.offsetX, e.offsetY]);
}

function drawSavedPoints() {
  for (var i = 0; i < pointset.length; i++) {
    var realPos = pointset[i];
    var rX = realPos[0];
    var rY = realPos[1];
    var oX = (rX - xneg) * canvas.width / scaleX;
    var oY = (ypos - rY) * canvas.height / scaleY;
    drawPoint([oX, oY]);
  }
}

function drawPoint(position) {
  ctx.beginPath();
  ctx.fillStyle = 'rgb(200,200,200)';
  ctx.arc(position[0], position[1], 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

// Output part

function download() {
  var dataStr = '';
  for (var i = 0; i < pointset.length; i++) {
    dataStr += pointset[i].toString() + '\n';
  }

  console.log(dataStr);

  var blob = new Blob([dataStr]);
  link.style.visibility = "visible";
  link.download = filename;
  link.href = URL.createObjectURL(blob);
}