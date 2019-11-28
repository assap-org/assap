/**
  * This file contains all code necessary to draw on the canvas element.
  */

var canvas = document.getElementById("canvas");

export function drawCanvas(){
  var ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";
  ctx.strokeText("Hello World",10,50);
}
