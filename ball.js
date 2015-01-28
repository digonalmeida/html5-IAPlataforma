function Ball()
{
	this.pos = new Vec(0,0);
	this.vel = new Vec(0,0);
	this.radius = 5;
	this.style = "blue";
	this.applyGravity = false;
	this.steeringForce = new Force(0,0,0);
	this.gravityForce = new Force(0,-1,0.1);
	this.mass = 1;
}

Ball.prototype.updateForces = 
	function()
{
	forces = [];
	this.vel.x = 0;
	this.vel.y = 0;
	if(this.applyGravity)
		forces[forces.length] = this.gravityForce;
	forces[forces.length] = this.steeringForce;
	
	finalForce = new Force(0,0,0);
	
	for(i=0;i<forces.length; i++)
	{
		this.vel.x += forces[i].x * forces[i].m;
		this.vel.y += forces[i].y * forces[i].m;
	}
}

Ball.prototype.update =
	function(deltaTime)
	{
		this.updateForces();
		//console.log("teste " + deltaTime);
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;
	}

Ball.prototype.draw =
	function()
	{
		drawRect(this.pos.x, this.pos.y,
			this.radius, this.radius, this.style);
	}
