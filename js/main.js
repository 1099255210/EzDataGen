var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var btnDownload = document.getElementById('download');
var btnClear = document.getElementById('clear');
var pointset = [];
var filename = 'output.txt';

var xneg = 5;
var xpos = 10;
var yneg = 5;
var ypos = 10;

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

function clearCanvas() {
  document.location.reload();
}

function addPoint(e) {
  var scaleX = xpos - xneg;
  var scaleY = ypos - yneg;
  var curserX = xneg + e.offsetX * scaleX / canvas.width;
  var curserY = ypos - e.offsetY * scaleY / canvas.height;
  pointset.push([curserX, curserY]);
  console.log([curserX, curserY]);
}

// Draw functions

function draw(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBg();
  drawCurser(e);
  drawSavedPoints();
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
    var scaleX = xpos - xneg;
    var scaleY = ypos - yneg;
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

// Output part.

function download() {
  var dataStr = '';
  for (var i = 0; i < pointset.length; i++) {
    dataStr += pointset[i].toString() + '\n';
  }

  console.log(dataStr);

  // var element = document.createElement('a');
  // element.setAttribute('href', "data:text/plain;charset=utf-8" + encodeURIComponent(dataStr));
  // element.setAttribute('download', filename);

  // document.body.appendChild(element);
  // element.click();
  // document.body.removeChild(element);
}