// emitter.js
// author: Tony Jefferson
// last modified: 10/7/2015

"use strict";
var app = app || {};

app.Emitter=function(){

	function Emitter(image, width, height, frameWidth, frameHeight){
		// public
		this.numParticles = 25;
		this.useCircles = true;
		this.useSquares = false;
		this.xRange = 4;
		this.yRange = 4;
		this.minXspeed = -1;
		this.maxXspeed = 1;
		this.minYspeed = 2;
		this.maxYspeed = 4;
		this.startRadius = 10;
		this.expansionRate = -0.05;
		this.decayRate = 2.5;
		this.lifetime = 100;
		this.red = 0;
		this.green = 0;
		this.blue = 0;
		this.oldEmitter = {x:200, y:200};
		
		this.width = width;
		this.height = height;
		
		this.image = image;
		
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.numCols = Math.floor(this.image.width/this.frameWidth);
		this.numRows = Math.floor(this.image.height/this.frameHeight);
		this.totalFrames = this.numCols * this.numRows;
		this.frameIndex = 0;
		this.lastTime = 0;
		// private
		this._particles = undefined;
	};
	
	
	// "public" methods
	var p=Emitter.prototype;
	
	p.createParticles = function(emitterPoint){
		// initialize particle array
		this._particles = [];
				
		// create exhaust particles
		for(var i=0; i< this.numParticles; i++){
			// create a particle object and add to array
			var p = {};
			this._particles.push(_initParticle(this, p, emitterPoint));
		}

		// log the particles
		//console.log(this._particles );
	};
	
	
	p.updateAndDraw = function(ctx, emitterPoint){
			/* move and draw particles */
			// each frame, loop through particles array
			// move each particle down screen, and slightly left or right
			// make it bigger, and fade it out
			// increase its age so we know when to recycle it
			//for(var i=0;i<this._particles.length;i++)
			for(var i=0;i<this.numParticles;i++){
				var p = this._particles[i];
				
				p.timer = parseInt((new Date().getTime()-p.startTime)/100);

				
				p.age += this.decayRate;
				p.r += this.expansionRate;
				if (p.r < 0){p.r = 0;}
				p.x += p.xSpeed
				p.y += p.ySpeed
				if (p.timer >= 2){
					p.frameIndex = Math.ceil(getRandom(-1, 4));
					p.startTime = new Date().getTime();
				}
				var alpha = 1 - p.age/this.lifetime;
				if(this.useSquares){
					// fill a rectangle	
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + 			
					this.blue + "," + alpha + ")"; 
					//this.draw(ctx);
					//ctx.fillRect(p.x, p.y, p.r, p.r);
					if (!this.image){
						ctx.fillRect(p.x, p.y, p.r, p.r);
					}else{
						var col = p.frameIndex % this.numCols;
						var row = Math.floor(this.frameIndex/this.numCols);
						var imageX = col * this.frameWidth;
						var imageY = row * this.frameHeight;
						//console.log(col);
						ctx.drawImage(this.image, 
						imageX, imageY, 20, 20,
						p.x, p.y, p.r, p.r
						);
						//ctx.fillRect(p.x, p.y, p.r, p.r);
					}
				}
				
				if(this.useCircles){
					// fill a circle
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + 			
					this.blue + "," + alpha + ")"; 
			
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
					ctx.closePath();
					ctx.fill();
				}
							
				// if the particle is too old, recycle it
				/*
				if(p.age >= this.lifetime){
					_initParticle(this, p, emitterPoint);
				}
				*/
				if(this.oldEmitter.x != emitterPoint.x){
					_initParticle(this, p, emitterPoint);
				}
				
				
				

			
			} // end for loop of this._particles
			this.oldEmitter = emitterPoint;
	} // end updateAndDraw()
	
			
	// "private" method
	function _initParticle(obj, p, emitterPoint){
		
		// give it a random age when first created
		p.age = getRandom(0,obj.lifetime);
		p.frameIndex = getRandom(0, 4);
		p.x = emitterPoint.x + getRandom(-obj.xRange, obj.xRange);
		p.y = emitterPoint.y + getRandom(0, obj.yRange);
		p.r = getRandom(obj.startRadius/2, obj.startRadius); // radius
		p.xSpeed = getRandom(obj.minXspeed, obj.maxXspeed);
		p.ySpeed = getRandom(obj.minYspeed, obj.maxYspeed);
		p.startTime = new Date().getTime();
		return p;
	};
	
	
	return Emitter;
}();