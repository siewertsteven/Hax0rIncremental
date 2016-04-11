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
	security: 20,
	counterHack: 0,
	hp: 0,
	lasthp: 0,
	totalhp: 0,
	increment: 0,
	tickCountTop: 60,
	tickMult: 1,
	typeMult: 1,
	cost:({increment1: 10, increment2: 50, increment3: 1000, increment4: 10000, speed1: 10, speed2: 5000, finalHack: 100000, 
	security1: 50, security2: 200, type1: 10,
		
	}),
	GAMESTATE: Object.freeze({loop: 0, win: 1, gameOver: 2, paused: 3}),
	gameState: undefined,
	
	emitter: undefined,
	sound: undefined,
	
	pulsar: undefined,
	spriteImage: undefined,
	
	binary: "",
	
	//for ticks
	time: 0,
	startTime: 0,
	
	emitterX: -200,
	emitterY: -200,

	createParticles: false,
	
    // methods
	init : function() {
		console.log("app.main.init() called");
		this.startTime = new Date();
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		this.code = document.getElementById("sampleCode").textContent;
		this.gameState = this.GAMESTATE.loop;
		//making buttons
		this.upgrades = document.querySelectorAll(".upgrade");
		for (var i = 0; i<this.upgrades.length; ++i){
			app.main.upgrades[i].addEventListener("click", function(){
				app.main.upgrade(this);
			});
		};
		this.startTime = new Date().getTime();
		this.image = document.getElementById("sprite");

		this.sound.playBGAudio();
		
		//emitter
		this.pulsar = new this.emitter(this.image, 20, 20, 20, 20);
		this.pulsar.green = 255;
		this.pulsar.minXspeed = this.pulsar.minYspeed = -0.50;
		this.pulsar.maxXspeed = this.pulsar.maxYspeed = 0.50;
		this.pulsar.lifetime = 5000;
		this.pulsar.expansionRate = -0.05;
		this.pulsar.numParticles = 500;
		this.pulsar.xRange=1;
		this.pulsar.yRange=1;
		this.pulsar.useCircles = false;
		this.pulsar.useSquares = true;
		this.pulsar.createParticles({x: -2000, y: -2000});
		this.update();
	},
	
	pause: function(){
		this.sound.stopBGAudio();
		if(this.gameState == this.GAMESTATE.loop){
			this.gameState = this.GAMESTATE.paused;
		}
		cancelAnimationFrame(this.animationID);
	},
	
	resume : function(){
		this.sound.playBGAudio();
		if(this.gameState == this.GAMESTATE.paused){
			this.gameState = this.GAMESTATE.loop;
		}
		cancelAnimationFrame(this.animationID);
		this.update();
	},
	
	
	upgrade : function(type){
		if (type.id == "type1" && this.hp >= this.cost.type1){
			this.sound.playEffect();
			this.hp -= this.cost.type1;
			this.typeMult++;
			this.cost.type1 += this.cost.type1 * 5;
			type.innerHTML = ">Open CMD prompt  " + this.cost.type1;
		}
		if (type.id == "tick1" && this.hp >= this.cost.increment1){
			this.sound.playEffect();
			this.hp -= this.cost.increment1;
			this.increment+=5;
			this.cost.increment1 += Math.floor(this.cost.increment1/3);
			type.innerHTML = ">Run Script " + this.cost.increment1;
		}
		if (type.id == "tick2"  && this.hp >= this.cost.increment2){
			this.sound.playEffect();
			this.hp -= this.cost.increment2;
			this.increment+= 20;
			this.cost.increment2 += Math.floor(this.cost.increment2/2);
			type.innerHTML = ">Setup Bot " + this.cost.increment2;
		}
		if (type.id == "tick3"  && this.hp >= this.cost.increment3){
			this.sound.playEffect();
			this.hp -= this.cost.increment3;
			this.increment+= 100;
			this.cost.increment3 += Math.floor(this.cost.increment3/2);
			type.innerHTML = ">Create Virus " + this.cost.increment3;
		}
		if (type.id == "tick4"  && this.hp >= this.cost.increment4){
			this.sound.playEffect();
			this.hp -= this.cost.increment4;
			this.increment+= 1000;
			this.cost.increment4 += Math.floor(this.cost.increment4/2);
			type.innerHTML = ">Run Giber.ish " + this.cost.increment4;
		}
		if (type.id == "speed1"  && this.hp >= this.cost.speed1){
			this.sound.playEffect();
			this.hp -= this.cost.speed1;
			this.tickCountTop--;
			this.cost.speed1 += this.cost.speed1;
			type.innerHTML = ">Increase RAM " + this.cost.speed1;
		}
		if (type.id == "speed2" && this.hp >= this.cost.speed2){
			this.sound.playEffect();
			this.hp -= this.cost.speed2;
			this.tickMult++;
			this.cost.speed2 += this.cost.speed2 * 5;
			type.innerHTML = ">Install Extra Processor " + this.cost.speed2;
		}
		if (type.id == "security1" && this.hp >= this.cost.security1){
			this.sound.playEffect();
			this.hp -= this.cost.security1;
			this.security+=20;
			this.cost.security1 += this.cost.security1;
			type.innerHTML = ">Go Incognito " + this.cost.security1;
		}
		if (type.id == "security2" && this.hp >= this.cost.security2){
			this.sound.playEffect();
			this.hp -= this.cost.security2;
			this.security+=50;
			this.cost.security2 += this.cost.security2;
			type.innerHTML = ">Setup Proxy " + this.cost.security2;
		}
		if (type.id == "lowerSecurity"){
			this.sound.playEffect();
			this.security-=20;
			this.increment+=100;
			type.innerHTML = ">Disable Firewall";
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
		if (type.id == "tick3"){
			if (this.hp < this.cost.increment3){type.style.color = "#009933";}
			else{type.style.color = "lime";}
			
			if (this.totalhp < 1000){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		if (type.id == "tick4"){
			if (this.hp < this.cost.increment4){type.style.color = "#009933";}
			else{type.style.color = "lime";}
			
			if (this.totalhp < 10000){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		if (type.id == "security1"){
			if (this.hp < this.cost.security1){type.style.color = "#990000";}
			else{type.style.color = "#cc0000";}
			if (this.counterHack < 5){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		if (type.id == "lowerSecurity"){
			if (this.security < 100){type.style.display = "none";}
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
			if (this.hp < this.cost.finalHack){type.style.color = "#009933";}
			else{type.style.color = "lime";}
			if (this.totalhp < this.cost.finalHack){type.style.display = "none";}
			else{type.style.display = "block";}
		}
		}
		else{
			type.style.display="none";
		}
		
	},
	
	showBinary : function(){
		this.binary = "";
		var curTotalhp = this.totalhp
		for (var i = 16777216; i>=1; i = i/2){
			if (curTotalhp > i){this.binary = this.binary + "1    "
				curTotalhp -= i;
			}
			else {this.binary = this.binary + "0    "}
		}
		this.ctx.save();
		this.ctx.font = "12px Impact";
		this.ctx.fillStyle = "green";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(this.binary, this.WIDTH/2, this.HEIGHT*.95);
		this.ctx.restore();
	},

	update : function(){
		this.animationID = requestAnimationFrame(this.update.bind(this));
		if (this.gameState == this.GAMESTATE.loop){
		this.time = parseInt((new Date().getTime()-this.startTime)/100);

		//timing the ticks
		if (this.time >= this.tickCountTop){
			for (var i = 0; i< this.tickMult; i++){
				this.tick();
				this.pulsar.startRadius = Math.pow(this.totalhp, 1/5) + 5;
				this.emitterX = getRandom(0,this.WIDTH)
				this.emitterY = getRandom(0, this.HEIGHT)
			}
			this.startTime = new Date().getTime();
		}
		
		
		

		this.tickCount++;
		
		}
		//drawing the particle system and HUD
		if (Math.floor(this.increment/10) > 500){this.pulsar.numParticles = 500}
		else{this.pulsar.numParticles = Math.floor(this.increment/10);}
		this.clear();
		this.drawHud();
		
		this.pulsar.updateAndDraw(this.ctx,{x:this.emitterX, y:this.emitterY});
		
		
	},
	
	tick : function(){
		this.hp += this.increment;
		this.totalhp += this.increment;
		if (this.totalhp > 500){this.counterHack ++;}
	},
	
	drawHud : function(){
		//binary total
		this.ctx.save();
		this.ctx.font = "30px Impact";
		this.ctx.fillStyle = 'rgba(0,255,0,1)';
		this.ctx.textAlign = "center";
		this.ctx.fillText(this.hp, this.WIDTH/2, 50);
		this.ctx.restore();
		
		//show the total in binary
		this.showBinary();
		
		//code repeats when the end is reached
		if(this.totalhp > this.code.length){
			this.code = this.code + this.code
		}
		//shows more code when the player types, when they go past the limit it scrolls up
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
		
		
		
		//counterhack
		this.ctx.save();
		this.ctx.fillStyle = "red";
		var barWidth = (this.counterHack/this.security) * 200
		if (barWidth > 200){barWidth = 200;
			this.gameState = this.GAMESTATE.gameOver;
			this.pause();
			document.getElementById("code").style.color = "red";
			this.sound.playGameOver();
		}
		this.ctx.fillRect (400,400, barWidth, 20);
		
		this.ctx.save();
		this.ctx.strokeStyle = "green";
		this.ctx.strokeRect(400,400,200,20);
		this.ctx.restore();
		
		if (this.counterHack > 0){
			this.ctx.save();
			this.ctx.strokeStyle = "red";
			this.ctx.TextAlighn="center";
			this.ctx.font = "15px Impact";
			this.ctx.globalAlpha = this.counterHack/this.security
			this.ctx.fillText("//////////CounterHack//////////", 400, 390);
			this.ctx.restore();
		}
		//winning state
		if (this.gameState == this.GAMESTATE.win){
			this.ctx.save();
			this.ctx.globalAlpha = .5;
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
			this.ctx.restore();
			this.ctx.font = "70px Impact";
			this.ctx.fillStyle = "lime";
			this.ctx.textAlign = "center";
			this.ctx.fillText ("winner",this.WIDTH * .8, this.HEIGHT * .5 - 50 );
			this.ctx.font = "30px Impact";
			this.ctx.fillText ("total Score", this.WIDTH * .8, this.HEIGHT * .5);
			this.ctx.fillText (this.totalhp, this.WIDTH * .8, this.HEIGHT * .5 +  50);
			this.ctx.restore();
		}
		//game over state
		else if (this.gameState == this.GAMESTATE.gameOver){
			this.ctx.save();
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
			this.ctx.globalAlpha = 1;
			this.ctx.font = "30px Impact";
			this.ctx.fillStyle = "red";
			this.ctx.textAlign = "right";
			this.ctx.fillText ("you lose",this.WIDTH * .85, this.HEIGHT * .2);
			this.ctx.restore();
		}
		//check if you buttons should show
		for (var i = 0; i<this.upgrades.length; ++i){
			this.showButton(this.upgrades[i]);
		};
		
		
	},
	
	clear : function(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
	},
    
    
}; // end app.main