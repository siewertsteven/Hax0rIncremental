// The myKeys object will be in the global scope - it makes this script 
// really easy to reuse between projects

"use strict";

var myKeys = {};
var lastKey

myKeys.KEYBOARD = Object.freeze({
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_SHIFT": 16
});

// myKeys.keydown array to keep track of which keys are down
// this is called a "key daemon"
// main.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
myKeys.keydown = [];


// event listeners
window.addEventListener("keydown",function(e){
	if (app.main.gameState == app.main.GAMESTATE.loop){
	console.log("keydown=" + e.keyCode);
	if (e.keyCode != lastKey){
		app.main.hp+= app.main.typeMult;
		app.main.totalhp+= app.main.typeMult;
	}
	lastKey = e.keyCode;
	myKeys.keydown[e.keyCode] = true;
	}
});
	
window.addEventListener("keyup",function(e){
	console.log("keyup=" + e.keyCode);
	myKeys.keydown[e.keyCode] = false;
});