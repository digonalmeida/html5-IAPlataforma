
function Game()
{
	this.fps = 60;
	this.step = 0;
	this.objects = [];
}

Game.prototype.update = 
	function()
	{
		
		//this.objects[this.objects.length] = 0;
		//console.log(this.objects.length);
		
		//alert("teste_update" + this.step++);
		for(i=0; i<this.objects.length; i++)
		{
			this.objects[i].update(1000/this.fps);
		}
	};
	
Game.prototype.draw =
	function()
	{
		clear();
		//alert("draw_update" + this.step);
		for(i=0; i<this.objects.length; i++)
		{
			this.objects[i].draw();
		}
		
	};


Game.prototype.loop =
	function()
	{
		this.update();
		this.draw();
	};

function main()
{
	g = new Game();
	for(i=0;i<100;i++)
	{
		b = new Ball();
		b.pos.x = i*100;
		b.pos.y = i*20;
		b.vel.x = 0.01;
		b.style = "green";
		
		g.objects[g.objects.length] = b;
	}
	setInterval("g.loop()",1000/g.fps);
}
main();
