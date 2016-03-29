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
	reader: undefined,
	code: "",
	hp: 0,
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
		document.getElementById("tick1").addEventListener("click", function(){
			app.main.upgrade("tick1");
			document.getElementById("tick1").innerHTML = "Increase hacks per tick " + app.main.cost.increment1;
		})
		document.getElementById("speed1").addEventListener("click", function(){
			app.main.upgrade("speed1");
			document.getElementById("speed1").innerHTML = "Increase tick speed " + app.main.cost.speed1;
		})
		//var file = new File("sample01.txt",);
		//reader = new FileReader(file);
		//reader.read(code);
		//console.log(code);

		
		this.update();
	},
	

	
	/*
	readTextFile : function(file)
		{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = function ()
		{
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				this.ctx.fillText(allText, 10, 10);
                alert(allText);
            }
        }
		}
    rawFile.send(null);
	},*/
	upgrade : function(type){
		if (type == "tick1"){
			this.hp -= this.cost.increment1;
			this.increment++;
			this.cost.increment1 += this.cost.increment1;
		}
		if (type == "speed1"){
			this.hp -= this.cost.speed1;
			this.tickCountTop--;
			this.cost.speed1 += this.cost.speed1;
		}
	},
	
	doMousedown : function(){
		
	},

	update : function(){
		
		if (this.tickCount >= this.tickCountTop){
			this.tick();
			this.tickCount = 0;
			
		}
		console.log(this.tickCount + "/" + this.tickCountTop);
		this.tickCount++;
		this.animationID = requestAnimationFrame(this.update.bind(this));
		this.clear();
		this.drawHud();
		//this.readTextFile("..\sampleCode\sample01.txt");
	},
	
	tick : function(){
		this.hp += this.increment;
	},
	
	drawHud : function(){
		this.ctx.save();
		this.ctx.font = "30px Impact";
		//this.ctx.fillStyle = "green";
		this.ctx.fillStyle = 'rgba(0,255,0,1)';
		this.ctx.fillText(this.hp, 250, 50);
		this.ctx.restore();
	},
	
	clear : function(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
	},
    
    
}; // end app.main