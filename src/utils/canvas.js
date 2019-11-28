/**
  * This file contains all code necessary to draw on the canvas element.
  */

export function drawCanvas(canvas,text){
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#FF0000";
  ctx.font = "30px Arial";
  ctx.strokeText(text,10,50);
}
