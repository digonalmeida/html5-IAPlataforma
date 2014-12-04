var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");


var mapW = 10;
var mapH = 10;

var canvasW = 300;
var canvasH = 300;

var unitW = canvasW/mapW;
var unitH = canvasH/mapH;
var map = [[],[]];

function click(e)
{

}

myCanvas.addEventListener("click", click, false);

function Node()
{
	this.x = 0;
	this.y = 0;
	this.color = "#FFFF00";
	this.connections = new Array();
	this.type = "Air";
}



function nodeConnection()
{
	var x = 0;
	var y = 0;
	var cost = 1.0;
}

function initMap()
{
	for(var y=0; y< mapH; y++)
	{
		for(var x=0; x< mapW; x++)
		{
			map[x,y] = new Node();
			map[x,y].x = x;
			map[x,y].y = y;
			map[x,y].color = "#AAAAAA";
		}
	}
}
function drawConnections()
{
	
}
function drawMap()
{
	
	for(var y=0; y< mapH; y++)
	{
		for(var x=0; x< mapW; x++)
		{
			var node = map[x,y];
			var x_pos = x;
			var y_pos = y;
			drawRect(x_pos+0.01, y_pos+0.01, 1-0.01, 1-0.01, node.color); 
		}
	}
}



function drawRect(x,y,w,h, color)
{
  context.fillStyle = color;
  context.fillRect(x*unitW, y*unitH, w*unitW, h*unitH);
}

function drawHexagon(x,y,radius, color)
{
	context.fillStyle = color;
	context.beginPath();
	var angle = (Math.PI * 2) / 6.0;
	for(var i =0; i< 6; i++)
	{
		var r_x = Math.cos(i*angle);
		var r_y = Math.sin(i*angle);
		var r_x2 = Math.cos((i+1)*angle);
		var r_y2 = Math.sin((i+1)*angle);
		context.moveTo(x+(r_x*radius), y+(r_y*radius));
		context.lineTo(x+(r_x2*radius), y+(r_y2*radius));
		
		
	}    
	context.closePath();
	context.fill();
}
var gravityAcceleration = new function()
{
	this.x = 0;
	this.y = 10;
}

function testCollision(a, b)
{
	if(a.x+a.w < b.x)
		return false;
	if(a.x > b.x + b.w)
		return false;
		
	if(a.y+a.h < b.y)
		return false;
	if(a.y > b.y + b.h)
		return false;
		
	return true;
}
function Floor()
{
	this.x = 0;
	this.y = 0;
	this.w = 1;
	this.h = 1;
	this.type = "Floor";
	
	this.draw = function()
	{
		drawRect(this.x,this.y,this.w,this.h,"#000000");
	}
}

function newFloor(x,y,w,h)
{
	var floor = new Floor();
	floor.x = x;
	floor.y = y;
	floor.w = w;
	floor.h = h;
	return floor;
}

function newFloorInGrid(x,y,w,h)
{
	xx = x*(canvasW/mapW);
	yy = y*(canvasH/mapH);
	ww = w*(canvasW/mapW);
	hh = h*(canvasH/mapH);
	var floor = newFloor(xx,yy,ww,hh);
	return floor;
}

function Agent()
{
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.velocity = new function()
	{
		this.x = .1;
		this.y = 0;
	}
	
	this.draw = function()
	{
		
		drawRect(this.x, this.y, this.h, this.w, "#FF0000");
	}
	
	this.update = function(deltaTime)
	{
		this.velocity.y += gravityAcceleration.y * deltaTime ;
		this.x+=this.velocity.x * deltaTime ;
		this.y+=this.velocity.y * deltaTime ;
	}
	
	this.testCollision = function(collider)
	{
		var collided = false;
		
	}
	
	this.collided = function(other)
	{
		if(other.type == "Floor"){
			if(this.velocity.y > 0)
				{
					this.velocity.y = 0;
					this.y = (other.y - this.h) ;
				}
		}
	}
}
function clearCanvas()
{
	context.clearRect ( 0 , 0 , myCanvas.width, myCanvas.height );
}
/*
var agent = new Agent();
agent.w = 1;
agent.h = 1;
agent.x = 2;
agent.y = 2;*/

var floor = new Floor();
floor.x = 0;
floor.y = (mapH -1);
floor.w = 4;
floor.h = 1;

var agents = new Array();

var floors = new Array();

function initFloors()
{
	floors.push(newFloorInGrid(0,3,2,1));
	floors.push(floor);
	var agent = new Agent();
	agent.w = 1;
	agent.h = 1;
	agent.x = 2;
	agent.y = 2;
	agents.push(agent);
}

function collision()
{
	for(var a=0; a<agents.length; a++)
	{
		var agent = agents[a];
		for(var i=0 ; i<floors.length; i++)
		{
			var floor = floors[i];
			if(testCollision(agent,floor))
			{
				agent.collided(floor);
			}
		}
	}
}

function update(deltaTime)
{
	for(var i=0; i<agents.length; i++)
		agents[i].update();
}

function draw()
{
	clearCanvas();
	drawMap();
	for(var i=0; i<floors.length; i++)
		floors[i].draw();
	for(var i=0; i<agents.length; i++)
		agents[i].draw();
	
}
function mainLoop()
{
	initMap();
	initFloors();
	var FPS = 30;
	setInterval(function() {
	  update(FPS/1000);
	  collision();
	  draw();
	}, FPS/1000);
	
}


mainLoop(true);



