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
	reader: undefined,
	codeArray: ["Begin Hack//:"],
	security: 100,
	counterHack: 0,
	hp: 0,
	lasthp: 0,
	totalhp: 0,
	increment: 0,
	tickCount: 0,
	tickCountTop: 60,
	tickMult: 1,
	typeMult: 1,
	upgrades : [],
	cost:({increment1: 10, increment2: 50, speed1: 10, speed2: 5000, finalHack: 1, 
	security1: 50, security2: 200, type1: 10,
		
	}),
	GAMESTATE: Object.freeze({loop: 0, win: 1, gameOver: 2 }),
	gameState: undefined,

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
		this.gameState = this.GAMESTATE.loop;
		//making buttons
		this.upgrades = document.querySelectorAll(".upgrade");
		for (var i = 0; i<this.upgrades.length; ++i){
			app.main.upgrades[i].addEventListener("click", function(){
				app.main.upgrade(this);
			});
		};
		
		
		this.update();
	},
	
	
	upgrade : function(type){
		if (type.id == "type1" && this.hp >= this.cost.type1){
			this.hp -= this.cost.type1;
			this.typeMult++;
			this.cost.type1 += this.cost.type1 * 5;
			type.innerHTML = ">Open CMD prompt  " + this.cost.type1;
		}
		if (type.id == "tick1" && this.hp >= this.cost.increment1){
			this.hp -= this.cost.increment1;
			this.increment++;
			this.cost.increment1 += this.cost.increment1;
			type.innerHTML = ">Run Script " + this.cost.increment1;
		}
		if (type.id == "tick2"  && this.hp >= this.cost.increment2){
			this.hp -= this.cost.increment2;
			this.increment+= 5;
			this.cost.increment2 += this.cost.increment2;
			type.innerHTML = ">Setup Bot " + this.cost.increment2;
		}
		if (type.id == "speed1"  && this.hp >= this.cost.speed1){
			this.hp -= this.cost.speed1;
			this.tickCountTop--;
			this.cost.speed1 += this.cost.speed1;
			type.innerHTML = ">Increase RAM " + this.cost.speed1;
		}
		if (type.id == "speed2" && this.hp >= this.cost.speed2){
			this.hp -= this.cost.speed2;
			this.tickMult++;
			this.cost.speed2 += this.cost.speed2 * 5;
			type.innerHTML = ">Install Extra Processor " + this.cost.speed2;
		}
		if (type.id == "security1" && this.hp >= this.cost.security1){
			this.hp -= this.cost.security1;
			this.security+=100;
			this.cost.security1 += this.cost.security1;
			type.innerHTML = ">Go Incognito " + this.cost.security1;
		}
		if (type.id == "security2" && this.hp >= this.cost.security2){
			this.hp -= this.cost.security2;
			this.security+=200;
			this.cost.security2 += this.cost.security2;
			type.innerHTML = ">Setup Proxy " + this.cost.security2;
		}
		if (type.id == "finalHack" && this.hp >= this.cost.finalHack){
			this.hp -= this.cost.finalHack;
			this.gameState = this.GAMESTATE.win;
		}
	},
	
	showButton : function(type){
		if(this.gameState == this.GAMESTATE.loop){
		if (type.id == "type1"){
			if (this.hp < this.cost.type1){type.style.color = "#009933";}
			else{type.style.color = "lime";}
		}
		if (type.id == "tick1"){
			if (this.hp < this.cost.increment1){type.style.color = "#009933";}
			else{type.style.color = "lime";}
		}
		if (type.id == "tick2"){
			if (this.hp < this.cost.increment2){type.style.color = "#009933";}
			else{type.style.color = "lime";}
			
			if (this.totalhp < 200){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		if (type.id == "security1"){
			if (this.hp < this.cost.security1){type.style.color = "#990000";}
			else{type.style.color = "#cc0000";}
			if (this.counterHack < 5){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		if (type.id == "security2"){
			if (this.hp < this.cost.security2){type.style.color = "#990000";}
			else{type.style.color = "#cc0000";}
			if (this.counterHack < 5){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		
		if (type.id == "speed1"){
			if (this.hp < this.cost.speed1){type.style.color = "#009933";}
			else{type.style.color = "lime";}
			if (this.totalhp < 50){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		if (type.id == "speed2"){
			if (this.hp < this.cost.speed2){type.style.color = "#009933";}
			else{type.style.color = "lime";}
			if (this.totalhp < this.cost.speed2){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		
		if (type.id == "finalHack"){
			if (this.totalhp < 1){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		}
		else{
			type.style.display="none";
		}
		
	},
	
	doMousedown : function(){
		
	},

	update : function(){
		if (this.gameState == this.GAMESTATE.loop){
		if (this.tickCount >= this.tickCountTop){
			for (var i = 0; i< this.tickMult; i++){
				this.tick();
			}
			this.tickCount = 0;
		}
		//console.log(this.tickCount + "/" + this.tickCountTop);
		this.tickCount++;
		this.animationID = requestAnimationFrame(this.update.bind(this));
		this.clear();
		}
		else if (this.gameState == this.GAMESTATE.win){
			
		}
		else if (this.gameState == this.GAMESTATE.lose){
			
		}
		this.drawHud();
	},
	
	tick : function(){
		this.hp += this.increment;
		this.totalhp += this.increment;
		if (this.totalhp > 500){this.counterHack ++;}
	},
	
	drawHud : function(){
		this.ctx.save();
		this.ctx.font = "30px Impact";
		this.ctx.fillStyle = 'rgba(0,255,0,1)';
		this.ctx.textAlign = "center";
		this.ctx.fillText(this.hp, this.WIDTH/2, 50);
		this.ctx.restore();
		//check if you buttons should show
		for (var i = 0; i<this.upgrades.length; ++i){
			this.showButton(this.upgrades[i]);
		};
				
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
		
		if(this.totalhp > this.code.length){this.code = this.code + this.code}
		
		//counterhack
		this.ctx.save();
		this.ctx.fillStyle = "red";
		var barWidth = (this.counterHack/this.security) * 200
		if (barWidth > 200){barWidth = 200;
			this.gameState = this.GAMESTATE.gameOver;
		}
		this.ctx.fillRect (400,400, barWidth, 20);
		
		this.ctx.save();
		this.ctx.strokeStyle = "green";
		this.ctx.strokeRect(400,400,200,20);
		this.ctx.restore();
		
		if (this.gameState == this.GAMESTATE.win){
			this.ctx.save();
			this.ctx.globalAlpha = .5;
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
			this.ctx.restore();
			this.ctx.font = "70px Impact";
			this.ctx.fillStyle = "lime";
			this.ctx.textAlign = "center";
			this.ctx.fillText ("winner",this.WIDTH/2, this.HEIGHT/2 - 50 );
			this.ctx.font = "30px Impact";
			this.ctx.fillText ("total Score", this.WIDTH/2, this.HEIGHT/2);
			this.ctx.fillText (this.totalhp, this.WIDTH/2, this.HEIGHT/2 +  50);
		}
		else if (this.gameState == this.GAMESTATE.gameOver){
			this.ctx.save();
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
			this.ctx.globalAlpha = 0.25;
			this.ctx.font = "30px Impact";
			this.ctx.fillStyle = "red";
			this.ctx.textAlign = "center";
			this.ctx.fillText ("you lose",this.WIDTH/2, this.HEIGHT/2);
		}
		
		
	},
	
	clear : function(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
	},
    
    
}; // end app.main