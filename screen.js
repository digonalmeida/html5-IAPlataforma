var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");

function Vec(x,y)
{
	this.x = x;
	this.y = y;
}

function Force(x,y,m)
{
	this.x = x;
	this.y = y;
	this.m = m;
}

function drawRect(x,y,w,h,style)
{
	context.fillStyle = style;
	context.fillRect(x,y,w,h,style);
}

function clear()
{
	drawRect(0,0,1000,1000,"white");
}
