// main.js
// Dependencies: 
// Description: singleton object



"use strict";

// if app exists use the existing copy
// else create a new object literal

var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main = {
	
	//  properties
    WIDTH : 640, 
    HEIGHT: 480,
    canvas: undefined,
    ctx: undefined,
   	lastTime: 0, // used by calculateDeltaTime() 
    debug: false,
	code: undefined,
	file: undefined,
	reader: undefined,
	codeArray: ["Begin Hack//:"],
	hp: 0,
	lasthp: 0,
	totalhp: 0,
	increment: 0,
	tickCount: 0,
	tickCountTop: 60,
	cost:({increment1: 10, increment2: 50, speed1: 10
		
	}),

    // methods
	init : function() {
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		this.canvas.onmousedown = this.doMousedown.bind(this);
		this.code = document.getElementById("sampleCode").textContent;
		
		//making buttons
		var upgrades = document.querySelectorAll(".upgrade");
		for (var i = 0; i<upgrades.length; ++i){
			upgrades[i].addEventListener("click", function(){
				app.main.upgrade(this);
			});
		};
		console.log(upgrades.length);
		
		/*
		document.getElementById("tick1").addEventListener("click", function(){
			app.main.upgrade("tick1");
			document.getElementById("tick1").innerHTML = ">Increase hacks per tick " + app.main.cost.increment1;
		});
		document.getElementById("speed1").addEventListener("click", function(){
			console.log(this.id);
			app.main.upgrade("speed1");
			document.getElementById("speed1").innerHTML = ">Increase tick speed " + app.main.cost.speed1;
		});
		*/
		
		this.update();
	},
	
	
	upgrade : function(type){
		if (type.id == "tick1"){
			this.hp -= this.cost.increment1;
			this.increment++;
			this.cost.increment1 += this.cost.increment1;
			type.innerHTML = ">Increase hacks per tick " + this.cost.increment1;
		}
		if (type.id == "speed1"){
			this.hp -= this.cost.speed1;
			this.tickCountTop--;
			this.cost.speed1 += this.cost.speed1;
			type.innerHTML = ">Increase tick speed " + this.cost.speed1;
		}
	},
	
	doMousedown : function(){
		
	},

	update : function(){
		
		if (this.tickCount >= this.tickCountTop){
			this.tick();
			this.tickCount = 0;
			
		}
		//console.log(this.tickCount + "/" + this.tickCountTop);
		this.tickCount++;
		this.animationID = requestAnimationFrame(this.update.bind(this));
		this.clear();
		this.drawHud();
	},
	
	tick : function(){
		this.hp += this.increment;
		this.totalhp += this.increment;
	},
	
	drawHud : function(){
		this.ctx.save();
		this.ctx.font = "30px Impact";
		this.ctx.fillStyle = 'rgba(0,255,0,1)';
		this.ctx.fillText(this.hp, 250, 50);
		this.ctx.restore();
		
				
		if (this.lasthp != this.totalhp){
			for (var i = this.lasthp; i<this.totalhp; i++){ 
				document.getElementById("code").textContent += this.code[i];
				this.codeArray.push(this.code[i]);
			//should scroll at around 2000
			if (this.totalhp >= 2000){
				this.codeArray.shift();
				
			}
				var currentCode = this.codeArray.join("");
				document.getElementById("code").textContent = currentCode;
			}
		}
		this.lasthp = this.totalhp
		
		
	},
	
	clear : function(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
	},
    
    
}; // end app.main